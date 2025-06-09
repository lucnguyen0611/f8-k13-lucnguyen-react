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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo + Tên */}
        <Box display="flex" alignItems="center" gap={1}>
          <img src="https://bk-exam-public.s3.ap-southeast-1.amazonaws.com/logo2.png" alt="logo" style={{ height: 30 }} />
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#0d47a1">
              BK<span style={{ color: "#fb8c00" }}>Star</span>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Classroom
            </Typography>
          </Box>
        </Box>

        {/* Nút phải */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ textTransform: "none", borderColor: "#0288d1", color: "#0288d1" }}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
