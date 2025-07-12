import {
    Box,
    Grid,
    Typography,
    Paper,
    Button,
    Chip,
    Avatar,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import {
    People as PeopleIcon,
    Assignment as AssignmentIcon,
    ContentCopy as CopyIcon
} from '@mui/icons-material';
// import React from 'react';
import type {ExamGroupI, ClassI, UserClassI} from '../../utils'

interface OverviewProps {
    classroom: ClassI;
    examGroup: ExamGroupI[]
}

export default function Overview({ classroom, examGroup }: OverviewProps) {
    const teacher = classroom.users.find(user => user.role === "teacher");
    const teacherName = teacher ? teacher.name : "Chưa có giáo viên";

    // const handleCopyCode = () => {
    //     navigator.clipboard.writeText(classroom.code);
    // };

    console.log('test', examGroup)

    return (
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
                            <Typography variant="h6" fontWeight="bold">{classroom.name}</Typography>
                            <Typography>Giáo viên: {teacherName}</Typography>
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
                                    <Typography variant="h6" fontWeight="bold">{classroom.users.length} Thành Viên</Typography>
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
                                    <Typography variant="h6" fontWeight="bold">
                                        {
                                            examGroup.filter((test: ExamGroupI) => {
                                                const start = new Date(test.start_time).getTime();
                                                const end = start + test.await_time * 1000;
                                                return Date.now() <= end; // chỉ lấy bài thi chưa kết thúc
                                            }).length
                                        } Bài Kiểm Tra
                                    </Typography>
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
                                    {classroom.users.map((m: UserClassI, index: number) => (
                                        <TableRow key={index} sx={{ bgcolor: "#f7fbff" }}>
                                            <TableCell>{m.id}</TableCell>
                                            <TableCell>{m.name}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={m.role}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: m.role === "teacher" ? "#ffcdd2" : "#c8e6c9",
                                                        color: "#000",
                                                        fontWeight: "bold",
                                                        mr: 1,
                                                    }}
                                                />
                                                {m.role === "teacher" && <span style={{ fontSize: 16 }}>🔑</span>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    <Grid size={{xs: 12, sm: 12, md: 12, lg: 12, xl: 4}}>
                        <Box p={3} bgcolor="#fafafa" border="1px solid #e0e0e0" sx={{ borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                Hoạt động gần đây
                            </Typography>
                            {/*<List>*/}
                            {/*    {examGroup.map((a: Test, i: number) => (*/}
                            {/*        <React.Fragment key={i}>*/}
                            {/*            <ListItem alignItems="flex-start">*/}
                            {/*                <ListItemAvatar>*/}
                            {/*                    <Avatar sx={{ bgcolor: "#2196f3" }}>{a.avatar}</Avatar>*/}
                            {/*                </ListItemAvatar>*/}
                            {/*                <ListItemText primary={a.name} secondary={a.date} />*/}
                            {/*            </ListItem>*/}
                            {/*            {i < examGroup.length - 1 && <Divider />}*/}
                            {/*        </React.Fragment>*/}
                            {/*    ))}*/}
                            {/*</List>*/}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
    );
}
