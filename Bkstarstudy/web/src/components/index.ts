export { default as FHeader } from './Header'
// import ClassroomList from './ClassroomList/index';
export { default as ClassroomList } from './ClassroomList/index';

// import {
//     Box,
//     Button,
//     Card,
//     Typography,
// } from '@mui/material';
// // import { ContentCopy, MeetingRoom } from '@mui/icons-material';
// import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// import ShareIcon from '@mui/icons-material/Share';
// import Grid from '@mui/material/Grid';
//
// const classrooms = [
//     { name: 'Test Thi Thu', code: '123456', members: 1 },
//     { name: 'lol', code: '123456', members: 1 },
//     { name: 'A1', code: '123456', members: 1 },
//     { name: 'A2', code: 'abcdef', members: 1 },
// ];
//
// interface ClassroomCardProps {
//     name: string;
//     code: string;
//     members: number;
// }
//
// const ClassroomCard = ({ name, code, members }: ClassroomCardProps) => {
//     // const handleCopy = () => {
//     //   navigator.clipboard.writeText(code);
//     // };
//
//     return (
//         <Card
//             sx={{
//         backgroundColor: '#29b6f6',
//             color: 'white',
//             borderRadius: '12px',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             cursor: 'pointer',
//             transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
//             '&:hover': {
//             transform: 'translateY(-4px)',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//         }
//     }}
// >
//     <Box sx={{p: 2, display: 'flex', flexDirection: 'column', flexGrow: 1}}>
//     {/* Class name & Enter button */}
//     <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1}}>
//
//     <Typography
//         variant="h6"
//     component="div"
//     sx={{
//         fontWeight: 'bold',
//             flexGrow: 1,
//             mr: 1,
//
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             display: '-webkit-box',
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: 'vertical',
//     }}
// >
//     {name}
//     </Typography>
//
//     <Button
//     size="small"
//     startIcon={<MeetingRoomIcon/>}
//     sx={{
//         color: 'white',
//             textTransform: 'none',
//             whiteSpace: 'nowrap',
//             p: '2px 8px',
//             minWidth: 'auto',
//             '&:hover': {
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         }
//     }}
// >
//     Vào lớp
//     </Button>
//
//     </Box>
//
//     {/* Members count */}
//     <Box sx={{
//         my: 'auto',
//             flexGrow: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center'
//     }}>
//
//     <Typography
//         variant="h2"
//     component="div"
//     sx={{fontWeight: 'bold', lineHeight: 1}}
// >
//     {members}
//     </Typography>
//     </Box>
//
//     {/* Class code & Share button */}
//     <Box
//         sx={{
//         display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mt: 1
//     }}
// >
//     <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1, mr: 1}}>
//     <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.8)'}}>
//     Thành viên tham gia
//     </Typography>
//     <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.9)'}}>
//     Mã lớp: {code}
//     </Typography>
//     </Box>
//
//
//     <Button
//     variant="outlined"
//     size="small"
//     startIcon={<ShareIcon fontSize="inherit"/>}
//     sx={{
//         color: 'white',
//             borderColor: 'rgba(255, 255, 255, 0.5)',
//             textTransform: 'none',
//             borderRadius: '16px',
//             p: '2px 10px',
//             '&:hover': {
//             borderColor: 'white',
//                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
//         },
//     }}
// >
//     Chia sẻ
//     </Button>
//     </Box>
//     </Box>
//
//     </Card>
// );
// };
//
// export default function ClassroomList() {
//     return (
//         <Box sx={{ mt: 4 }}>
//     <Grid container spacing={2}  width={'100%'}>
//         {classrooms.map((cls, index) => (
//                 // <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//                 <Grid key={index} size={{sm: 12, md: 6, lg: 4}}>
//     <ClassroomCard {...cls} />
//     </Grid>
// ))}
//     </Grid>
//     </Box>
// );
// // }