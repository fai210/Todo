import { useEffect, useState } from "react";
import http from "./http/http";

interface AddTodoProps {
    onSubmit: (title: string, userId: string) => void;
}

function AddTodoForme({ onSubmit }: AddTodoProps) {
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await http.get<{ id: string }[]>("/user");
                if (response.data.length > 0) {
                    setUserId(response.data[0].id);
                }
            } catch (err) {
                console.error("Error fetching user ID:", err);
                setError("Failed to fetch user ID.");
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        getUserId();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!input.trim() || !userId) return; 

        try {
            const response = await http.post<{ title: string, userId: string }>("todo", { title: input, userId });
            console.log(response);
            onSubmit(input, userId);
            setInput("");
        } catch (err) {
            console.error("Error adding todo:", err);
            setError("Failed to add todo.");
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Display loading text
    }

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What needs to be done?"
                className="rounded-s-md grow border border-gray-400 p-2"
            />
            <button type="submit" className="w-16 rounded-e-md bg-black text-white hover:bg-slate-500">
                Add
            </button>
            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        </form>
    );
}

export default AddTodoForme;


