// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { connectDataBase, insertDocument } from "@/helpers/db-utils";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { email } = req.body;
    let client = null;
    try {
      client = await connectDataBase();
    } catch (err) {
      res.status(500).json({ msg: "unable to connect to db" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email });
      client.close();
    } catch (err) {
      client.close();
      res.status(500).json({ msg: "unable to insert data" });
      return;
    }
    return res.status(200).json({ email, msg: "data written" });
  }
}
export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "newsletter.json");
}

export function extractFeedback(filePath: string) {
  const fileData: any = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
