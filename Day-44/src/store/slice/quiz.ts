import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Questions {
    id: number
    question: string
    options: string[]
    answer: string
}

const questions: Questions[] = [
    {
        id: 1,
        question: "Loài hoa nào là quốc hoa của Việt Nam?",
        options: ["Hoa hồng", "Hoa sen", "Hoa mai", "Hoa đào"],
        answer: "Hoa sen",
    },
    {
        id: 2,
        question: "Thủ đô của Việt Nam là gì?",
        options: ["Hà Nội", "TP.HCM", "Huế", "Đà Nẵng"],
        answer: "Hà Nội",
    },
    {
        id: 3,
        question: "Dãy núi nào dài nhất Việt Nam?",
        options: ["Hoàng Liên Sơn", "Trường Sơn", "Tam Đảo", "Bạch Mã"],
        answer: "Trường Sơn",
    },
    {
        id: 4,
        question: "Biển nào bao quanh phần lớn phía Đông Việt Nam?",
        options: ["Biển Đông", "Biển Đen", "Biển Nhật Bản", "Biển Andaman"],
        answer: "Biển Đông",
    },
    {
        id: 5,
        question: "Vịnh Hạ Long thuộc tỉnh nào của Việt Nam?",
        options: ["Hải Phòng", "Quảng Ninh", "Thanh Hóa", "Ninh Bình"],
        answer: "Quảng Ninh",
    },
    {
        id: 6,
        question: "Ai là người lãnh đạo Cách mạng Tháng Tám năm 1945?",
        options: ["Trần Phú", "Phạm Văn Đồng", "Hồ Chí Minh", "Võ Nguyên Giáp"],
        answer: "Hồ Chí Minh",
    },
    {
        id: 7,
        question: "Việt Nam gia nhập Liên Hợp Quốc vào năm nào?",
        options: ["1975", "1977", "1980", "1995"],
        answer: "1977",
    },
    {
        id: 8,
        question: "Sông nào dài nhất Việt Nam?",
        options: ["Sông Hồng", "Sông Cửu Long", "Sông Mekong", "Sông Đà"],
        answer: "Sông Cửu Long",
    },
    {
        id: 9,
        question: "Việt Nam có bao nhiêu tỉnh thành (tính đến 2025)?",
        options: ["58", "63", "64", "60"],
        answer: "63",
    },
    {
        id: 10,
        question: "Đơn vị tiền tệ của Việt Nam là gì?",
        options: ["Yên", "Đô la", "Đồng", "Nhân dân tệ"],
        answer: "Đồng",
    },
]

export interface QuizState {
    currentQuestionIndex: number
    selectedOption: string | null
    showAnswer: boolean
    score: number
    isFinished: boolean
    questions: typeof questions
}

const initialState: QuizState = {
    currentQuestionIndex: 0,
    selectedOption: null,
    showAnswer: false,
    score: 0,
    isFinished: false,
    questions: questions,
}

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        selectOption: (state, action: PayloadAction<string>) => {
            state.selectedOption = action.payload
        },

        showAnswer: (state) => {
            state.showAnswer = true
            // Check if answer is correct and update score
            const currentQuestion = state.questions[state.currentQuestionIndex]
            if (state.selectedOption === currentQuestion.answer) {
                state.score += 1
            }
        },

        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1
                state.selectedOption = null
                state.showAnswer = false
            } else {
                state.isFinished = true
            }
        },

        finishQuiz: (state) => {
            state.isFinished = true
        },

        resetQuiz: (state) => {
            state.currentQuestionIndex = 0
            state.selectedOption = null
            state.showAnswer = false
            state.score = 0
            state.isFinished = false
        },
    },
})

export const { selectOption, showAnswer, nextQuestion, finishQuiz, resetQuiz } = quizSlice.actions
export default quizSlice.reducer
