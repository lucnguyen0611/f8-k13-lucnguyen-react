import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import GroupIcon from "@mui/icons-material/Group"

export default function Sidebar() {
    return (
        <Box
            sx={{
                width: 240,
                height: '100vh',
                bgcolor: 'white',
                borderRight: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                py: 3
            }}
        >
            {/* Menu Items */}
            <List>
                <ListItemButton selected>
                    <ListItemIcon>
                        <DashboardIcon sx={{ color: '#00bfff' }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Tổng quan"
                        primaryTypographyProps={{ fontWeight: 'bold', color: '#00bfff' }}
                    />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <EmojiEventsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bài thi" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Thành viên" />
                </ListItemButton>
            </List>

            {/* Footer */}
            <Box textAlign="center" pb={2}>
                <Typography variant="body2" color="text.secondary">
                    ©2024 Allrights reserved
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    BKStar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Version 1.3.1
                </Typography>
            </Box>
        </Box>
    )
}
