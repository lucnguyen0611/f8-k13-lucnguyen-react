import { useEffect } from "react"
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio, Paper } from "@mui/material"
import {useSelector, useDispatch} from "react-redux";
import { selectOption, showAnswer, nextQuestion, resetQuiz, QuizState } from "./store/slice/quiz.ts"

export default function() {
    const dispatch = useDispatch()
    const {
        currentQuestionIndex,
        selectedOption,
        showAnswer: showAnswerState,
        score,
        isFinished,
        questions,
    } = useSelector((state: QuizState) => state.quiz)

    const currentQuestion = questions[currentQuestionIndex]

    useEffect(() => {
        if (!showAnswerState || isFinished) return

        const timer = setTimeout(() => {
            dispatch(nextQuestion())
        }, 1500)

        return () => clearTimeout(timer)
    }, [showAnswerState, isFinished, dispatch])

    const handleSelectOption = (value: string) => {
        dispatch(selectOption(value))
    }

    const handleShowAnswer = () => {
        dispatch(showAnswer())
    }

    const handleRestart = () => {
        dispatch(resetQuiz())
    }

    if (isFinished) {
        return (
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5, textAlign: "center" }}>
                <Typography variant="h4">🎉 Hoàn thành bài quiz!</Typography>
                <Typography variant="h6" sx={{ my: 2 }}>
                    Điểm của bạn: {score}/{questions.length}
                </Typography>
                <Button variant="contained" size="large" onClick={handleRestart}>
                    Làm lại bài
                </Button>
            </Paper>
        )
    }

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                    Câu {currentQuestionIndex + 1}/{questions.length}
                </Typography>
            </Box>

            <Typography variant="h5" fontWeight="bold" my={3}>
                {currentQuestion.question}
            </Typography>

            <RadioGroup value={selectedOption || ""} onChange={(e) => handleSelectOption(e.target.value)}>
                {currentQuestion.options.map((option: any, index: number) => {
                    const isCorrect = option === currentQuestion.answer
                    const isSelected = option === selectedOption
                    const showResult = showAnswerState

                    return (
                        <FormControlLabel
                            key={index}
                            value={option}
                            control={<Radio />}
                            label={`${String.fromCharCode(65 + index)}. ${option}`}
                            disabled={showResult}
                            sx={{
                                border: "1px solid #ccc",
                                borderRadius: 1,
                                padding: 1,
                                marginBottom: 1,
                                backgroundColor: showResult
                                    ? isCorrect
                                        ? "#c8e6c9" // Green for correct answer
                                        : isSelected
                                            ? "#ffcdd2" // Red for wrong selected answer
                                            : "transparent"
                                    : "transparent",
                                borderColor: showResult ? (isCorrect ? "#4caf50" : isSelected ? "#f44336" : "#ccc") : "#ccc",
                                transition: "all 0.3s ease",
                            }}
                        />
                    )
                })}
            </RadioGroup>

            <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
                disabled={!selectedOption || showAnswerState}
                onClick={handleShowAnswer}
            >
                Đây là câu trả lời cuối cùng của tôi
            </Button>

            {showAnswerState && (
                <Box mt={2} textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                        {selectedOption === currentQuestion.answer
                            ? "🎉 Chính xác!"
                            : `❌ Sai rồi! Đáp án đúng là: ${currentQuestion.answer}`}
                    </Typography>
                </Box>
            )}
        </Paper>
    )
}
