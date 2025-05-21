import Database from "better-sqlite3"
import { NextRequest } from "next/server"

const db = new Database("./games.db")

export async function GET(req:NextRequest){
    const { searchParams } = new URL(req.nextUrl)
    console.log(searchParams)
    if (searchParams.has("publisher")) {
        const publisher = searchParams.get("publisher")
        const game = db.prepare("SELECT * FROM Games WHERE publisher = ?").all(publisher)
        return Response.json(game)
    }
    if (searchParams.has("genre")) {
        const genre = searchParams.get("genre")
        console.log(genre)
        const game = db.prepare("SELECT * FROM Games WHERE genre = ?").all(genre)
        console.log(game)
        return Response.json(game)
    }
    const games = db.prepare("SELECT * FROM Games;").all()
    return Response.json(games)
} 