import { useContext } from "react";
import Context from "./Context";
export const useStore = () => {
    // @ts-ignore
    const {state, dispatch} = useContext(Context)
    return {state, dispatch}
}