import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import {FDraw} from '../index.ts'

interface HeaderProps {
    hide?: boolean;
}

export default function Header({hide}: HeaderProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => {
      setDrawerOpen(open);
  };

  return (
      <>
          <AppBar
              position="fixed"
              color="inherit"
              elevation={0}
              sx={{
                  zIndex: (theme) => isTablet ? theme.zIndex.drawer - 1 : theme.zIndex.drawer + 1,
              }}
          >
            <Toolbar sx={{ px: 2 }}>
            {/* Trái: Menu icon */}
            {isTablet ? (
                <Box sx={{ flex: 1 }}>
                    <IconButton onClick={() => toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            ) : (
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                      src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png"
                      alt="logo"
                      style={{ height: 30 }}
                  />
                  <Box textAlign="left">
                    <Typography variant="h6" fontWeight="bold" color="#0d47a1">
                      BK<span style={{ color: "#fb8c00" }}>Star</span>
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Classroom
                    </Typography>
                  </Box>
                </Box>
            )}

            {/* Giữa: Logo + chữ (Tablet) */}
            {isTablet && (
                <Box sx={{ flex: 1, textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold" color="#0d47a1">
                    BK<span style={{ color: "#fb8c00" }}>Star</span>
                  </Typography>
                </Box>
            )}

            {/* Phải: Avatar hoặc Button */}
            <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 2,
                }}
            >
              {!isTablet ? (
                  <>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{
                          textTransform: "none",
                          borderColor: "#0288d1",
                          color: "#0288d1",
                        }}
                    >
                      Tạo lớp
                    </Button>

                    <Button
                        startIcon={<HomeIcon />}
                        sx={{ textTransform: "none", color: "#0288d1" }}
                    >
                      Trang chủ
                    </Button>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                          src="/avatar.jpg"
                          alt="Trần Xuân Bằng"
                          sx={{ width: 32, height: 32 }}
                      />
                      <Box textAlign="left">
                        <Typography variant="body2">Trần Xuân Bằng</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Giáo viên
                        </Typography>
                      </Box>
                      <IconButton onClick={handleMenuClick}>
                        <ArrowDropDownIcon />
                      </IconButton>
                      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
                      </Menu>
                    </Box>
                  </>
              ) : (
                  <Avatar
                      src="/avatar.jpg"
                      alt="Trần Xuân Bằng"
                      sx={{ width: 32, height: 32 }}
                  />
              )}
            </Box>
          </Toolbar>
          </AppBar>
          <FDraw hide={hide} isOpen={drawerOpen} toggleDrawer={setDrawerOpen}/>
      </>
  );
}