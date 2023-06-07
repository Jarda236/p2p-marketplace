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
    if (!result || result.deletedAt) {
      throw new Error("CounterOffer not found");
    }
    if (result && result.price) {
      var a = { ...result, price: result.price.toNumber() };
      return Result.ok(a);
    }
    throw new Error("CounterOffer not found");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};


export const getAllByOfferId = async (
  id: string
): Promise<Result<CounterOffer[], Error>> => {
  try {
    const results = await prisma.counterOffer.findMany({
      where: { offerId: id },
    });

    const validResults = results.filter((result) => !result.deletedAt);

    const offers = validResults.map((result) => {
      if (result.price) {
        return { ...result, price: result.price.toNumber() };
      }
      throw new Error("Price not found for CounterOffer");
    });

    return Result.ok(offers);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getAllByBuyerId = async (
  id: string
): Promise<Result<CounterOffer[], Error>> => {
  try {
    const results = await prisma.counterOffer.findMany({
      where: { userId: id },
    });

    const validResults = results.filter((result) => !result.deletedAt);

    const offers = validResults.map((result) => {
      if (result.price) {
        return { ...result, price: result.price.toNumber() };
      }
      throw new Error("Price not found for CounterOffer");
    });

    return Result.ok(offers);
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
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const c = await transaction.counterOffer.findUnique({
          where: { id },
        });
        if (!c || c.deletedAt) {
          throw new Error("CounterOffer not found");
        }
        const result = await transaction.counterOffer.update({
          where: {
            id,
          },
          data,
        });
        if (result && result.price) {
          var a = { ...result, price: result.price.toNumber() };
          return a;
        }
        throw new Error("CounterOffer not found");
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
    const result = await prisma.counterOffer.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return Result.ok(result);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const acceptSingle = async (
  id: string
): Promise<Result<CounterOffer, Error>> => {
  try {
    return prisma.$transaction(async (transaction) => {
      const counterOffer = await transaction.counterOffer.update({
        where: { id },
        data: { status: true, updatedAt: new Date() },
      });
      
      const items = await transaction.item.findMany({
        where: { counterOfferId: counterOffer.id },
      });
      
      const buyer = await transaction.user.update({
        where: { id: counterOffer.userId },
        data: { items: { connect: items.map(item => ({ id: item.id })) } },
      });
      
      var pom = { ...counterOffer, price: counterOffer.price.toNumber(), items };
      return Result.ok(pom);
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    throw new Error(`Unknown error: ${error}`);
  }
};


export const declineSingle = async (
  id: string
): Promise<Result<CounterOffer, Error>> => {
  try {
    return prisma.$transaction(async (transaction) => {
      const counterOffer = await transaction.counterOffer.update({
        where: { id },
        data: { status: false, updatedAt: new Date() },
      });
      var pom = { ...counterOffer, price: counterOffer.price.toNumber() };
      return Result.ok(pom);
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    throw new Error(`Unknown error: ${error}`);
  }
};