import { FHeader } from "../../components";
import { ClassroomList } from "../../components";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export default () => {
    const navigate = useNavigate();
    return (
    <>
        <FHeader hide={true} />
        <Box sx={{ mx: 'auto', mt: '64px'}} p={3} bgcolor="#f9f9fb">
          <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
          >
              <Typography variant="h6" fontWeight="bold">
                  Danh sách lớp học
              </Typography>

              <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                      variant="outlined"
                      placeholder="Tìm kiếm"
                      size="small"
                      slotProps={{
                          input: {
                              startAdornment: (
                                  <InputAdornment position="start">
                                      <SearchIcon />
                                  </InputAdornment>
                              ),
                          },
                      }}
                  />
                  <Button
                      variant="contained"
                      color="warning"
                      startIcon={<AddIcon />}
                      sx={{ fontWeight: "bold", backgroundColor: "#efc95e" }}
                      onClick={() => navigate('/class/add')} // <-- chuyển hướng
                  >
                      Thêm lớp học
                  </Button>
              </Box>
          </Box>

          <ClassroomList />
      </Box>
    </>
  );
};
