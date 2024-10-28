
// import { PropsWithChildren, createContext, useContext, useState } from "react";

// type MoodType = "light" | "dark";

// export interface Mood {
//   mood?: MoodType;
//   updateMood: (mood: MoodType) => void;
// }

// const MoodContext = createContext<Mood | undefined>(undefined);

// const MoodProvider = ({ children }: PropsWithChildren) => {
//   const [mood, setMood] = useState<MoodType>("light");

//   const updateMood = (newMood: MoodType) => {
//     document.documentElement.classList.add(newMood)
//     setMood(newMood);
//   };

//   return (
//     <MoodContext.Provider value={{ mood, updateMood }}>
//       {children}
//     </MoodContext.Provider>
//   );
// };

// export { MoodProvider, MoodContext };

// export const useMood= () => useContext(MoodContext);















