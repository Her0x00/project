"use client"
import React, { useState } from "react";

export default function Page() {
    const [games, setGames] = useState([]);
    const [genre, setGenre] = useState("");
    const [publisher, setPublisher] = useState("");

    const fetchGames = async () => {
        const params = new URLSearchParams();
        if (genre) params.append("genre", genre);
        if (publisher) params.append("publisher", publisher);

        const res = await fetch(`/api/games?${params.toString()}`);
        const data = await res.json();
        setGames(data);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchGames();
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="mb-4 space-y-2">
                <input
                    type="text"
                    placeholder="Search by genre..."
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="border p-2 rounded mr-2 w-full sm:w-auto"
                />
                <input
                    type="text"
                    placeholder="Search by publisher..."
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    className="border p-2 rounded mr-2 w-full sm:w-auto"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Search
                </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {games.map((game: any) => (
                    <div key={game.id} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-bold">{game.title}</h2>
                        <p><strong>Genre:</strong> {game.genre}</p>
                        <p><strong>Publisher:</strong> {game.publisher}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
