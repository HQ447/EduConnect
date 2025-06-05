import Rating from "../../models/Rating.js";
import Teacher from "../../models/teacher.model.js";

const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return normA && normB ? dotProduct / (normA * normB) : 0;
};

export const getRecommendations = async (req, res) => {
  const studentId = req.user?.id;

  if (!studentId) {
    console.error("Error: Missing studentId in JWT");
    return res.status(401).json({ error: "Unauthorized: Missing studentId" });
  }

  try {
    // Fetch all ratings
    const ratings = await Rating.find().populate("studentId teacherId");
    // console.log("Ratings:", ratings);
    if (!ratings.length) {
      console.log("No ratings found, using fallback");
    }

    const students = [
      ...new Set(ratings.map((r) => r.studentId?._id?.toString())),
    ].filter(Boolean);
    const teachers = [
      ...new Set(ratings.map((r) => r.teacherId?._id?.toString())),
    ].filter(Boolean);
    // console.log("Students:", students, "Teachers:", teachers);

    // Create student-teacher rating matrix
    const ratingMatrix = {};
    students.forEach((student) => {
      ratingMatrix[student] = {};
      teachers.forEach((teacher) => {
        ratingMatrix[student][teacher] = 0;
      });
    });
    ratings.forEach((r) => {
      if (r.studentId?._id && r.teacherId?._id) {
        ratingMatrix[r.studentId._id.toString()][r.teacherId._id.toString()] =
          r.rating;
      }
    });
    //console.log("Rating Matrix:", ratingMatrix);

    // Compute similarity with other students
    const targetStudentRatings = ratingMatrix[studentId]
      ? Object.values(ratingMatrix[studentId])
      : [];
    const similarities = [];
    for (let otherStudent of students) {
      if (otherStudent !== studentId) {
        const otherStudentRatings = Object.values(ratingMatrix[otherStudent]);
        const similarity = cosineSimilarity(
          targetStudentRatings,
          otherStudentRatings
        );
        similarities.push({ student: otherStudent, similarity });
      }
    }
    //console.log("Similarities:", similarities);

    // Get top 3 similar students
    const topSimilarStudents = similarities
      .filter((s) => s.similarity > 0.1)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);
    //console.log("Top Similar Students:", topSimilarStudents);

    // Recommend teachers not yet rated by the student
    const recommendations = new Set();
    for (let similarStudent of topSimilarStudents) {
      for (let teacher in ratingMatrix[similarStudent.student]) {
        if (
          ratingMatrix[similarStudent.student][teacher] > 3 &&
          (!ratingMatrix[studentId] || ratingMatrix[studentId][teacher] === 0)
        ) {
          recommendations.add(teacher);
        }
      }
    }
    //console.log("Recommended Teacher IDs:", recommendations);

    // Fetch teacher details
    let recommendedTeachers = await Teacher.find({
      _id: { $in: Array.from(recommendations) },
    });
    //console.log("Recommended Teachers:", recommendedTeachers);

    // Fallback: Recommend popular teachers
    if (recommendedTeachers.length === 0) {
      //console.log("Using popular teachers fallback");
      recommendedTeachers = await Rating.aggregate([
        {
          $group: {
            _id: "$teacherId",
            avgRating: { $avg: "$rating" },
            count: { $sum: 1 },
          },
        },
        { $match: { avgRating: { $gt: 3 }, count: { $gte: 2 } } },
        { $sort: { avgRating: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "teacher", // Match MongoDB collection name (lowercase, based on model)
            localField: "_id",
            foreignField: "_id",
            as: "teacher",
          },
        },
        { $unwind: "$teacher" },
        {
          $project: {
            _id: "$teacher._id",
            name: "$teacher.name",
            subject: "$teacher.subject",
          },
        },
      ]).catch((err) => {
        console.error("Aggregation Error:", err);
        return [];
      });
    }

    res.json(recommendedTeachers);
  } catch (error) {
    console.error("Recommendation Error:", error);
    res.status(500).json({ error: "Failed to generate recommendations" });
  }
};
