import React, { useState } from "react";

export default function GenerateFlashcards({ userId, darkMode, onFlashcardsGenerated }) {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/generate_flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, notes }),
      });

      if (!res.ok) throw new Error("Failed to generate flashcards");
      const data = await res.json();
      onFlashcardsGenerated(data.flashcards); // update in UserPage
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Error generating flashcards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <h3 className="font-semibold mb-2 text-cyan-700 dark:text-cyan-200">Generate Flashcards</h3>
      <textarea
        className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
        rows={5}
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-800 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>
    </div>
  );
}
