import { auth } from "@/lib/auth";
import { client } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    const db = client.db();
    const borrowsCollection = db.collection("borrows");

    // Check if already borrowed
    const existingBorrow = await borrowsCollection.findOne({
      userId: session.user.id,
      bookId: bookId,
    });

    if (existingBorrow) {
      return NextResponse.json({ message: "Book already borrowed" }, { status: 200 });
    }

    // Add borrow record
    await borrowsCollection.insertOne({
      userId: session.user.id,
      bookId: bookId,
      borrowedAt: new Date(),
    });

    return NextResponse.json({ message: "Book borrowed successfully" }, { status: 201 });
  } catch (error) {
    console.error("Borrow error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = client.db();
    const borrowsCollection = db.collection("borrows");

    const borrows = await borrowsCollection.find({ userId: session.user.id }).toArray();
    const bookIds = borrows.map(b => b.bookId);

    return NextResponse.json({ bookIds });
  } catch (error) {
    console.error("Fetch borrows error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
