import { getDBClient } from "@/util/backend/db";
import isValidBody from "@/util/backend/is-valid-body";
import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

export type VerifyEmailBody = {
  token: string;
};

const schema = z.object({
  token: z.string(),
});

const client = getDBClient();

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method !== "POST") return res.status(405).json("Method not allowed");

  if (!isValidBody<VerifyEmailBody>(req.body, ["token"])) {
    return res.status(402);
  }

  const data = schema.safeParse(req.body);

  if (!data.success) return res.status(400).json(data.error.issues);

  try {
    const user = await client.user.findFirst({
      where: {
        token: {
          token: req.body.token,
        },
      },
    });

    if (!user) return res.status(404).json("Token not found");

    await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });

    await client.token.delete({
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json("Email verified");
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
};

export default handler;
