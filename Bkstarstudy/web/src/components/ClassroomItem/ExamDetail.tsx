import {
    Grid, Typography, TextField, Button,
    MenuItem, RadioGroup, Radio, FormControlLabel, Paper, Box, Checkbox
} from "@mui/material";
import { useState } from "react";
import axiosClient from '../../utils/api/axiosClient.ts';

export default function CreateExamForm() {
    const [questionCount, setQuestionCount] = useState(1);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [totalTime, setTotalTime] = useState(0);
    const [description, setDescription] = useState("");
    const [questionTypes, setQuestionTypes] = useState<{ [key: number]: string }>({ 1: "multi" });
    const [singleAnswers, setSingleAnswers] = useState<{ [key: number]: string }>({});
    const [multiAnswers, setMultiAnswers] = useState<{ [key: number]: string[] }>({});
    const [fillAnswers, setFillAnswers] = useState<{ [key: number]: string }>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [examGroupId] = useState(1); // bạn có thể sửa lại nếu cần

    const mapType = (shortType: string) => {
        if (shortType === "multi") return "multiple-choice";
        if (shortType === "single") return "single-choice";
        if (shortType === "fill") return "long-response";
        return shortType;
    };


    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve((reader.result as string).split(",")[1]);
            reader.onerror = reject;
        });

    const handleSubmit = async () => {
        const questions = [];

        for (let i = 0; i < questionCount; i++) {
            const type = mapType(questionTypes[i + 1] || "multi");
            let answer = "";

            if (type === "single-choice") {
                answer = singleAnswers[i + 1] || "";
            } else if (type === "multiple-choice") {
                answer = multiAnswers[i + 1]?.join(",") || "";
            } else if (type === "long-response") {
                answer = fillAnswers[i + 1] || "";
            }

            questions.push({
                index: i,
                type,
                correct_answer: answer
            });
        }

        let fileData;
        if (imageFile) {
            const base64 = await toBase64(imageFile);
            fileData = { payload: base64 };
        }

        const payload: any = {
            name,
            code,
            exam_group: examGroupId,
            number_of_question: questionCount,
            total_time: totalTime * 60,
            description,
            questions,
        };

        if (fileData) {
            payload.file = imageFile;
        }

        console.log('fileData', fileData, 'imageFile', imageFile)

        console.log("Sending payload:", payload);

        try {
            const res = await axiosClient.post("/exam", payload);
            alert("Tạo đề thành công!");
            console.log('res', res)
        } catch (err) {
            alert("Lỗi khi tạo đề!");
            console.error(err);
        }
    };




    return (
        <Box p={2}>
            <Paper sx={{ p: 3, mb: 3, textAlign: "center" }}>
                <input
                    type="file"
                    accept="image/*"
                    id="upload-image"
                    hidden
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setImageFile(file);
                    }}
                />
                {!imageFile && (
                    <label htmlFor="upload-image">
                        <Button variant="outlined" component="span">
                            ⬆ TẢI ẢNH TỪ MÁY
                        </Button>
                    </label>
                )}
                {imageFile && (
                    <Box mt={2}>
                        <Button variant="text" color="error" onClick={() => setImageFile(null)}>
                            Xóa ảnh
                        </Button>
                        <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Preview"
                            style={{ maxHeight: 300, borderRadius: 8 }}
                        />
                    </Box>
                )}
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Tên đề *" fullWidth size="small" value={name} onChange={e => setName(e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Mã đề *" fullWidth size="small" value={code} onChange={e => setCode(e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField label="Thời gian làm bài (phút)" type="number" fullWidth size="small" value={totalTime} onChange={e => setTotalTime(+e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                            label="Số câu *"
                            type="number"
                            fullWidth
                            size="small"
                            value={questionCount}
                            onChange={e => {
                                const count = +e.target.value;
                                setQuestionCount(count);
                                setQuestionTypes(prev => {
                                    const newTypes = { ...prev };
                                    for (let i = 1; i <= count; i++) {
                                        if (!newTypes[i]) newTypes[i] = "multi";
                                    }
                                    return newTypes;
                                });
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <TextField
                            label="Mô tả"
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Grid>

                    {Array.from({ length: questionCount }, (_, i) => (
                        <Grid size={{ xs: 12}} key={i}>
                            <Typography fontWeight="bold" mt={2}>Câu {i + 1}</Typography>
                            <TextField
                                select
                                label="Loại câu hỏi"
                                size="small"
                                fullWidth
                                value={questionTypes[i + 1] || "multi"}
                                onChange={(e) => setQuestionTypes(prev => ({ ...prev, [i + 1]: e.target.value }))}
                                sx={{ mb: 1 }}
                            >
                                <MenuItem value="single">Chọn 1 đáp án</MenuItem>
                                <MenuItem value="multi">Chọn nhiều đáp án</MenuItem>
                                <MenuItem value="fill">Điền vào chỗ trống</MenuItem>
                            </TextField>

                            {questionTypes[i + 1] === "single" && (
                                <RadioGroup
                                    row
                                    value={singleAnswers[i + 1] || ""}
                                    onChange={(e) =>
                                        setSingleAnswers(prev => ({ ...prev, [i + 1]: e.target.value }))
                                    }
                                >
                                    {['A', 'B', 'C', 'D'].map(opt => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            )}

                            {questionTypes[i + 1] === "multi" && (
                                <Box>
                                    {['A', 'B', 'C', 'D'].map(opt => (
                                        <FormControlLabel
                                            key={opt}
                                            control={
                                                <Checkbox
                                                    checked={multiAnswers[i + 1]?.includes(opt) || false}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        setMultiAnswers(prev => {
                                                            const current = prev[i + 1] || [];
                                                            return {
                                                                ...prev,
                                                                [i + 1]: checked
                                                                    ? [...current, opt]
                                                                    : current.filter(item => item !== opt),
                                                            };
                                                        });
                                                    }}
                                                />
                                            }
                                            label={opt}
                                        />
                                    ))}
                                </Box>
                            )}

                            {questionTypes[i + 1] === "fill" && (
                                <TextField
                                    label="Đáp án đúng"
                                    fullWidth
                                    size="small"
                                    value={fillAnswers[i + 1] || ""}
                                    onChange={(e) =>
                                        setFillAnswers(prev => ({ ...prev, [i + 1]: e.target.value }))
                                    }
                                />
                            )}
                        </Grid>
                    ))}

                    <Grid size={{ xs: 12}}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                            TẠO ĐỀ BÀI
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
