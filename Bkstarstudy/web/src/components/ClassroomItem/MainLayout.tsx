import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FHeader } from "../index.ts";
import { useLocation } from "react-router-dom";
import React from "react";
import type { ClassI } from "../../utils";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const location = useLocation();
    const classroom = location.state as ClassI;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const marginLeft = isDesktop ? "240px" : 0;

    return (
        <>
            <FHeader hide={false} />
            <Box
                sx={{
                    mt: "64px",
                    ml: isDesktop ? marginLeft : 0,
                    p: 5,
                }}
                bgcolor="#f7f7f9"
                height="100%"
            >
                {React.isValidElement(children)
                    ? React.cloneElement(children as React.ReactElement<any>, { classroom })
                    : children}
            </Box>
        </>
    );
}
