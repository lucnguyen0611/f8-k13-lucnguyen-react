import { useState, useContext } from "react";
import {
    Box, Button, Checkbox, FormControlLabel, TextField, Typography,
    IconButton, InputAdornment, Link as MuiLink, Alert, CircularProgress, Grid
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { signIn } from "../../utils/api/authService.ts";
import Cookies from 'js-cookie';
import axios from 'axios';
import { StoreContext } from '../../context/StoreProvider.tsx';

// ✅ Hàm decode token JWT để lấy userId
function decodeJWT(token?: string) {
    if (!token) return undefined;
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload) as { id?: string };
    } catch (err) {
        console.error('Invalid token', err);
        return undefined;
    }
}

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserId } = useContext(StoreContext); // ✅ lấy từ context

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await signIn({
                email: email.trim(),
                password: password.trim()
            });

            const { token, refreshToken } = res || {};

            if (token && refreshToken) {
                // ✅ Lưu token
                Cookies.set('token', token);
                Cookies.set('refreshToken', refreshToken);

                // ✅ Gọi setUserId để kích hoạt useEffect trong StoreProvider
                const decoded = decodeJWT(token);
                if (decoded?.id) {
                    setUserId(decoded.id);
                }

                navigate('/classes');
            } else {
                setError('Email hoặc mật khẩu không đúng.');
            }
        } catch (e) {
            let message = 'Lỗi khi đăng nhập.';
            if (axios.isAxiosError(e)) {
                message = e.response?.data?.message || message;
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}
        >
            <Grid container sx={{
                width: 900, height: 620, borderRadius: '16px',
                overflow: 'hidden', boxShadow: 3, margin: '0 40px',
            }}>
                {/* Left Section */}
                <Grid
                    size={{ xs: 0, md: 6 }}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 4,
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" style={{ height: 30 }} />
                        <Typography variant="h6" fontWeight="bold" color="#0d47a1">
                            BK<span style={{ color: '#fb8c00' }}>Star</span>
                        </Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="bold">GIEO MẦM SÁNG TẠO...</Typography>
                    <Typography variant="h6" fontWeight="bold">... DẪN HƯỚNG ĐAM MÊ</Typography>
                </Grid>

                {/* Right Section (Form) */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 4,
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: 400 }}>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                            <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" style={{ height: 30 }} />
                            <Typography variant="h6" fontWeight="bold" color="#0d47a1">
                                BK<span style={{ color: '#fb8c00' }}>Star</span>
                            </Typography>
                        </Box>

                        <Typography variant="h6" textAlign="center" gutterBottom>Đăng Nhập</Typography>
                        <Typography variant="body2" textAlign="center" mb={3} color="textSecondary">
                            Cung cấp giải pháp toàn diện cho lớp học thông minh
                        </Typography>

                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                        {/* ✅ Form bắt đầu từ đây */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}>
                            <TextField
                                fullWidth label="Email" type="email" margin="normal"
                                autoComplete="email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                fullWidth label="Mật khẩu" margin="normal"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <FormControlLabel control={<Checkbox />} label="Ghi nhớ tôi" />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Đăng nhập'}
                            </Button>
                        </form>
                        {/* ✅ Form kết thúc ở đây */}

                        <Typography variant="body2" align="center" mt={2}>
                            <MuiLink href="/register" sx={{ textDecoration: 'none', color: '#1976d2' }}>
                                Đăng kí
                            </MuiLink>{' '}
                            tài khoản cho học viên
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}
