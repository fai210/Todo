import { create } from "zustand";


type MoodType = "light" | "dark";

export interface Mood {
      mood: MoodType;
      toggleMood: () => void;
    }
    
  
export const moodStore = create<Mood>((set) => ({
    mood: "light",
    toggleMood: () => set((state) => ({
        mood: state.mood === "dark" ? "light" : "dark"   
    }))
}));

export const mood = () => moodStore((state)=> state.mood)
export const toggleMood = () => moodStore((state)=> state.toggleMood)

// const Zustand = () => {
//     const { mood, toggleMood } = moodStore() 
//     return (
//         <div>
//             <p>{mood}</p>
//             <button onClick={toggleMood} className="dark:bg-black" >Change State</button>
//         </div>
//     );
// };

// export default Zustand;


