import { client } from "../index.js";

export async function Askquestion(data) {
  return await client
    .db("stackoverflow")
    .collection("questions")
    .insertOne(data);
}
export async function questions(userid) {
  return await client
    .db("stackoverflow")
    .collection("questions")
    .findOne({ userid });
}
export async function addViewById(id) {
  return await client
    .db("stackoverflow")
    .collection("questions")
    .updateOne({ _id: mongodb.ObjectId(req.id) });
}
export async function postAnswerById(id) {
  return await client
    .db("stackoverflow")
    .collection("answers")
    .insertOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body });
}
export async function getAnswersById(quesid) {
  return await client
    .db("stackoverflow")
    .collection("answers")
    .find({ quesid: mongodb.ObjectId(quesid) })
    .sort({ votes: -1 })
    .toArray();
}
export async function addVotesById(quesid) {
  return await client
    .db("stackoverflow")
    .collection("answers")
    .updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body });
}
