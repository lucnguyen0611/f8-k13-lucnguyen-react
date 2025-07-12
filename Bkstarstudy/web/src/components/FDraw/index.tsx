import {
    Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Typography, Box, useMediaQuery, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';

import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

interface FDrawerProps {
    hide?: boolean;
    isOpen: boolean;
    toggleDrawer: (open: boolean) => void;
}

const menuItems = [
    {
        label: 'Tổng quan',
        icon: <DashboardIcon />,
        subPath: '',
    },
    {
        label: 'Bài thi',
        icon: <EmojiEventsIcon />,
        subPath: 'exam',
    },
    {
        label: 'Thành viên',
        icon: <GroupIcon />,
        subPath: 'members',
    }
];

export default function FDrawer({ hide, isOpen, toggleDrawer }: FDrawerProps) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const { id: classId } = useParams();
    const location = useLocation();
    const basePath = `/class/${classId}`;
    const currentPath = location.pathname;

    const isActive = (subPath: string) => {
        const fullPath = subPath ? `${basePath}/${subPath}` : basePath;
        return currentPath === fullPath;
    };

    const goTo = (subPath = '') => {
        if (!isDesktop) toggleDrawer(false);
        navigate(subPath ? `${basePath}/${subPath}` : basePath, { state: location.state });
    };

    return (
        <Drawer
            variant={hide ? 'temporary' : isDesktop ? 'permanent' : 'temporary'}
            open={isOpen}
            onClose={() => toggleDrawer(false)}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' }
            }}
        >
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* ---- HEADER ---- */}
                <Box sx={{ px: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                        <Typography variant="h6" fontWeight="bold" color="#0d47a1">
                            BK<span style={{ color: '#fb8c00' }}>Star</span>
                        </Typography>
                        <IconButton onClick={() => toggleDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* ---- MENU ---- */}
                    <List>
                        {menuItems.map(({ label, icon, subPath }) => {
                            const active = isActive(subPath);
                            return (
                                <ListItemButton
                                    key={subPath}
                                    selected={active}
                                    onClick={() => goTo(subPath)}
                                >
                                    <ListItemIcon sx={{ color: active ? '#00bfff' : 'inherit' }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={label}
                                        primaryTypographyProps={{
                                            fontWeight: active ? 'bold' : 'normal',
                                            color: active ? '#00bfff' : 'inherit'
                                        }}
                                    />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Box>

                {/* ---- FOOTER ---- */}
                <Box textAlign="center" pb={2}>
                    <Typography variant="body2" color="text.secondary">©2024 BKStar</Typography>
                    <Typography variant="body2" color="text.secondary">Version 1.3.1</Typography>
                </Box>
            </Box>
        </Drawer>
    );
}
