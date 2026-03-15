import { prisma } from "@/lib/prisma";
import type { Book as PrismaBook } from "@/generated/prisma/client";

export type { PrismaBook as BookRecord };

// Map Prisma Book to app Book type (backward compatible)
function toAppBook(b: PrismaBook) {
  return {
    id: b.id,
    title: b.title,
    author: b.author,
    description: b.description,
    summary: b.summary,
    coverColor: b.coverColor,
    pageCount: b.pageCount,
    text: b.text,
    ageRange: b.ageRange,
    duration: Math.ceil(b.estimatedMinutes),
    estimatedMinutes: b.estimatedMinutes,
    coverImageUrl: b.coverImageUrl,
    category: b.category,
  };
}

export type AppBook = ReturnType<typeof toAppBook>;

export async function getBooks() {
  const books = await prisma.book.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });
  return books.map(toAppBook);
}

export async function getBookById(id: string) {
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book || !book.isPublished) return undefined;
  return toAppBook(book);
}
