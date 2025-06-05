import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Link as MuiLink,
} from "@mui/material";

const Register = () => {
    return (
        <Container maxWidth="sm" sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500 }}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" style={{ height: 30 }} />
                    <Box>
                        <Typography variant="h6" fontWeight="bold" color="#0d47a1">
                            BK<span style={{ color: "#fb8c00" }}>Star</span>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Classroom
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="h5" align="center" gutterBottom>
                    Đăng kí học viên
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Tên của bạn"
                        placeholder="Nhập tên của bạn"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Địa chỉ email"
                        placeholder="bangtran.hha@gmail.com"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        type="password"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Nhập lại mật khẩu"
                        type="password"
                        margin="normal"
                        variant="outlined"
                    />
                    <Box mt={3} display="flex" justifyContent="center" gap={4}>
                        {/*<Button variant="outlined" color="primary" sx={{ px: 4 }}>*/}
                        {/*    Hủy*/}
                        {/*</Button>*/}
                        {/*<MuiLink href="/login" variant="body2" sx={{textDecoration: 'none'}}>*/}
                        {/*    Hủy*/}
                        {/*</MuiLink>*/}
                        <MuiLink href="/login">
                            <Button variant="outlined" color="primary" sx={{ px: 4 }}>
                                Hủy
                            </Button>
                        </MuiLink>
                        <Button variant="contained" color="primary">
                            Đăng ký
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;
