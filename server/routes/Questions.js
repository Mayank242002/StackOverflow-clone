import express from "express";
import {AskQuestion,getAllquestions,deleteQuestion,Votequestion} from "../controllers/Questions.js";
const router=express.Router();
import auth from "../middlewares/auth.js";


router.post("/Ask",auth,AskQuestion);
router.get("/get",getAllquestions);
router.delete("/delete/:id",auth,deleteQuestion);
router.patch("/vote/:id",auth,Votequestion);

export default router;
