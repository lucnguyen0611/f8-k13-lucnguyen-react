import {
    Box,
    Grid,
    Typography,
    Paper,
    Button,
    Chip,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import React from 'react';
import { MainLayout } from "../../components";
import {
    People as PeopleIcon,
    Assignment as AssignmentIcon,
    ContentCopy as CopyIcon
} from '@mui/icons-material';

const members = [
    { id: 1, name: "Trần Xuân Bằng", role: "Giáo viên" },
    { id: 2, name: "Phạm Thùy Dương", role: "Học sinh" },
    { id: 3, name: "bang", role: "Học sinh" },
];

const activities = [
    { title: "Bài thi Thu Thi 5", time: "22-04-2024 06:24:49", avatar: "B" },
    { title: "Bài thi Thu Thi 4", time: "30-01-2024 09:04:04", avatar: "P" },
    { title: "Bài thi Thu Thu Lan 3", time: "28-01-2024 10:21:55", avatar: "T" },
    { title: "Bài thi Thi thu lan 2", time: "26-01-2024 10:59:23", avatar: "T" },
    { title: "Bài thi ĐỀ THI LẦN 1", time: "23-01-2024 04:40:21", avatar: "D" },
];

export default function ClassOverview() {
    return (
        <>
            <MainLayout>
                <Box flex={1} >
                    <Grid container spacing={3}>
                        <Grid size={{xs: 12, sm: 12, md: 12, lg: 12, xl: 8}}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    background: "linear-gradient(to right, #00c6ff, #0072ff)",
                                    color: "white",
                                    borderRadius: 3,
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold">A2</Typography>
                                <Typography>Giáo viên: Trần Xuân Bằng</Typography>
                                <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography fontSize={14}>Chia sẻ lớp học</Typography>
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            size="small"
                                            startIcon={<CopyIcon />}
                                            sx={{
                                                borderColor: "white",
                                                color: "white",
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                                }
                                            }}
                                        >
                                            Sao chép liên kết
                                        </Button>
                                    </Box>
                                    <Avatar>TB</Avatar>
                                </Box>
                            </Paper>
                            <Grid container spacing={3} sx={{ py: 4 }}>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <Paper
                                        sx={{
                                            p: 3,
                                            textAlign: "center",
                                            borderRadius: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <PeopleIcon sx={{ fontSize: 40, color: "#03a9f4" }} />
                                        <Typography variant="h6" fontWeight="bold">1 Thành Viên</Typography>
                                    </Paper>
                                </Grid>

                                {/* Cột 2 */}
                                <Grid size={{xs: 12, sm: 6}}>
                                    <Paper
                                        sx={{
                                            p: 3,
                                            textAlign: "center",
                                            borderRadius: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 1,
                                        }}
                                    >
                                        <AssignmentIcon sx={{ fontSize: 40, color: "#03a9f4" }} />
                                        <Typography variant="h6" fontWeight="bold">0 Bài Kiểm Tra</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant="h6" color="#1976d2" fontWeight="bold" gutterBottom>
                                    Danh sách thành viên
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: "#f0f4f8" }}>
                                            <TableCell><strong>NO.</strong></TableCell>
                                            <TableCell><strong>HỌ TÊN</strong></TableCell>
                                            <TableCell><strong>VỊ TRÍ</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {members.map((m, index) => (
                                            <TableRow key={m.id} sx={{ bgcolor: "#f7fbff" }}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{m.name}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={m.role}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: m.role === "Giáo viên" ? "#ffcdd2" : "#c8e6c9",
                                                            color: "#000",
                                                            fontWeight: "bold",
                                                            mr: 1,
                                                        }}
                                                    />
                                                    {m.role === "Giáo viên" && <span style={{ fontSize: 16 }}>🔑</span>}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        <Grid size={{xs: 0, sm: 0, md: 0, lg: 0, xl: 4}}>
                            <Box p={3} bgcolor="#fafafa" border="1px solid #e0e0e0" sx={{ borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Hoạt động gần đây
                                </Typography>
                                <List>
                                    {activities.map((a, i) => (
                                        <React.Fragment key={i}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: "#2196f3" }}>{a.avatar}</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={a.title} secondary={a.time} />
                                            </ListItem>
                                            {i < activities.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </MainLayout>
        </>
    );
}
