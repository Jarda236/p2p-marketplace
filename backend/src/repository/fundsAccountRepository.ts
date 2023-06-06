import { Result } from "@badrap/result";
import {
  Decimal,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import {
  FundsAccount,
  FundsAccountCreate,
  FundsAccountUpdate,
} from "../models";
import prisma from "../client";

export const getAll = async (): Promise<Result<FundsAccount[], Error>> => {
  try {
    const result = await prisma.fundsAccount.findMany({
      where: { deletedAt: null },
    });
    const aa = Array(result.length).fill(undefined);
    for (let i = 0; i < result.length; i++) {
      aa[i] = { ...result[i], balance: result[i].balance.toNumber() };
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
): Promise<Result<FundsAccount | null, Error>> => {
  try {
    var result = await prisma.fundsAccount.findUnique({ where: { id } });
    if (!result || result.deletedAt) {
      throw new Error("FundsAccount not found");
    }
    if (result && result.balance) {
      var a = {
        ...result,
        balance: result.balance.toNumber(),
        balanceBlocked: result.balanceBlocked.toNumber(),
      };
      return Result.ok(a);
    }
    throw new Error("FundsAccount not found");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const createSingle = async (
  data: FundsAccountCreate
): Promise<Result<FundsAccount, Error>> => {
  try {
    const result = await prisma.fundsAccount.create({ data });
    if (result && result.balance) {
      var a = {
        ...result,
        balance: result.balance.toNumber(),
        balanceBlocked: result.balanceBlocked.toNumber(),
      };
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
  data: FundsAccountUpdate
): Promise<Result<FundsAccount, Error>> => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const f = await transaction.fundsAccount.findUnique({ where: { id } });
        if (!f || f.deletedAt) {
          throw new Error("FundsAccount not found");
        }
        const result = await transaction.fundsAccount.update({
          where: { id },
          data,
        });
        if (result && result.balance) {
          var a = {
            ...result,
            balance: result.balance.toNumber(),
            balanceBlocked: result.balanceBlocked.toNumber(),
          };
          return a;
        }
        throw new Error("FundsAccount not found");
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
    const result = await prisma.fundsAccount.update({
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
