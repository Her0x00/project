// app/api/tasks/route.ts

import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();
import { open } from "sqlite";

// Connect to the SQLite database
const dbPromise = open({ filename: "sqlite.db", driver: sqlite3.Database });

export async function GET() {
  const db = await dbPromise;
  const tasks = await db.all("SELECT * FROM todo");
  return NextResponse.json(tasks); // Return tasks from the database
}

export async function POST(request: Request) {
  const { title } = await request.json(); // Get title from the request body
  const db = await dbPromise;

  const result = await db.run(
    "INSERT INTO todo (title, isdone, createdat) VALUES (?, ?, ?)",
    title,
    0,
    new Date().toISOString() // Add current timestamp
  );

  const newTask = await db.get("SELECT * FROM todo WHERE id = ?", result.lastID);
  return NextResponse.json(newTask); // Return the newly created task
}

export async function PUT(request: Request) {
  const { id, title } = await request.json(); // Get id and title from the request body
  const db = await dbPromise;

  await db.run("UPDATE todo SET title = ? WHERE id = ?", title, id);

  const updatedTask = await db.get("SELECT * FROM todo WHERE id = ?", id);
  return NextResponse.json(updatedTask); // Return the updated task
}

export async function DELETE(request: Request) {
  const { id } = await request.json(); // Get id from the request body
  const db = await dbPromise;

  await db.run("DELETE FROM todo WHERE id = ?", id);
  return NextResponse.json({ success: true }); // Return success response
}
