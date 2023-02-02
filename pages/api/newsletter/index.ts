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
    const { email } = req.body;

    const path = buildFeedbackPath();
    const data: any = extractFeedback(path);
    data.push(email);
    fs.writeFileSync(path, JSON.stringify(data));
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
