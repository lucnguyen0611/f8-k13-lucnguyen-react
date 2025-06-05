import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { ContentCopy, MeetingRoom } from '@mui/icons-material';
import Grid from '@mui/material/Grid';

const classrooms = [
  { name: 'Test Thi Thu', code: '123456', members: 1 },
  { name: 'lol', code: '123456', members: 1 },
  { name: 'A1', code: '123456', members: 1 },
  { name: 'A2', code: 'abcdef', members: 1 },
];

interface ClassroomCardProps {
    name: string;
    code: string;
    members: number;
}

const ClassroomCard = ({ name, code, members }: ClassroomCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card
        // sx={{ backgroundColor: '#29b6f6', color: 'white', borderRadius: 3, height: '100%' }}
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
            <Typography variant="h6" fontWeight="bold">{name}</Typography>
            <Button
              variant="text"
              startIcon={<MeetingRoom sx={{ color: 'white' }} />}
              sx={{ color: 'white' }}
            >
              Vào lớp
            </Button>
          </Box>
          <Typography variant="h4" fontWeight="bold">{members}</Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Thành viên tham gia</Typography>
              <Box sx={{display: "flex", alignItems: 'center', gap: "12px"}}>
                  <Typography>Mã lớp: {code}</Typography>
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
        {/* </Stack> */}
      </CardContent>
    </Card>
  );
};

export default function ClassroomList() {
  return (
    <Box sx={{ mt: 4 }}>
        <Grid container spacing={2} >
            {classrooms.map((cls, index) => (
                <Grid key={index} size={{sm: 12, md: 6, lg: 4}}>
                    <ClassroomCard {...cls} />
                </Grid>
            ))}
        </Grid>
    </Box>
  );
}