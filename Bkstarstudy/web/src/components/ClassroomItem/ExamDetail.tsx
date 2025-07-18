import {
    Grid,
    Typography,
    TextField,
    Button,
    MenuItem,
    RadioGroup,
    Radio,
    FormControlLabel,
    Paper,
    Box,
    Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../utils/api/axiosClient";

interface Props {
    mode: "create" | "edit";
}

export default function ExamForm({ mode }: Props) {
    const { examId, examDetailId } = useParams();
    const [loading, setLoading] = useState(false);

    const [questionCount, setQuestionCount] = useState(1);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [totalTime, setTotalTime] = useState(0);
    const [description, setDescription] = useState("");

    const [questionTypes, setQuestionTypes] = useState<{ [key: number]: string }>({});
    const [singleAnswers, setSingleAnswers] = useState<{ [key: number]: string }>({});
    const [multiAnswers, setMultiAnswers] = useState<{ [key: number]: string[] }>({});
    const [fillAnswers, setFillAnswers] = useState<{ [key: number]: string }>({});

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [filePayload, setFilePayload] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (mode === "edit" && examId && examId !== "0") {
            setLoading(true);
            axiosClient.get(`/exam/${examDetailId}`)
                .then(res => {
                    const data = res.data;
                    setName(data.name);
                    setCode(data.code);
                    setTotalTime(data.total_time / 60);
                    setDescription(data.description);
                    setQuestionCount(data.number_of_question);
                    setImageUrl(data.file?.url || null);

                    const types: any = {};
                    const s: any = {};
                    const m: any = {};
                    const f: any = {};

                    data.questions.forEach((q: any, i: number) => {
                        const index = i + 1;
                        types[index] = q.type === "single-choice" ? "single" :
                            q.type === "multiple-choice" ? "multi" : "fill";

                        const correct = q.correct_answer;
                        if (!correct) return; // bỏ qua nếu không có

                        if (types[index] === "single") {
                            s[index] = correct;
                        } else if (types[index] === "multi") {
                            m[index] = correct.split(",");
                        } else {
                            f[index] = correct;
                        }
                    });

                    setQuestionTypes(types);
                    setSingleAnswers(s);
                    setMultiAnswers(m);
                    setFillAnswers(f);
                })
                .finally(() => setLoading(false));
        }
    }, [mode, examDetailId]);

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve((reader.result as string).split(",")[1]);
            reader.onerror = reject;
        });

    const handleSubmit = async () => {
        const questions = Array.from({ length: questionCount }, (_, i) => {
            const type = questionTypes[i + 1] || "multi";
            let answer = "";
            if (type === "single") answer = singleAnswers[i + 1] || "";
            else if (type === "multi") answer = multiAnswers[i + 1]?.join(",") || "";
            else answer = fillAnswers[i + 1] || "";

            return {
                index: i,
                type: type === "single" ? "single-choice" :
                    type === "multi" ? "multiple-choice" : "long-response",
                correct_answer: answer,
            };
        });

        const payload = {
            name,
            code,
            exam_group: examId,
            number_of_question: questionCount,
            total_time: totalTime * 60,
            description,
            questions,
            correct_answer: {},
            deleted_questions: [],
            file: {
                id: 0,
                url: "",
                payload: filePayload,
            },
        };

        if (imageFile) {
            const base64 = await toBase64(imageFile);
            payload.file.payload = base64;
        }

        try {
            if (mode === "edit") {
                await axiosClient.put(`/exam/${examDetailId}`, payload);
                alert("Cập nhật đề thành công!");
            } else {
                await axiosClient.post("/exam", payload);
                alert("Tạo đề thành công!");
            }
        } catch (err) {
            console.error("Lỗi:", err);
            alert("Đã xảy ra lỗi!");
        }
    };

    if (loading) return <Typography>Đang tải dữ liệu đề thi...</Typography>;

    return (
        <Box p={2}>
            {/* Upload ảnh */}
            <Paper sx={{ p: 3, mb: 3, textAlign: "center" }}>
                <input
                    type="file"
                    accept="image/*"
                    id="upload-image"
                    hidden
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setImageFile(file);
                            setImageUrl(null);
                        }
                    }}
                />
                {!imageFile && !imageUrl ? (
                    <label htmlFor="upload-image">
                        <Button variant="outlined" component="span">⬆ TẢI ẢNH TỪ MÁY</Button>
                    </label>
                ) : (
                    <Box mt={2}>
                        <Button variant="text" color="error" onClick={() => { setImageFile(null); setImageUrl(null); }}>
                            Xóa ảnh
                        </Button>
                        <img
                            src={imageFile ? URL.createObjectURL(imageFile) : imageUrl || ""}
                            alt="Preview"
                            style={{ maxHeight: 300, borderRadius: 8 }}
                        />
                    </Box>
                )}
            </Paper>

            {/* Form nội dung */}
            <Paper sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Tên đề *" fullWidth size="small" value={name} onChange={(e) => setName(e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Mã đề *" fullWidth size="small" value={code} onChange={(e) => setCode(e.target.value)} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Thời gian làm bài (phút)"
                            type="number"
                            fullWidth
                            size="small"
                            value={totalTime}
                            onChange={(e) => setTotalTime(+e.target.value)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            label="Số câu *"
                            type="number"
                            fullWidth
                            size="small"
                            value={questionCount}
                            onChange={(e) => {
                                const count = +e.target.value;
                                setQuestionCount(count);
                                setQuestionTypes((prev) => {
                                    const newTypes = { ...prev };
                                    for (let i = 1; i <= count; i++) {
                                        if (!newTypes[i]) newTypes[i] = "multi";
                                    }
                                    return newTypes;
                                });
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Mô tả"
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>

                    {/* Câu hỏi */}
                    {Array.from({ length: questionCount }, (_, i) => (
                        <Grid size={{ xs: 12 }} key={i}>
                            <Typography fontWeight="bold" mt={2}>Câu {i + 1}</Typography>

                            <TextField
                                select
                                label="Loại câu hỏi"
                                size="small"
                                fullWidth
                                value={questionTypes[i + 1] || "multi"}
                                onChange={(e) => setQuestionTypes((prev) => ({ ...prev, [i + 1]: e.target.value }))}
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
                                    onChange={(e) => setSingleAnswers((prev) => ({ ...prev, [i + 1]: e.target.value }))}
                                >
                                    {["A", "B", "C", "D"].map(opt => (
                                        <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                                    ))}
                                </RadioGroup>
                            )}

                            {questionTypes[i + 1] === "multi" && (
                                <Box>
                                    {["A", "B", "C", "D"].map(opt => (
                                        <FormControlLabel
                                            key={opt}
                                            control={
                                                <Checkbox
                                                    checked={multiAnswers[i + 1]?.includes(opt) || false}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        setMultiAnswers((prev) => {
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
                                    onChange={(e) => setFillAnswers((prev) => ({ ...prev, [i + 1]: e.target.value }))}
                                />
                            )}
                        </Grid>
                    ))}

                    {/* Gửi form */}
                    <Grid size={{ xs: 12 }}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                            {mode === "edit" ? "CẬP NHẬT ĐỀ BÀI" : "TẠO ĐỀ BÀI"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

