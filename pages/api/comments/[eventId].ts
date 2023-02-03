// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectDataBase,
  getCommentsByEventId,
  insertDocument,
} from "@/helpers/db-utils";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let client = null;
  try {
    client = await connectDataBase();
  } catch (err) {
    res.status(500).json({ msg: "unable to connect to db" });
    return;
  }

  if (req.method === "POST") {
    const { eventId } = req.query;
    const { email, name, text } = req.body;
    try {
      await insertDocument(client, "comments", { email, name, text, eventId });
    } catch (err) {
      res.status(500).json({ msg: "unable to insert data" });
    }
    res.status(200).json({ msg: "data written" });
  } else if (req.method === "GET") {
    const { eventId } = req.query;
    try {
      const comments = await getCommentsByEventId(client, eventId);
      res.status(200).json({ filteredData: comments });
    } catch (err) {
      res.status(500).json({ msg: "unable to fetch data" });
    }
  }
  client.close();
}
