import express from "express";
import {
  Askquestion,
  addViewById,
  postAnswerById,
  getAnswersById,
  addVotesById,
  questions,
} from "../services/link.service.js";
import { Authenticate } from "../Middleware/Authenticate.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Ask Question
router.post("/Askquestion", Authenticate, async function (req, res) {
  try {
    req.body.userid = mongodb.ObjectId(req.userid);
    req.body.username = req.name;
    req.body.view = 0;
    const user = await Askquestion(req.body);
    if (user) {
      res.json({ message: "Question is created successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});
// get question
router.get("/question/:id", async function (req, res) {
  try {
    const { id } = req.body.params;
    const ques = await questions(id);
    if (ques) {
      res.status(200).json(ques);
    }
  } catch (error) {
    console.log(error);
  }
});
// Add view
router.put("/addView/:id", Authenticate, async function (req, res) {
  try {
    const { id } = req.body.params;
    const questions = await addViewById(id);
    delete req.body._id;
    if (questions) {
      res.json({ message: "Successfully updated" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Post Answer
router.post("/postAnswer/:id", Authenticate, async function (req, res) {
  try {
    req.body.userid = mongodb.ObjectId(req.userid);
    req.body.username = req.name;
    req.body.votes = 0;
    req.body.quesid = mongodb.ObjectId(req.params.id);
    const answer = await postAnswerById(quesid);
    if (answer) {
      res.json({ message: "Answer updated successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// get Answers

router.get("/getAnswers/:id", async function (req, res) {
  try {
    req.body.quesid = mongodb.ObjectId(req.body.quesid);
    const answers = await getAnswersById(quesid);
    if (answers) {
      res.status(200).json(answers);
    }
  } catch (error) {
    console.log(error);
  }
});

// Add Votes
router.put("/addVotes/:id", Authenticate, async function (req, res) {
  try {
    req.body.quesid = mongodb.ObjectId(req.body.quesid);
    delete req.body._id;
    const votes = await addVotesById(quesid);
    if (votes) {
      res.json({ message: "Successfully Voted" });
    }
  } catch (error) {
    console.log(error);
  }
});
export default router;
