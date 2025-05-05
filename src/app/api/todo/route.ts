import Database from "better-sqlite3";

const db = new Database("./database.db");

export async function GET() {
    const todo = db.prepare("SELECT * FROM todo").all();
    return Response.json(todo);
}

export async function POST(request: Request) {
    try {
        const { task } = await request.json();

        if (!task || task.trim() === "") {
            return new Response(JSON.stringify({ error: "Task cannot be empty" }), { status: 400 });
        }

        const stmt = db.prepare("INSERT INTO todo (task) VALUES (?)");
        const result = stmt.run(task);

        return new Response(
            JSON.stringify({ id: result.lastInsertRowid, task }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to save task" }), { status: 500 });
    }
}