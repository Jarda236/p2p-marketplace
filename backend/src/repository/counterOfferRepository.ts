import { Result } from "@badrap/result";
import {
  Decimal,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import {
  CounterOffer,
  CounterOfferCreate,
  CounterOfferUpdate,
} from "../models";
import prisma from "../client";

export const getAll = async (): Promise<Result<CounterOffer[], Error>> => {
  try {
    const result = await prisma.counterOffer.findMany({
      where: { deletedAt: null },
    });
    const aa = Array(result.length).fill(undefined);
    for (let i = 0; i < result.length; i++) {
      aa[i] = { ...result[i], amount: result[i].price.toNumber() };
    }
    return Result.ok(aa);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getSingle = async (
  id: string
): Promise<Result<CounterOffer | null, Error>> => {
  try {
    var result = await prisma.counterOffer.findUnique({ where: { id } });
    if (result?.deletedAt!==null) {
      return Result.err(new Error(`Deleted record!`));
    }
    if (result && result.price) {
      var a = { ...result, price: result.price.toNumber() };
      return Result.ok(a);
    }
    return Result.ok(null);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const createSingle = async (
  data: CounterOfferCreate
): Promise<Result<CounterOffer, Error>> => {
  try {
    const result = await prisma.counterOffer.create({ data });
    if (result && result.price) {
      var a = { ...result, price: result.price.toNumber() };
      return Result.ok(a);
    }
    return Result.err(new Error(`aaaaaa ${result}`));
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const updateSingle = async (
  id: string,
  data: CounterOfferUpdate
): Promise<Result<CounterOffer, Error>> => {
  try {
    const result = await prisma.counterOffer.update({ where: { id }, data });
    if (result && result.price) {
      var a = { ...result, price: result.price.toNumber() };
      return Result.ok(a);
    }
    return Result.err(new Error(`aaaaaa ${result}`));
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const deleteSingle = async (id: string) => {
  try {
    const result = await prisma.counterOffer.delete({ where: { id } });
    return Result.ok(result);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};
