'use server';

import { prisma } from '@/shared/prisma';

export async function searchSetsAction(searchQuery: string) {
  try {
    if (!searchQuery || searchQuery.trim().length === 0) {
      // Возвращаем пустой массив при пустом запросе
      return [];
    }

    const sets = await prisma.set.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                name: {
                  contains: searchQuery,
                  mode: 'insensitive',
                },
              },
              {
                code: {
                  contains: searchQuery,
                  mode: 'insensitive',
                },
              },
            ],
          },
          {
            parentSetCode: null, // Исключаем сеты с parentSetCode
          },
        ],
      },
      take: 20, // Ограничиваем количество результатов
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        code: true,
        name: true,
        iconSvgUri: true,
        parentSetCode: true,
      },
    });

    console.log('🌏🌏🌏🌏', sets);
    return sets;
  } catch (error) {
    console.error('Error searching sets:', error);
    throw new Error('Failed to search sets');
  }
}