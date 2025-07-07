import {useEffect, useState} from "react"
// import {postMethod, getMethod} from "../../utils";
import {register} from '../../utils/api/authService.ts'
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    Link as MuiLink,
    Alert,
    CircularProgress,
} from "@mui/material"

interface RegisterFormData {
    name: string
    email: string
    password: string
    confirmPassword: string
    role: string
    status: string
}

interface ApiResponse {
    success: boolean
    message: string
    data?: any
}

const Register = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        status: ""
    })

    const [errors, setErrors] = useState<Partial<RegisterFormData>>({})
    const [loading, setLoading] = useState(false)
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)

    const handleInputChange = (field: keyof RegisterFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }))
        }
    }

    // getMethod('/master/user')
    // const a = await getMethod('/classrooms');

    const validateForm = (): boolean => {
        const newErrors: Partial<RegisterFormData> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Tên không được để trống"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email không được để trống"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ"
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống"
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu không khớp"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setApiResponse(null)

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "student",
            status: "confirmed"
        }

        try {
            const data = await register

            if (data) {
                setApiResponse({
                    success: true,
                    message: "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
                    data,
                })

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                    status: ""
                })
            } else {
                setApiResponse({
                    success: false,
                    message: "Đăng ký thất bại. Vui lòng thử lại."
                })
            }

        } catch (error) {
            console.error("Registration error:", error)
            setApiResponse({
                success: false,
                message: "Có lỗi xảy ra. Vui lòng kiểm tra kết nối mạng và thử lại.",
            })
        } finally {
            setLoading(false)
        }
    }

    // const onMounted = async () => {
    //     const c = await getMethod("/master/user");
    //     console.log(c);
    // };
    //
    // useEffect(() => {
    //     onMounted();
    // }, []);

    return (
        <Container
            maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500, width: "100%" }}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
                    <img
                        src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png"
                        alt="logo"
                        style={{ height: 30 }}
                    />
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
                    Đăng ký học viên
                </Typography>

                {apiResponse && (
                    <Alert severity={apiResponse.success ? "success" : "error"} sx={{ mb: 2 }}>
                        {apiResponse.message}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Tên của bạn"
                        placeholder="Nhập tên của bạn"
                        margin="normal"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleInputChange("name")}
                        error={!!errors.name}
                        helperText={errors.name}
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        label="Địa chỉ email"
                        placeholder="bangtran.hha@gmail.com"
                        margin="normal"
                        variant="outlined"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleInputChange("password")}
                        error={!!errors.password}
                        helperText={errors.password}
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        label="Nhập lại mật khẩu"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        value={formData.confirmPassword}
                        onChange={handleInputChange("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        disabled={loading}
                    />

                    <Box mt={3} display="flex" justifyContent="center" gap={2}>
                        <MuiLink href="/login" style={{ textDecoration: "none" }}>
                            <Button variant="outlined" color="primary" sx={{ px: 4 }} disabled={loading}>
                                Hủy
                            </Button>
                        </MuiLink>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ px: 4 }}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : null}
                        >
                            {loading ? "Đang đăng ký..." : "Đăng ký"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}

export default Register
