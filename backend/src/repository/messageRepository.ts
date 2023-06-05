import { Result } from "@badrap/result";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  Message,
  MessageCreate,
  MessageUpdate,
  MessageToggleReaction,
} from "../models";
import prisma from "../client";

export const createSingle = async (
  senderId: string,
  data: MessageCreate
): Promise<Result<Message | null, Error>> => {
  try {
    const msg = await prisma.message.create({
      data: { ...data, senderId },
      include: { reactions: true, sender: true },
    });
    return Result.ok(msg);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const updateSingle = async (
  id: string,
  data: MessageUpdate
): Promise<Result<Message, Error>> => {
  try {
    const msg = await prisma.message.update({ where: { id }, data });
    return Result.ok(msg);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const toggleReaction = async (
  userId: string,
  data: MessageToggleReaction
): Promise<Result<Message, Error>> => {
  try {
    const msg = await prisma.$transaction(async (tx) => {
      const message = await tx.message.findUniqueOrThrow({
        where: { id: data.messageId },
        select: { reactions: { include: { emoji: true } } },
      });

      const emoji = await tx.emoji.findUniqueOrThrow({
        where: { code: data.emojiCode },
      });

      const userReaction = message.reactions.find(
        (reaction) =>
          reaction.userId === userId && reaction.emoji.code === data.emojiCode
      );

      const include = {
        sender: { select: { id: true, name: true, picture: true } },
        reactions: {
          include: {
            user: { select: { id: true, name: true } },
            emoji: { select: { name: true, code: true } },
          },
        },
      };

      // Create reaction if it doesn't exist
      if (!userReaction) {
        return tx.message.update({
          where: { id: data.messageId },
          include,
          data: {
            reactions: {
              create: {
                userId,
                emojiId: emoji.id,
              },
            },
          },
        });
      }
      // Delete reaction if it exists

      return tx.message.update({
        where: { id: data.messageId },
        include,
        data: {
          reactions: {
            delete: {
              id: userReaction.id,
            },
          },
        },
      });
    });

    return Result.ok(msg);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};
