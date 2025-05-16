// app/api/tasks/[id]/route.ts

import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();
import { open } from "sqlite";

// Connect to the SQLite database
const dbPromise = open({ filename: "sqlite.db", driver: sqlite3.Database });

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const db = await dbPromise;
  await db.run("DELETE FROM todo WHERE id = ?", params.id);  // Delete task by ID
  return NextResponse.json({ success: true });  // Return success response
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { title } = await request.json();  // Get new title from the request body
  const db = await dbPromise;
  await db.run("UPDATE todo SET title = ? WHERE id = ?", title, params.id);  // Update task by ID
  return NextResponse.json({ success: true });  // Return success response
}
