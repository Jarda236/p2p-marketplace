import { Result } from "@badrap/result";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Offer, OfferCreate, OfferUpdate } from "../models";
import prisma from "../client";

export const getAll = async (): Promise<Result<Offer[], Error>> => {
  try {
    const result = await prisma.offer.findMany({
      where: { deletedAt: null },
    });
    const aa = Array(result.length).fill(undefined);
    for (let i = 0; i < result.length; i++) {
      aa[i] = { ...result[i], price: result[i].price.toNumber() };
    }
    return Result.ok(aa);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getAllBySellerId = async (
  id: string
): Promise<Result<Offer[], Error>> => {
  try {
    const result = await prisma.offer.findMany({
      where: {
        userId: id,
        deletedAt: null,
      },
    });
    const aa = Array(result.length).fill(undefined);
    for (let i = 0; i < result.length; i++) {
      aa[i] = { ...result[i], price: result[i].price.toNumber() };
    }
    return Result.ok(aa);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const getAllByBuyerId = async (
  id: string
): Promise<Result<Offer[], Error>> => {
  try {
    const result = await prisma.offer.findMany({
      where: {
        buyerId: id,
        deletedAt: null,
      },
    });
    const aa = Array(result.length).fill(undefined);
    for (let i = 0; i < result.length; i++) {
      aa[i] = { ...result[i], price: result[i].price.toNumber() };
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
): Promise<Result<Offer | null, Error>> => {
  try {
    var result = await prisma.offer.findUnique({ where: { id } });
    if (!result || result.deletedAt) {
      throw new Error("Offer not found");
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
  data: OfferCreate
): Promise<Result<Offer, Error>> => {
  try {
    const result = await prisma.offer.create({ data });
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
  data: OfferUpdate
): Promise<Result<Offer, Error>> => {
  try {
    return Result.ok(
      await prisma.$transaction(async (tx) => {
        const o = await tx.offer.findUnique({ where: { id } });
        if (!o || o.deletedAt) {
          console.log(o);
          throw new Error("Offer not found");
        }

        const result = await tx.offer.update({ where: { id }, data });
        if (result && result.price) {
          var a = { ...result, price: result.price.toNumber() };
          return a;
        }
        console.log(result);
        throw new Error("Offer not found");
      })
    );
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const buySingle = async (
  offerId: string,
  buyerId: string, // buyerId
  data: OfferUpdate // seller info
): Promise<Result<Offer, Error>> => {
  try {
    return Result.ok(
      await prisma.$transaction(async (tx) => {

        const offer = await tx.offer.findUnique({ where: { id: offerId } });
        if (!offer || offer.deletedAt) {
          console.log(offer);
          throw new Error("Offer not found");
        }
        const seller = await tx.user.findUnique({
          where: { id: data.userId },
          include: { fundsAccount: true },
        });
        if (!seller || seller.deletedAt || seller.fundsAccount === null) {
          console.log(seller);
          throw new Error("Seller or fundsAccount does not exist");
        }
        const buyer = await tx.user.findUnique({
          where: { id: buyerId },
          include: { fundsAccount: true },
        });
        if (!buyer || buyer.deletedAt || !buyer.fundsAccount) {
          console.log(buyer);
          throw new Error("Seller or fundsAccount does not exist");
        }

        if (buyer.fundsAccount?.balance.toNumber() < offer.price.toNumber()) {
          throw new Error("Not enough balance");
        }

        const updatedBuyer = await tx.fundsAccount.update({
          where: { id: buyer.fundsAccount.id },
          data: {
            balance: buyer.fundsAccount.balance.toNumber() - offer.price.toNumber(),
          },
        });
        const updatedSeller = await tx.fundsAccount.update({
          where: { id: seller.fundsAccount.id },
          data: {
            balance: seller.fundsAccount.balance.toNumber() + offer.price.toNumber(),
          },
        });
        const updatedItem = await tx.item.update({
          where: { id: offer.itemId },
          data: {
            userId: buyerId,
          },
        });
        const updatedOffer = await tx.offer.update({ 
          where: { id: offerId },
          data: {
            buyerId: buyerId,
            buyerName: buyer.name,
          },
        });



        const result = await tx.offer.update({ where: { id }, data });
        if (result && result.price) {
          var a = { ...result, price: result.price.toNumber() };
          return a;
        }
        console.log(result);
        throw new Error("Offer not found");
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
    const result = await prisma.offer.update({
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
