import { Box } from "@mui/material";
import { FHeader } from "../index.ts";
import { useLocation } from "react-router-dom";
import React from "react";
import type { Classroom } from "../../utils";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const location = useLocation();
    const classroom = location.state as Classroom; // ép kiểu an toàn

    return (
        <>
            <FHeader hide={false} />

            <Box
                sx={{
                    mt: "64px",
                    ml: "240px",
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
