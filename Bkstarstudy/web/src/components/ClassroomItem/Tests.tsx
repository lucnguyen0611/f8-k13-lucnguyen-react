import {
    Box,
    Grid,
    Typography,
    Paper,
    Button,
    TextField
} from '@mui/material';
import AssignmentIcon from "@mui/icons-material/Assignment";
import type {Test} from "../../utils";

interface TestListProps {
    tests: Test[];
}

export default function Tests({tests}: TestListProps) {
    return (
        <>
            <Box  minHeight="100vh">
                {/* Header */}
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
                        <Button variant="contained" color="primary">
                            + Tạo bài thi
                        </Button>
                    </Box>
                </Box>

                {/* Đang diễn ra */}
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Bài thi đang diễn ra
                </Typography>

                <Grid container spacing={2} mb={4}>
                    {tests.map((test: any, index: number) => (
                        <Grid key={index} size={{xs: 12,sm: 6, md: 4, lg: 3}}>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    borderLeft: "4px solid #03a9f4",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 2,
                                    height: "100%",
                                    borderRadius: 2
                                }}
                            >
                                <AssignmentIcon fontSize="large" color="info" />
                                <Box>
                                    <Typography fontWeight="bold">{test.name}</Typography>
                                    <Typography fontSize={14} color="text.secondary">
                                        Ngày bắt đầu: {test.date}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Chưa bắt đầu */}
                <Typography variant="subtitle1" fontWeight="bold">
                    Bài thi chưa bắt đầu
                </Typography>
                {/* Có thể thêm danh sách bài chưa bắt đầu ở đây nếu có */}
            </Box>
        </>
    );
}
