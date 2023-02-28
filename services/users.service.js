import { client } from "../index.js";
import { ObjectId } from "mongodb";

export async function createaccount(data) {
  return await client.db("stackoverflow").collection("users").insertOne(data);
}
export async function getUserByemail(email) {
  return await client
    .db("stackoverflow")
    .collection("users")
    .findOne({ email: email });
}
export async function updateUser(email, randomnum) {
  return await client
    .db("stackoverflow")
    .collection("users")
    .updateOne({ email: email }, { $set: { rnum: randomnum } });
}
export async function getUserByUserId(userid) {
  return await client
    .db("stackoverflow")
    .collection("users")
    .findOne({ _id: mongodb.ObjectId(userid) });
}

export async function updatePassword(email) {
  return await client
    .db("stackoverflow")
    .collection("users")
    .updateOne({ email: email }, { $set: { password: password } });
}
