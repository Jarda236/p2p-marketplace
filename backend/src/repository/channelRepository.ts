import { Result } from "@badrap/result";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ChannelCreate, Channel } from "../models";
import prisma from "../client";

export const getAll = async (): Promise<Result<Channel[], Error>> => {
  try {
    const msgs = await prisma.channel.findMany();
    return Result.ok(msgs);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getSingle = async (
  id: string
): Promise<Result<Channel | null, Error>> => {
  try {
    const msg = await prisma.channel.findUnique({
      where: { id },
      include: {
        messages: {
          include: {
            sender: { select: { id: true, name: true, picture: true } },
            reactions: {
              include: {
                user: { select: { id: true, name: true } },
                emoji: { select: { name: true, code: true } },
              },
            },
          },
        },
      },
    });
    return Result.ok(msg);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const createSingle = async (
  data: ChannelCreate
): Promise<Result<Channel | null, Error>> => {
  try {
    const msg = await prisma.channel.create({
      data,
      include: { messages: true },
    });
    return Result.ok(msg);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};
