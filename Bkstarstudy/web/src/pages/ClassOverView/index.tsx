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
    TableBody,
    Drawer,
    ListItemIcon
} from '@mui/material';
import React from 'react';
import { FHeader } from "../../components";


import {
    People as PeopleIcon,
    Assignment as AssignmentIcon,
    Dashboard as DashboardIcon,
    Person as PersonIcon,
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
            <FHeader />
            <Box display="flex">
                {/* Sidebar */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: 220,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box' },
                    }}
                >
                    <Box p={2}>
                        {/*<Typography fontWeight="bold" mb={2}>BKStar</Typography>*/}
                        <List>
                            <ListItem button>
                                <ListItemIcon><DashboardIcon /></ListItemIcon>
                                <ListItemText primary="Tổng quan" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                                <ListItemText primary="Bài thi" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><PersonIcon /></ListItemIcon>
                                <ListItemText primary="Thành viên" />
                            </ListItem>
                        </List>
                    </Box>
                    <Box position="absolute" bottom={20} px={2}>
                        <Typography variant="caption">©2024 BKStar</Typography><br />
                        <Typography variant="caption">Version 1.3.1</Typography>
                    </Box>
                </Drawer>

                {/* Main content */}
                <Box flex={1} p={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, backgroundColor: "#2196f3", color: "white" }}>
                                <Typography variant="h6">Test Thi Thu</Typography>
                                <Typography>Giáo viên: Trần Xuân Bằng</Typography>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={<CopyIcon />}
                                    sx={{ mt: 1 }}
                                >
                                    SAO CHÉP LIÊN KẾT
                                </Button>
                            </Paper>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: "center" }}>
                                <PeopleIcon fontSize="large" />
                                <Typography variant="h6">3 Thành Viên</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: "center" }}>
                                <AssignmentIcon fontSize="large" />
                                <Typography variant="h6">5 Bài Kiểm Tra</Typography>
                            </Paper>
                        </Grid>

                        {/* Member list */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Danh sách thành viên
                            </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>NO.</TableCell>
                                        <TableCell>HỌ TÊN</TableCell>
                                        <TableCell>VỊ TRÍ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {members.map((m, index) => (
                                        <TableRow key={m.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{m.name}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={m.role}
                                                    color={m.role === "Giáo viên" ? "error" : "success"}
                                                    size="small"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Box>

                {/* Right sidebar - Activity log */}
                <Box width={300} p={2} bgcolor="#fafafa">
                    <Typography variant="h6" gutterBottom>Hoạt động gần đây</Typography>
                    <List>
                        {activities.map((a, i) => (
                            <React.Fragment key={i}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>{a.avatar}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={a.title}
                                        secondary={a.time}
                                    />
                                </ListItem>
                                {i < activities.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Box>
        </>
    );
}
