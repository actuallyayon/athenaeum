
import { auth } from "@/lib/auth";
import { client } from "@/lib/db";
import { headers } from "next/headers";

export async function POST(req) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { bookId } = await req.json();
    if (!bookId) {
      return Response.json({ error: "Book ID is required" }, { status: 400 });
    }

    const db = client.db();
    const borrowsCollection = db.collection("borrows");

    // Remove the borrow record
    const result = await borrowsCollection.deleteOne({
      userId: session.user.id,
      bookId: bookId
    });

    if (result.deletedCount === 0) {
      return Response.json({ error: "Record not found" }, { status: 404 });
    }

    return Response.json({ message: "Book returned successfully" });
  } catch (error) {
    console.error("Return error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
