import { MongoClient } from "mongodb";
export async function connectDataBase() {
  return await MongoClient.connect(process.env.connectionString);
}

export async function insertDocument(
  client: any,
  collection: string,
  document: any
) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getCommentsByEventId(client: any, eventId) {
  const db = client.db();
  return await db
    .collection("comments")
    .find({ eventId })
    .sort({ _id: -1 })
    .toArray();
}
