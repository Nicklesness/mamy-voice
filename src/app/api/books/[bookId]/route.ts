import { NextRequest, NextResponse } from "next/server";
import { getBookById } from "@/lib/books";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;
  const book = await getBookById(bookId);

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  // Don't expose full text to client
  const { text: _text, ...bookData } = book;
  return NextResponse.json(bookData);
}
