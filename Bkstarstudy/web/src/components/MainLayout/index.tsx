import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FDraw, FHeader } from "../../components";


interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <>
            <FHeader />
            <FDraw isOpen={isDesktop} toggleDrawer={() => () => {}} />

            <Box
                sx={{
                    mt: "64px",
                    ml: isDesktop ? "240px" : 0,
                    p: 5,
                }}
                bgcolor="#f7f7f9"
                height= '100%'
            >
                {children}
            </Box>
        </>
    );
}
