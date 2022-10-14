import express from "express";
import {postAnswer,deleteAnswer} from "../controllers/answer.js";
const router=express.Router();
import auth from "../middlewares/auth.js";


router.patch("/post/:id",auth,postAnswer);
router.patch("/delete/:id",auth,deleteAnswer);


export default router;
