// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { eventId } = req.query;
    const { email, name, text } = req.body;

    const path = buildFeedbackPath();
    const data: any = extractFeedback(path);
    data.push({ email, name, text, eventId });
    fs.writeFileSync(path, JSON.stringify(data));
    return res.status(200).json({ email, msg: "data written" });
  } else if (req.method === "GET") {
    const { eventId } = req.query;

    const path = buildFeedbackPath();
    const data: any = extractFeedback(path);
    const filteredData = data.filter((item: any) => item.eventId === eventId);
    return res.status(200).json({ filteredData });
  }
}
export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "comments.json");
}

export function extractFeedback(filePath: string) {
  const fileData: any = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
