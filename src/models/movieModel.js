import prisma from '../utils/prismaClient.js';

export const create = async (data) => {
    return await prisma.movie.create({ data });
};

export const findAll = async (filters = {}) => {
    const { title, genre, available, minRating, maxDuration } = filters;
    const where = {};

    if (title) where.title = { contains: title, mode: 'insensitive' };
    if (genre) where.genre = genre;
    if (available !== undefined) where.available = available === 'true';
    if (minRating) where.rating = { gte: parseFloat(minRating) };
    if (maxDuration) where.duration = { lte: parseInt(maxDuration) };

    return await prisma.movie.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

export const findById = async (id) => {
    return await prisma.movie.findUnique({
        where: { id: parseInt(id) },
    });
};

export const findByTitle = async (title) => {
    return await prisma.movie.findFirst({
        where: { title: { equals: title, mode: 'insensitive' } },
    });
};

export const update = async (id, data) => {
    return await prisma.movie.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id) => {
    return await prisma.movie.delete({
        where: { id: parseInt(id) },
    });
};
