import { createContext, useContext } from "react";

export const Context = createContext();

export default function useCustomContext() {
    return useContext(Context);
}