// import {
//     Box,
//     Grid,
//     Typography,
//     Paper,
//     Button,
//     TextField
// } from '@mui/material';
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import type {Test} from "../../utils";
//
// interface TestListProps {
//     tests: Test[];
// }
//
// export default function Tests({tests}: TestListProps) {
//     return (
//         <>
//             <Box  minHeight="100vh">
//                 {/* Header */}
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//                     <Typography variant="h5" fontWeight="bold">
//                         Danh sách Bài thi
//                     </Typography>
//
//                     <Box display="flex" gap={2}>
//                         <TextField
//                             size="small"
//                             placeholder="Tìm kiếm"
//                             variant="outlined"
//                             sx={{ bgcolor: "white" }}
//                         />
//                         <Button variant="contained" color="primary">
//                             + Tạo bài thi
//                         </Button>
//                     </Box>
//                 </Box>
//
//                 {/* Đang diễn ra */}
//                 <Typography variant="subtitle1" fontWeight="bold" mb={2}>
//                     Bài thi đang diễn ra
//                 </Typography>
//
//                 <Grid container spacing={2} mb={4}>
//                     {tests.map((test: any, index: number) => (
//                         <Grid key={index} size={{xs: 12,sm: 6, md: 4, lg: 3}}>
//                             <Paper
//                                 elevation={1}
//                                 sx={{
//                                     p: 2,
//                                     borderLeft: "4px solid #03a9f4",
//                                     display: "flex",
//                                     alignItems: "flex-start",
//                                     gap: 2,
//                                     height: "100%",
//                                     borderRadius: 2
//                                 }}
//                             >
//                                 <AssignmentIcon fontSize="large" color="info" />
//                                 <Box>
//                                     <Typography fontWeight="bold">{test.name}</Typography>
//                                     <Typography fontSize={14} color="text.secondary">
//                                         Ngày bắt đầu: {test.date}
//                                     </Typography>
//                                 </Box>
//                             </Paper>
//                         </Grid>
//                     ))}
//                 </Grid>
//
//                 {/* Chưa bắt đầu */}
//                 <Typography variant="subtitle1" fontWeight="bold">
//                     Bài thi chưa bắt đầu
//                 </Typography>
//                 {/* Có thể thêm danh sách bài chưa bắt đầu ở đây nếu có */}
//             </Box>
//         </>
//     );
// }


import {
    Box,
    Grid,
    Typography,
    Paper,
    Button,
    TextField
} from '@mui/material';
import AssignmentIcon from "@mui/icons-material/Assignment";
import type { Test } from "../../utils";

interface TestListProps {
    tests: Test[];
}

function isOngoing(test: Test) {
    const now = new Date().getTime();
    const start = new Date(test.start_time).getTime();
    const end = start + test.await_time * 1000;
    return now >= start && now <= end;
}

export default function Tests({ tests }: TestListProps) {
    const ongoingTests = tests.filter(isOngoing);
    const upcomingTests = tests.filter(test => !isOngoing(test) && new Date(test.start_time).getTime() > Date.now());

    return (
        <Box minHeight="100vh">
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

            {/* Bài thi đang diễn ra */}
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Bài thi đang diễn ra
            </Typography>

            <Grid container spacing={2} mb={4}>
                {ongoingTests.length > 0 ? (
                    ongoingTests.map((test, index) => (
                        <Grid size={{xs: 12,sm: 6, md: 4, lg: 3}} key={index}>
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
                                        Ngày bắt đầu: {new Date(test.start_time).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography ml={2} color="text.secondary">Không có bài thi đang diễn ra.</Typography>
                )}
            </Grid>

            {/* Bài thi chưa bắt đầu */}
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Bài thi chưa bắt đầu
            </Typography>

            <Grid container spacing={2}>
                {upcomingTests.length > 0 ? (
                    upcomingTests.map((test, index) => (
                        <Grid size={{xs: 12,sm: 6, md: 4, lg: 3}} key={index}>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    borderLeft: "4px solid #ffc107",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 2,
                                    height: "100%",
                                    borderRadius: 2
                                }}
                            >
                                <AssignmentIcon fontSize="large" sx={{ color: "#ff9800" }} />
                                <Box>
                                    <Typography fontWeight="bold">{test.name}</Typography>
                                    <Typography fontSize={14} color="text.secondary">
                                        Ngày bắt đầu: {new Date(test.start_time).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Typography ml={2} color="text.secondary">Không có bài thi sắp tới.</Typography>
                )}
            </Grid>
        </Box>
    );
}

