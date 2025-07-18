import { FHeader } from "../../components";
import { useState, useContext } from "react";
import {
    Box,
    Button,
    TextField,
    Paper,
    Typography,
} from "@mui/material";
import axiosClient from '../../utils/api/axiosClient.ts';
import { useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreProvider';

export default function ClassAdd() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const { userInfo } = useContext(StoreContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !code) return alert("Vui lòng nhập đầy đủ thông tin");
        if (!userInfo?.id) return alert("Bạn chưa đăng nhập hoặc token đã hết hạn");

        const payload = {
            name,
            code,
            users: [userInfo.id], // ✅ Dùng id từ context
        };

        try {
            const response = await axiosClient.post(`/master/class`, payload);
            console.log("Tạo lớp thành công:", response.data);
            navigate("/classes");
        } catch (err: any) {
            console.error("Lỗi tạo lớp:", err);
            alert("Tạo lớp thất bại. Vui lòng thử lại.");
        }
    };

    const handleCancel = () => {
        setName('');
        setCode('');
    };

    return (
        <>
            <FHeader hide={true} />
            <Box sx={{ mx: 'auto', mt: '64px' }} p={3} bgcolor="#f9f9fb">
                <Typography variant="h4" fontWeight="bold">
                    Thêm lớp học mới
                </Typography>
                <Box
                    minHeight="100vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="#f7f8fa"
                >
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: 500 }}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Tên lớp học <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Nhập tên lớp học"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ mb: 3 }}
                            />

                            <Typography variant="h6" fontWeight="bold" mb={2}>
                                Mã bảo vệ <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Nhập mã bảo vệ"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                sx={{ mb: 3 }}
                            />

                            <Box display="flex" justifyContent="flex-end" gap={2}>
                                <Button variant="outlined" onClick={handleCancel}>
                                    Hủy
                                </Button>
                                <Button variant="contained" type="submit">
                                    Tạo mới
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}
