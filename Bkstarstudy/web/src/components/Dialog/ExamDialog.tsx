import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import axiosClient from '../../utils/api/axiosClient';

interface Props {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
    classId: number;
}

export default function ExamDialog({ open, onClose, onCreated, classId }: Props) {
    const [formData, setFormData] = useState({ name: '', awaitTime: '', startDate: '' });

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

            onCreated();
            onClose();
        } catch (err) {
            console.error("Lỗi khi tạo bài thi:", err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Tạo bài thi mới
                <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
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
                    <Button onClick={onClose}>Hủy</Button>
                    <Button type="submit" variant="contained">Tạo mới</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
