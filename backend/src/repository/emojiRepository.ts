import { Result } from "@badrap/result";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Emoji, EmojiCreate, EmojiUpdate } from '../models';
import prisma from '../client';

export const getAll = async (): Promise<Result<Emoji[], Error>> => {
    try {
        const emojis = await prisma.emoji.findMany();
        return Result.ok(emojis);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}


export const getSingle = async (id: string): Promise<Result<Emoji | null, Error>> => {
    try {
        const emoji = await prisma.emoji.findUnique({ where: { id } });
        return Result.ok(emoji);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const createSingle = async (data: EmojiCreate): Promise<Result<Emoji, Error>> => {
    try {
        const emoji = await prisma.emoji.create({ data });
        return Result.ok(emoji);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};


export const updateSingle = async (id: string, data: EmojiUpdate): Promise<Result<Emoji, Error>> => {
    try {
        const emoji = await prisma.emoji.update({ where: { id }, data });
        return Result.ok(emoji);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
};
  

export const deleteSingle = async (id: string): Promise<Result<Emoji, Error>> => {
    try {
        const emoji = await prisma.emoji.delete({ where: { id } });
        return Result.ok(emoji);
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return Result.err(error);
        }
        return Result.err(new Error(`Unknown error: ${error}`));
    }
}