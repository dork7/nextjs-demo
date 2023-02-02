// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
type Data = {
  // name: string;
  email: string;
  feedback: string;
  msg: string;
};

export default function handler(req: NextApiRequest, res: any) {
  if (req.method === "POST") {
    const { email, feedback } = req.body;
    console.log(`email, feedback`, email, feedback);

    const newFeedback: any = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    const path = buildFeedbackPath();
    const data: any = extractFeedback(path);
    data.push(newFeedback);
    fs.writeFileSync(path, JSON.stringify(data));
    return res.status(200).json({ email, feedback, msg: "data written" });
  }

  if (req.method === "GET") {
    const path = buildFeedbackPath();
    const data: any = extractFeedback(path);
    return res.status(200).json({ data });
  }
}

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath: string) {
  const fileData: any = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
