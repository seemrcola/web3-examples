import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { NoahNFT } from "@prisma/client";

type Response<T> =
  | {
      code: number;
      message: string;
      data?: T;
    }
  | NoahNFT[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<null>>
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  if (req.method === "GET") {
    const result = await prisma.noahNFT.findMany({
      where: {
        owner: req.query.owner as string,
      },
    });
    return res.status(200).json(result);
  }
}