import {
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TableContainer
} from "@mui/material";
import type {Member} from "../../utils";

interface MemberListProps {
    members: Member[];
}

export default function Members({members}: MemberListProps) {
    return (
        <>
            <Box bgcolor="#f8f9fc" minHeight="100vh" width="100%">
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Danh sách thành viên
                </Typography>

                <TableContainer
                    component={Paper}
                    sx={{ borderRadius: 2, overflow: "hidden", maxWidth: '100%' }}
                >
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f6fa" }}>
                                <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Họ tên</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Vị trí</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members.map((member, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ backgroundColor: index % 2 === 0 ? "#eef3f9" : "white" }}
                                >
                                    <TableCell>{member.id}</TableCell>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}