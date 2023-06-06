import { Result } from "@badrap/result";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User, UserCreate, UserUpdate } from "../models";
import prisma from "../client";

export const getAll = async (): Promise<Result<User[], Error>> => {
  try {
    const result = await prisma.user.findMany({
      where: { deletedAt: null },
      include: { fundsAccount: true },
    });
    const aa = Array(result.length).fill(undefined);
    for (let i = 0; i < result.length; i++) {
      if (result[i] && result[i].fundsAccount) {
        aa[i] = {
          ...result[i],
          fundsAccount: {
            ...result[i].fundsAccount,
            balance: result[i].fundsAccount!.balance.toNumber(),
            balanceBlocked: result[i].fundsAccount!.balanceBlocked.toNumber(),
          },
        };
      }
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
): Promise<Result<User | null, Error>> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { fundsAccount: true },
    });
    if (user && user.fundsAccount && !user.deletedAt) {
      var a = {
        ...user,
        fundsAccount: {
          ...user.fundsAccount,
          balance: user.fundsAccount.balance.toNumber(),
          balanceBlocked: user.fundsAccount.balanceBlocked.toNumber(),
        },
      };
      return Result.ok(a);
    }
    throw new Error("User not found");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const createSingle = async (
  data: UserCreate
): Promise<Result<User, Error>> => {
  try {
    const dataa = { ...data, rating_sum: 0, rating_count: 0 };
    const user = await prisma.user.create({
      data: {
        ...dataa,
        fundsAccount: {
          create: { balance: 0, balanceBlocked: 0 },
        },
      },

      include: { fundsAccount: true },
    });
    if (user && user.fundsAccount) {
      var a = {
        ...user,
        fundsAccount: {
          ...user.fundsAccount,
          balance: user.fundsAccount.balance.toNumber(),
          balanceBlocked: user.fundsAccount.balanceBlocked.toNumber(),
        },
      };
      return Result.ok(a);
    }
    return Result.err(new Error(`asdasd ${user}`));
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};

export const updateSingle = async (
  id: string,
  data: UserUpdate
): Promise<Result<User, Error>> => {
  try {
    return Result.ok(
    await prisma.$transaction(async (transaction) => {
      var u = await transaction.user.findUnique({
        where: { id },
      });
      if (!u || u.deletedAt) {
        throw new Error("User not found");
      }   
      const user = await transaction.user.update({
        where: { id },
        data,
        include: { fundsAccount: true },
      });
      var a;
      if (user && user.fundsAccount) {
        a = {
          ...user,
          fundsAccount: {
            ...user.fundsAccount,
            balance: user.fundsAccount.balance.toNumber(),
            balanceBlocked: user.fundsAccount.balanceBlocked.toNumber(),
          },
        };
        return a;        
      }
      throw new Error("User not found");
    }),
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
    const user = await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return Result.ok(user);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return Result.err(error);
    }
    return Result.err(new Error(`Unknown error: ${error}`));
  }
};
