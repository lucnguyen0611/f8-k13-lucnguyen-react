import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    useMediaQuery
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface FDrawerProps {
    hide?: boolean
    isOpen: boolean;
    toggleDrawer: (open: boolean)  => void;
}

export default function FDrawer( {hide, isOpen, toggleDrawer}: FDrawerProps) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const goTo = (path: string) => {
        if (!isDesktop ) toggleDrawer(false); // chỉ đóng drawer nếu không phải desktop
        navigate(path);
    };

    return (
        <Drawer
            variant={
                hide === true
                    ? "temporary"
                    : isDesktop
                        ? "permanent"
                        : "temporary"
            }
            open={isOpen}
            onClose={() => toggleDrawer(false)}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: "100%",
                    boxSizing: 'border-box',
                    ...(isDesktop && {
                        width: 240, // full-screen trên tablet/mobile
                    }),
                }
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ px: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
                        <Typography variant="h6" fontWeight="bold" color="#0d47a1">
                            BK<span style={{ color: "#fb8c00" }}>Star</span>
                        </Typography>
                        <IconButton onClick={() => toggleDrawer(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <List>
                        <ListItemButton onClick={() => goTo("/classes")}>
                            <ListItemIcon>
                                <DashboardIcon sx={{ color: "#00bfff" }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Tổng quan"
                                primaryTypographyProps={{ fontWeight: "bold", color: "#00bfff" }}
                            />
                        </ListItemButton>

                        <ListItemButton onClick={() => goTo("/test")}>
                            <ListItemIcon>
                                <EmojiEventsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Bài thi" />
                        </ListItemButton>

                        <ListItemButton onClick={() => goTo("/members")}>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Thành viên" />
                        </ListItemButton>
                    </List>
                </Box>

                <Box textAlign="center" pb={2}>
                    <Typography variant="body2" color="text.secondary">
                        ©2024 All rights reserved
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        BKStar
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Version 1.3.1
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
}