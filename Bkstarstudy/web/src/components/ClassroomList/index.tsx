import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
} from '@mui/material';
import { Link } from "react-router-dom"
import { ContentCopy, MeetingRoom } from '@mui/icons-material';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import axiosClient from '../../utils/api/axiosClient.ts';
import type {ClassI} from '../../utils'

interface ClassroomCardProps {
    classroom: ClassI;
    onEnterClass: (id: number) => void;
}

const ClassroomCard = ({ classroom, onEnterClass }: ClassroomCardProps) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(classroom.code);
    };

    return (
        <Card
            sx={{
                backgroundColor: '#29b6f6',
                color: 'white',
                borderRadius: '12px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }
            }}
        >
            <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Typography variant="h6" fontWeight="bold">{classroom.name}</Typography>
                    <Button
                        component={Link}
                        to={`/class/${classroom.id}/`}
                        variant="text"
                        startIcon={<MeetingRoom sx={{ color: 'white' }} />}
                        onClick={() => onEnterClass(classroom.id)}
                        sx={{ color: 'white' }}
                    >
                        Vào lớp
                    </Button>
                </Box>
                <Typography variant="h4" fontWeight="bold">{classroom.users.length}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Thành viên tham gia</Typography>
                    <Box sx={{display: "flex", alignItems: 'center', gap: "12px"}}>
                        <Typography>Mã lớp: {classroom.code}</Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            color="inherit"
                            startIcon={<ContentCopy />}
                            onClick={handleCopy}
                            sx={{ borderColor: 'white', color: 'white' }}
                        >
                            Chia sẻ
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};
export default function ClassroomList() {
    const [classrooms, setClassrooms] = useState<ClassI[]>([]);
    const navigate = useNavigate();

    const handleEnterClass = async (id: number) => {
        try {
            const response = await axiosClient.get(`/master/class/${id}`);
            const classroom = response.data;
            console.log('classroom', classroom)
            if (classroom) {
                navigate(`/class/${id}`, { state: classroom });
            }
        } catch (error) {
            console.error("Không thể lấy thông tin lớp học:", error);
        }
    };

    const onMounted = async () => {
        try {
            const response = await axiosClient.get('/master/class');
            const classesData = response.data;
            if (Array.isArray(classesData)) {
                setClassrooms(classesData);
            } else {
                console.error("Invalid data format from API:", classesData);
                setClassrooms([]);
            }
        } catch (error) {
            console.error("Không thể lấy danh sách lớp học:", error);
        }
    };

    useEffect(() => {
        onMounted();
    }, []);

    return (
        <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
                {classrooms.map((classroom) => (
                    <Grid key={classroom.id} size={{sm: 12, md: 6, lg: 4}}>
                        <ClassroomCard
                            classroom={classroom}
                            onEnterClass={handleEnterClass}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}