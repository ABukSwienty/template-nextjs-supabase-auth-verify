// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDBClient } from "@/util/backend/db";
import isValidBody from "@/util/backend/is-valid-body";
import sendVerificationToken from "@/util/backend/send-verification-token";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { ZodIssue } from "zod";

const client = getDBClient();

export type SignUpUser = {
  email: string;
  password: string;
  name: string;
  phone?: string;
};

export type SignUpResponse = string | ZodIssue[] | unknown;

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  phone: z.string().optional(),
});

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse>
) => {
  if (req.method !== "POST") return res.status(405).json("Method not allowed");

  if (
    !isValidBody<SignUpUser>(req.body, ["email", "password", "name", "phone"])
  ) {
    return res.status(402);
  }

  const data = schema.safeParse(req.body);

  if (!data.success) return res.status(400).json(data.error.issues);

  const exists = await client.user.findFirst({
    where: {
      email: data.data.email,
    },
  });

  if (exists && !exists?.verified)
    return res.status(400).json("User not verified yet");

  if (exists) return res.status(400).json("User already exists");

  const hashedPassword = await bcrypt.hash(data.data.password, 10);
  const token = uuidv4();

  try {
    const user = await client.user.create({
      data: {
        email: data.data.email,
        password: hashedPassword,
        name: data.data.name,
        phone: data.data.phone,
        token: {
          create: {
            token,
          },
        },
        verified: false,
      },
    });

    const sendToken = sendVerificationToken(user.email, token);

    if (!sendToken) {
      await client.token.delete({
        where: {
          userId: user.id,
        },
      });

      await client.user.delete({
        where: {
          id: user.id,
        },
      });
      res
        .status(500)
        .json("Could not send token. Please check your email and try again.");
    }

    res.status(200).json("User created");
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
};

export default handler;
