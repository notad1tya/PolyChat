import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("PolyChat-theme") || "Coffee",
    setTheme: (theme) =>{
        localStorage.setItem("PolyChat-theme", theme);
        set({theme} );
    },
}));

