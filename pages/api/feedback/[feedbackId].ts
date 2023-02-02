// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { buildFeedbackPath, extractFeedback } from ".";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const { feedbackId } = req.query;
    console.log(`feedbackId`, feedbackId);
    const path = buildFeedbackPath();
    const data: any = extractFeedback(path);
    const filteredData: any = data.filter(
      (feedback: any) => feedback.id === feedbackId
    );

    return res.status(200).json(filteredData);
  }
}
