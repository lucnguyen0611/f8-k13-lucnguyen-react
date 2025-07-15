// // import { useParams } from 'react-router-dom';
// import {
//     Box,
//     Grid,
//     Typography,
//     Paper,
//     Button,
//     IconButton,
//     Avatar
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { useParams } from 'react-router-dom';
// import type { ExamGroupI } from '../../utils';
// import { useEffect, useState } from 'react';
// import axiosClient from '../../utils/api/axiosClient.ts';
//
// const ExamDetail = () => {
//
//     const { id } = useParams();
//     const [exam, setExam] = useState<ExamGroupI>(null);
//     console.log('examid', id);
//
//     useEffect(() => {
//         axiosClient.get(`/exam_group/${id}`)
//             .then((res) => {
//                 setExam(res.data);
//             })
//             .catch((err) => {
//                 console.error("Không thể lấy thông tin bài thi:", err);
//             });
//     }, [id]); // ✅ chỉ gọi lại khi id thay đổi
//
//
//     return (
//         <Box p={2}>
//             <Typography variant="h6" mb={2}>Danh sách bài thi {'>'} Chi tiết bài thi</Typography>
//
//             <Paper variant="outlined" sx={{ p: 2, border: '1px solid #00bcd4' }}>
//                 <Typography><strong>Tên bài thi:</strong> {exam.name}</Typography>
//                 <Typography><strong>Ngày bắt đầu:</strong> {exam.start_time}</Typography>
//                 <Typography><strong>Thời gian chờ giữa các đề bài:</strong> {exam.await_time} phút</Typography>
//                 <Box mt={2} display="flex" gap={1}>
//                     <Button variant="contained" color="success">Chỉnh sửa</Button>
//                     <Button variant="outlined" color="error">Xóa bỏ</Button>
//                 </Box>
//             </Paper>
//
//             <Box mt={4}>
//                 <Typography variant="subtitle1" fontWeight="bold">Danh sách đề bài</Typography>
//                 <Button variant="contained" sx={{ mt: 2 }}>+ Thêm đề bài</Button>
//
//                 {/*{examDetail.examQuestions.map((exam) => (*/}
//                 {/*    <Paper key={exam.id} sx={{ mt: 1, p: 2, border: '1px dashed #00bcd4' }}>*/}
//                 {/*        <Box display="flex" justifyContent="space-between">*/}
//                 {/*            <Typography><strong>Đề bài:</strong> {exam.name}</Typography>*/}
//                 {/*            <IconButton><EditIcon fontSize="small" /></IconButton>*/}
//                 {/*        </Box>*/}
//                 {/*        <Typography>Mã đề: {exam.id}</Typography>*/}
//                 {/*        <Typography>Thời gian làm bài: {exam.duration} phút</Typography>*/}
//                 {/*        <Typography>Số câu hỏi: {exam.questionCount}</Typography>*/}
//                 {/*    </Paper>*/}
//                 {/*))}*/}
//             </Box>
//         </Box>
//     );
// };
//
// export default ExamDetail;
//

import {
    Box,
    Typography,
    Paper,
    Button,
    Grid
} from '@mui/material';
import { useParams } from 'react-router-dom';
import type { ExamGroupI } from '../../utils';
import { useEffect, useState } from 'react';
import axiosClient from '../../utils/api/axiosClient.ts';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ExamDetail = () => {
    const { id } = useParams();
    const [exam, setExam] = useState<ExamGroupI | null>(null);
    const navigate = useNavigate();
    const pa = useParams()
    console.log('params', pa)

    useEffect(() => {
        axiosClient.get(`/exam_group/${id}`)
            .then((res) => {
                setExam(res.data);
            })
            .catch((err) => {
                console.error("Không thể lấy thông tin bài thi:", err);
            });
    }, [id]); // ✅ sửa lại ở đây

    if (!exam) return <Typography>Đang tải...</Typography>;

    const handleAdd = () => {
        navigate('0')
    }

    return (
        <Box p={2}>
            <Typography variant="h6" mb={2} fontWeight="bold">
                Danh sách bài thi {'>'} Chi tiết bài thi
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    border: '1px solid #00bcd4',
                    borderRadius: 2,
                    p: 3,
                    mb: 4
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 8}}>
                        <Typography mb={1}>
                            <strong>Tên bài thi:</strong> {exam.name}
                        </Typography>
                        <Typography mb={1}>
                            <strong>Ngày bắt đầu:</strong> {exam.start_time}
                        </Typography>
                        <Typography>
                            <strong>Thời gian chờ giữa các đề bài:</strong> {exam.await_time} phút
                        </Typography>
                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 4}}
                        display="flex"
                        justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
                        gap={1}
                        mt={{ xs: 2, md: 0 }}
                    >
                        <Button variant="contained" color="success">
                            Chỉnh sửa
                        </Button>
                        <Button variant="outlined" color="error">
                            Xóa bỏ
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container justifyContent="space-between" alignItems="center" mb={2}>
                <Grid>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Danh sách đề bài
                    </Typography>
                </Grid>
                <Grid >
                    <Button variant="contained" color="primary" onClick={handleAdd}>
                        + Thêm đề bài
                    </Button>
                </Grid>
            </Grid>

            {/* TODO: Hiển thị danh sách đề bài tại đây */}
            {/* <Grid container spacing={2}>
                {examQuestions.map(q => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={q.id}>
                        <Paper sx={{ p: 2, border: '1px dashed #00bcd4' }}>
                            ...
                        </Paper>
                    </Grid>
                ))}
            </Grid> */}
            <Outlet/>
        </Box>

    );
};

export default ExamDetail;
