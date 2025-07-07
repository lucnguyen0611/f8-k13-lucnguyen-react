// import { FHeader } from "../../components";
// import {useState} from "react";
// import {
//     Box,
//     Button,
//     TextField,
//     Paper,
//     Typography,
// } from "@mui/material";
// import {postMethod} from "../../utils";
//
//
// export default () => {
//     const [name, setName] = useState('');
//     const [code, setCode] = useState('');
//
//     function decodeJWT(token: string) {
//         try {
//             const base64Payload = token.split('.')[1];
//             const payload = atob(base64Payload); // Giải mã base64
//             return JSON.parse(payload); // Chuyển thành object
//         } catch (e) {
//             console.error("Invalid token", e);
//             return null;
//         }
//     }
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!name || !code) return alert("Vui lòng nhập đầy đủ thông tin");
//
//         const token = localStorage.getItem('access');
//         if (!token) {
//             alert("Bạn chưa đăng nhập");
//             return;
//         }
//
//         const decoded = decodeJWT(token);
//
//         if (!decoded) {
//             alert("Token không hợp lệ");
//             return;
//         }
//
//         const userClean = {
//             id: decoded.id,
//             name: decoded.name,
//             role: decoded.role,
//             status: 'confirmed'
//         };
//
//         const payload = {
//             name,
//             code,
//             users: userClean
//         };
//
//         console.log("Dữ liệu gửi:", payload);
//         console.log("Token:", localStorage.getItem("accessToken"));
//
//
//         // Nếu dùng fetch
//         try {
//             const data = await postMethod("/master/class", payload)
//             console.log(data);
//         } catch (err) {
//             console.error("Lỗi tạo lớp:", err);
//         }
//     };
//
//     const handleCancel = () => {
//         setName('');
//         setCode('');
//     };
//     return (
//         <>
//             <FHeader hide={true} />
//             <Box sx={{ mx: 'auto', mt: '64px'}} p={3} bgcolor="#f9f9fb">
//                 <Typography variant="h4" fontWeight="bold">
//                     Thêm lớp học mới
//                 </Typography>
//                 <Box
//                     minHeight="100vh"
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                     bgcolor="#f7f8fa"
//                 >
//                     <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: 500 }}>
//                         <form onSubmit={handleSubmit}>
//                             <Typography variant="h6" fontWeight="bold" mb={2}>
//                                 Tên lớp học <span style={{ color: 'red' }}>*</span>
//                             </Typography>
//                             <TextField
//                                 fullWidth
//                                 placeholder="Nhập tên lớp học"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 sx={{ mb: 3 }}
//                             />
//
//                             <Typography variant="h6" fontWeight="bold" mb={2}>
//                                 Mã bảo vệ <span style={{ color: 'red' }}>*</span>
//                             </Typography>
//                             <TextField
//                                 fullWidth
//                                 placeholder="Nhập mã bảo vệ"
//                                 value={code}
//                                 onChange={(e) => setCode(e.target.value)}
//                                 sx={{ mb: 3 }}
//                             />
//
//                             <Box display="flex" justifyContent="flex-end" gap={2}>
//                                 <Button variant="outlined" onClick={handleCancel}>
//                                     Hủy
//                                 </Button>
//                                 <Button variant="contained" type="submit">
//                                     Tạo mới
//                                 </Button>
//                             </Box>
//                         </form>
//                     </Paper>
//                 </Box>
//             </Box>
//         </>
//     );
// };

import { FHeader } from "../../components";
import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Paper,
    Typography,
} from "@mui/material";
import axiosClient from '../../utils/api/axiosClient.ts';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    function decodeJWT(token: string) {
        try {
            const base64Payload = token.split('.')[1];
            const payload = atob(base64Payload); // Giải mã base64
            return JSON.parse(payload); // Chuyển thành object
        } catch (e) {
            console.error("Invalid token", e);
            return null;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !code) return alert("Vui lòng nhập đầy đủ thông tin");

        const token = Cookies.get('token'); // <-- Lấy token từ cookie

        if (!token) {
            alert("Bạn chưa đăng nhập");
            return;
        }

        const decoded = decodeJWT(token);

        if (!decoded) {
            alert("Token không hợp lệ");
            return;
        }

        // const userClean = {
        //     id: decoded.id,
        //     name: decoded.name,
        //     status: "confirmed",
        //     role: decoded.role
        // };

        const payload = {
            name,
            code,
            users: [decoded.id]
        };
        console.log(payload)

        try {
            const response = await axiosClient.post(`/master/class`, payload);
            console.log("Payload gửi đi:", payload);
            console.log("Tạo lớp thành công:", response.data);
            navigate("/classes");
        } catch (err: any) {
            console.error("Lỗi tạo lớp:", err);
            if (err.response) {
                console.error("Chi tiết lỗi:", err.response.data);
            }
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
};
