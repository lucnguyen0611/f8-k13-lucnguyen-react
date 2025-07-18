import {
    Box,
    Typography,
    Paper,
    Button,
    Grid,
    Card,
    CardContent,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../utils/api/axiosClient';
import type { ExamGroupI } from '../../utils';

interface Exam {
    id: number;
    name: string;
    code: string;
    exam_group: number;
    total_time: number;
    number_of_question: number;
}

const ExamDetail = () => {
    const { examId } = useParams();
    const groupId = Number(examId);
    const [examGroup, setExamGroup] = useState<ExamGroupI | null>(null);
    const [exams, setExams] = useState<Exam[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get(`/exam_group/${examId}`)
            .then((res) => {
                setExamGroup(res.data);
            })
            .catch((err) => {
                console.error("Không thể lấy thông tin bài thi:", err);
            });

        axiosClient.get('/exam')
            .then((res) => {
                const allExams = res.data; // hoặc res.data.data nếu response bọc thêm 1 lớp
                const filtered = allExams.filter((exam: Exam) => exam.exam_group === groupId);
                setExams(filtered);
            })
            .catch((err) => {
                console.error("Không thể lấy danh sách đề thi:", err);
            });

    }, [examId]);

    if (!examGroup) return <Typography>Đang tải...</Typography>;

    const handleAdd = () => {
        navigate('0');
    };

    return (
        <Box p={2}>
            <Typography variant="h6" mb={2} fontWeight="bold">
                Danh sách bài thi {'>'} Chi tiết bài thi
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    border: '1px solid #00bcd4',
                    borderRadius: 2,
                    p: 3,
                    mb: 4
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography mb={1}>
                            <strong>Tên bài thi:</strong> {examGroup.name}
                        </Typography>
                        <Typography mb={1}>
                            <strong>Ngày bắt đầu:</strong> {examGroup.start_time}
                        </Typography>
                        <Typography>
                            <strong>Thời gian chờ giữa các đề bài:</strong> {examGroup.await_time} phút
                        </Typography>
                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 4 }}
                        display="flex"
                        justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                        gap={1}
                        mt={{ xs: 2, md: 0 }}
                    >
                        <Button variant="contained" color="success">Chỉnh sửa</Button>
                        <Button variant="outlined" color="error">Xóa bỏ</Button>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                <Grid>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Danh sách đề bài
                    </Typography>
                </Grid>
                <Grid>
                    <Button variant="contained" color="primary" onClick={handleAdd}>
                        + Thêm đề bài
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {exams.map((exam) => (
                    <Grid key={exam.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Card
                            variant="outlined"
                            sx={{
                                borderStyle: 'dashed',
                                height: '100%',
                                position: 'relative'
                            }}
                        >
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="start">
                                    <Typography fontWeight="bold">
                                        Đề bài: {exam.name}
                                    </Typography>
                                    <IconButton size="small" onClick={() => navigate(`${exam.id}`)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <Typography variant="body2" mt={1}>
                                    Mã đề: {exam.code}
                                </Typography>
                                <Typography variant="body2">
                                    Thời gian làm bài: {Math.floor(exam.total_time / 60)} phút
                                </Typography>
                                <Typography variant="body2">
                                    Số câu hỏi: {exam.number_of_question}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Outlet />
        </Box>
    );
};

export default ExamDetail;
