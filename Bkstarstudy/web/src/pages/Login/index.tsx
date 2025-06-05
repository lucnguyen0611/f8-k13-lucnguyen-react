import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, IconButton, InputAdornment, Link as MuiLink } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';


export default function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Grid container sx={{ minHeight: '100vh' }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ backgroundColor: '#1976d2', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 4 }}>
                <Box display="flex" alignItems="center" gap={1}>
                    <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" style={{ height: 30 }} />
                    <Box>
                        <Typography variant="h6" fontWeight="bold" color="#0d47a1">
                            BK<span style={{ color: "#fb8c00" }}>Star</span>
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="h6" fontWeight="bold">GIEO MẦM SÁNG TẠO...</Typography>
                <Typography variant="h6" fontWeight="bold">... DẪN HƯỚNG ĐAM MÊ</Typography>
            </Grid>

            {/* Bên phải: Form đăng nhập */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: 4 }}>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                        <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" style={{ height: 30 }} />
                        <Box>
                            <Typography variant="h6" fontWeight="bold" color="#0d47a1">
                                BK<span style={{ color: "#fb8c00" }}>Star</span>
                            </Typography>
                        </Box>
                    </Box>

                    <Typography variant="h6" textAlign="center" gutterBottom>Đăng Nhập</Typography>
                    <Typography variant="body2" textAlign="center" mb={3} color="textSecondary">
                        Cung cấp giải pháp toàn diện cho lớp học thông minh
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
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
                    <Button variant="contained" fullWidth sx={{ mt: 2 }}>Đăng nhập</Button>

                    <Typography variant="body2" align="center" mt={2}>
                        <MuiLink
                            href="/register"
                            sx={{ textDecoration: 'none', color: '#1976d2' }}
                        >
                            Đăng kí
                        </MuiLink>{' '}
                        tài khoản cho học viên
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
