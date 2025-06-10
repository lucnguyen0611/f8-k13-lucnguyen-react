import {
    Box,
    Grid,
    Typography,
    Paper,
    Button,
    TextField
} from '@mui/material';
import { MainLayout } from "../../components";
import AssignmentIcon from "@mui/icons-material/Assignment";

const exams = [
    { title: "ĐỀ THI LẦN 1", date: "05/01/2024" },
    { title: "Thi thu lan 2", date: "26/01/2024" },
    { title: "Thu Thu Lan 3", date: "28/01/2024" },
    { title: "Thi Thu 4", date: "30/01/2024" },
    { title: "Thu Thu 5", date: "22/04/2024" },
];

export default function ClassOverview() {
    return (
        <>
           <MainLayout>
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
                       {exams.map((exam, index) => (
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
                                       <Typography fontWeight="bold">{exam.title}</Typography>
                                       <Typography fontSize={14} color="text.secondary">
                                           Ngày bắt đầu: {exam.date}
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
           </MainLayout>
        </>
    );
}
