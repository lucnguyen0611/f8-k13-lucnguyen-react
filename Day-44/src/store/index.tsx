import { configureStore } from "@reduxjs/toolkit"
import quizReducer from "./slice/quiz.ts"

const store = configureStore({
    reducer: {
        quiz: quizReducer,
    },
})

export default store