import React, { useState } from 'react';
import {
    Box, Button, Grid, Typography, Paper, TextField, Dialog, DialogTitle,
    DialogContent, DialogActions, IconButton
} from '@mui/material';
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from '../../utils/api/axiosClient';
import type { ExamGroupI } from '../../utils';
import {useNavigate} from "react-router-dom";
import { Outlet } from "react-router-dom";

interface TestsProps {
    examGroup: ExamGroupI[];
    classId: number;
}

export default function ExamGroup({ examGroup, classId }: TestsProps) {
    const [tests, setTests] = useState<ExamGroupI[]>(examGroup);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', awaitTime: '', startDate: '' });

    const fetchTests = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/exam_group');
            setTests(res.data || []);
        } catch (err) {
            console.error("Lỗi khi tải danh sách bài thi:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dateOnly = formData.startDate.split("T")[0];

            await axiosClient.post('/exam_group/', {
                name: formData.name,
                class_id: classId,
                start_time: dateOnly,
                await_time: parseInt(formData.awaitTime),
                is_once: true,
                is_save_local: true
            });

            await fetchTests();
            handleClose();
        } catch (err) {
            console.error("Lỗi khi tạo bài thi:", err);
        }
    };

    const now = Date.now();

    const ongoingTests = tests.filter(test => {
        const start = new Date(test.start_time).getTime();
        const end = start + test.await_time * 1000;
        return now >= start && now <= end;
    });

    const upcomingTests = tests.filter(test => {
        const start = new Date(test.start_time).getTime();
        return start > now;
    });

    if (loading) return <div> Đang tải bài thi...</div>;

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold">
                    Danh sách Bài thi
                </Typography>

                <Box display="flex" gap={2}>
                    <TextField
                        size="small"
                        placeholder="Tìm kiếm"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                    />
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        + Tạo bài thi
                    </Button>
                </Box>
            </Box>

            <TestSection title="Bài thi đang diễn ra" tests={ongoingTests} color="#03a9f4" />
            <TestSection title="Bài thi chưa bắt đầu" tests={upcomingTests} color="#ff9800" />

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    Tạo bài thi mới
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tên bài thi"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Thời gian chờ (giây)"
                        name="awaitTime"
                        value={formData.awaitTime}
                        onChange={handleChange}
                        required
                        type="number"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Thời gian bắt đầu"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSubmit} variant="contained">Tạo mới</Button>
                </DialogActions>
            </Dialog>
            <Outlet />
        </Box>
    );
}

function TestSection({
                         title,
                         tests,
                         color = "#03a9f4"
                     }: {
    title: string;
    tests: ExamGroupI[];
    color?: string;
}) {
    const navigate = useNavigate();

    const handleClick = (testId: number) => {
        navigate(`${testId}`); // điều hướng sang trang chi tiết bài thi
    };
    return (
        <>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                {title}
            </Typography>

            <Grid container spacing={2} mb={4}>
                {tests.length > 0 ? (
                    tests.map((test, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                            <Paper sx={{
                                p: 2,
                                borderLeft: `4px solid ${color}`,
                                display: "flex",
                                gap: 2,
                                borderRadius: 2
                            }}
                                   onClick={() => handleClick(test.id)}
                            >
                                <AssignmentIcon fontSize="large" sx={{ color }} />
                                <Box>
                                    <Typography fontWeight="bold">{test.name}</Typography>
                                    <Typography fontSize={14} color="text.secondary">
                                        Ngày bắt đầu: {new Date(test.start_time).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography ml={2}>Không có bài thi.</Typography>
                )}
            </Grid>
        </>
    );
}
