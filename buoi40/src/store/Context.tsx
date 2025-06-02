import { createContext } from "react";
import type { TodoState } from "./reducer.tsx";

interface TypeContext {
    state: TodoState,
    dispatch: React.Dispatch<any>
}

const Context = createContext<TypeContext | null>(null)

export default Context