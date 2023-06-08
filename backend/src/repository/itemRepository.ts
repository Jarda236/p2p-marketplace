import { Result } from "@badrap/result";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Item, ItemCreate, ItemUpdate } from "../models";
import prisma from "../client";

export const getAll = async (): Promise<Result<Item[], Error>> => {
  try {
    const result = await prisma.item.findMany({
      where: { deletedAt: null },
    });
    return Result.ok(result);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getAllbyUser = async (userId: string): Promise<Result<Item[], Error>> => {
  try {
    const result = await prisma.item.findMany({
      where: { userId: userId, deletedAt: null },
    });
    return Result.ok(result);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getSingle = async (
  id: string
): Promise<Result<Item | null, Error>> => {
  try {
    const item = await prisma.item.findUnique({
      where: { id },
    });
    if (!item || item.deletedAt) {
      throw new Error("Item not found");
    }
    return Result.ok(item);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const createSingle = async (
  userId: string,
  data: ItemCreate
): Promise<Result<Item, Error>> => {
  try {
    data.blocked = false;
    const dataa = { ...data, counterOfferId: null, offerId: null, userId: userId };
    const item = await prisma.item.create({ data: dataa });
    return Result.ok(item);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const updateSingle = async (
  itemId: string,
  userId: string,
  data: ItemUpdate
): Promise<Result<Item, Error>> => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const i = await transaction.item.findUnique({ where: { id: itemId } });
        if (!i || i.deletedAt) {
          throw new Error("Item not found");
        }
        const item = await transaction.item.update({
          where: { id: itemId },
          data: { ...data, userId: userId },
        });
        return item;
      })
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const deleteSingle = async (id: string) => {
  try {
    const item = await prisma.item.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return Result.ok(item);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};
