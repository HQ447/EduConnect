import express from "express";
import { authValidator } from "../middlewares/authValidator.js";
import { studentRegistration } from "../controllers/student controller/studentRegistration.controller.js";
import { studentLogin } from "../controllers/student controller/studentLogin.controller.js";
import { teacherRegistration } from "../controllers/teacher controller/teacherRegistration.controller.js";
import { teacherLogin } from "../controllers/teacher controller/teacherLogin.controller.js";
import { adminRegistration } from "../controllers/admin controller/adminRegistration.controller.js";
import { adminLogin } from "../controllers/admin controller/adminLogin.controller.js";
import { getTeacher } from "../controllers/teacher controller/getTeacher.controller.js";
import { getAdmin } from "../controllers/admin controller/getAdmin.controller.js";
import { studentForgotPass } from "../controllers/student controller/studentForgotPass.controller.js";
import { studentVerifyOTP } from "../controllers/student controller/studentVerifyOTP.controller.js";
import { studentResetPass } from "../controllers/student controller/studentResetPass.controller.js";
import { teacherForgotPass } from "../controllers/teacher controller/teacherForgotPass.controller.js";
import { teacherVerifyOTP } from "../controllers/teacher controller/teacherVerifyOTP.controller.js";
import { teacherResetPass } from "../controllers/teacher controller/teacherResetPass.controller.js";
import { adminForgotPassword } from "../controllers/admin controller/adminForgotPassword.controller.js";
import { adminVerifyOTP } from "../controllers/admin controller/adminVerifyOTP.controller.js";
import { adminResetPass } from "../controllers/admin controller/adminResetPass.controller.js";
import { updateTeacherProfile } from "../controllers/teacher controller/updateTeacherProfile.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import teacherFileUploader from "../middlewares/teachersFileUploader.js";
import studentFileUploader from "../middlewares/studentFileUploader.js";
import adminFileUploader from "../middlewares/adminFileUploader.js";
import { getRegisteredTeachers } from "../controllers/student controller/getRegisteredTeachers.controller.js";
import { getSaved } from "../controllers/student controller/getSaved.controller.js";
import { savedTeacher } from "../controllers/student controller/savedTeacher.controller.js";
import { getStudent } from "../controllers/student controller/getStudent.controller.js";
import { addCategory } from "../controllers/admin controller/addCategory.controller.js";
import { getAllCategories } from "../controllers/admin controller/getAllCategories.controller.js";
import { deleteCategory } from "../controllers/admin controller/deleteCategory.controller.js";
import { getAllStudents } from "../controllers/admin controller/getAllStudents.controller.js";
import { getAllTeachers } from "../controllers/admin controller/getAllTeachers.controller.js";
import { deleteStudent } from "../controllers/admin controller/deleteStudent.controller.js";
import { deleteTeacher } from "../controllers/admin controller/deleteTeacher.controller.js";
import { updateStudentProfile } from "../controllers/student controller/updateStudentProfile.controller.js";
import { updatedAdminProfile } from "../controllers/admin controller/updateAdminProfile.controller.js";
import { getNearbyTeachers } from "../controllers/teacher controller/getNearbyTeachers.controller.js";
import { removeSaveTeacher } from "../controllers/student controller/removeSaveTeacher.js";
import { notRegisterTeachers } from "../controllers/teacher controller/notRegisterTeachers.controller.js";
import { sendNotification } from "../controllers/Notification/sendNotification.controller.js";
import { getNotifications } from "../controllers/Notification/getNotification.controller.js";
import { removeNotifications } from "../controllers/Notification/removeNotification.controller.js";
import { sendFeedback } from "../controllers/student controller/sendFeedback.controller.js";
import { getAllFeedbacks } from "../controllers/student controller/getAllFeedbacks.controller.js";
import { teacherRating } from "../controllers/Rating/teacherRating.controller.js";
import { getRatings } from "../controllers/Rating/getRatings.controller.js";
import { rateTeacher } from "../controllers/Recommendation Controllers/rateTeacher.js";
import { getRecommendations } from "../controllers/Recommendation Controllers/recommendationController.js";
import studentCloudUploader from "../middlewares/studentCloudUploader.js";
import teacherCloudUploader from "../middlewares/teacherCloudUploader.js";
import adminCloudUploader from "../middlewares/adminCloudUploader.js";

const router = express.Router();

//student Routes
router.post("/registerStudent", authValidator, studentRegistration);
router.post("/studentLogin", authValidator, studentLogin);
router.post("/studentFogotPass", studentForgotPass);
router.post("/studentOtpVerificaion", studentVerifyOTP);
router.post("/studentResetPass", studentResetPass);
router.get("/getRegisteredTeachers", verifyToken, getRegisteredTeachers);

router.get("/getSavedTeachers", verifyToken, getSaved);
router.post("/saveTeacher", verifyToken, savedTeacher);
router.delete("/removeSaveTeacher/:id", verifyToken, removeSaveTeacher);
router.get("/getStudent/:id", verifyToken, getStudent);
router.put(
  "/updateStudentProfile",
  verifyToken,
  studentCloudUploader.single("img"),
  updateStudentProfile
);

//Teacher Routes
router.post("/registerTeacher", authValidator, teacherRegistration);
router.post("/teacherLogin", authValidator, teacherLogin);
router.post("/teacherForgotPass", teacherForgotPass);
router.post("/teacherOtpVerification", teacherVerifyOTP);
router.post("/teacherResetPass", teacherResetPass);
router.get("/getTeacher/:id", verifyToken, getTeacher);
router.put(
  "/updateTeacherProfile",
  verifyToken,
  teacherCloudUploader.single("img"),
  updateTeacherProfile
);

router.get("/getNearbyTeachers", verifyToken, getNearbyTeachers);

//Admin Routes
router.post("/registerAdmin", authValidator, adminRegistration);
router.post("/adminLogin", authValidator, adminLogin);
router.post("/adminForgotPass", adminForgotPassword);
router.post("/adminOtpVerification", adminVerifyOTP);
router.post("/adminResetPass", adminResetPass);
router.get("/getAdmin/:id", verifyToken, getAdmin);

router.put(
  "/updateAdminProfile",
  verifyToken,
  adminCloudUploader.single("img"),
  updatedAdminProfile
);

router.get("/getAllStudents", verifyToken, getAllStudents);
router.get("/notRegisterTeachers", verifyToken, notRegisterTeachers);
router.get("/getAllTeachers", getAllTeachers);
router.delete("/deleteStudent/:id", verifyToken, deleteStudent);
router.delete("/deleteTeacher/:id", verifyToken, deleteTeacher);

router.post("/addCategory", verifyToken, addCategory);
router.get("/getAllCategories", verifyToken, getAllCategories);
router.delete("/deleteCategory/:id", verifyToken, deleteCategory);

router.post("/sendNotification", verifyToken, sendNotification);
router.get(
  "/getNotifications/:receiverId/:receiverType",
  verifyToken,
  getNotifications
);
router.delete("/removeNotification/:id", verifyToken, removeNotifications);

router.post("/sendFeedback", verifyToken, sendFeedback);
router.get("/getFeedback/:teacherId", verifyToken, getAllFeedbacks);

//Rating for Recommendations
router.post("/rateToRecommend", verifyToken, rateTeacher);
router.get("/getRecommendations", verifyToken, getRecommendations);

//Rating
router.post("/rateTeacher/:teacherId", teacherRating);
router.get("/ratings/:teacherId", getRatings);

export default router;
