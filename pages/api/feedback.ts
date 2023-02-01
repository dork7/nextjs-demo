// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { email, feedback } = req.body;
    console.log(`email, feedback`, email, feedback);

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData: any = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(200).json({ email, feedback, msg: "data written" });
  }

  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData: any = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return res.status(200).json({ data });
  }

  res.status(200).json({ name: "John Doe" });
}
