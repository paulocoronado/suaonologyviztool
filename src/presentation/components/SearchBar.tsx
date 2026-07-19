import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-40 rounded-md border border-indigo-800 bg-indigo-900 px-2 py-1 text-sm text-white placeholder-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="rounded-md bg-indigo-800 px-2 py-1 text-sm hover:bg-indigo-700"
      >
        Buscar
      </button>
    </form>
  );
}
