import { MainLayout } from '../../components';
import { Members, Overview, Tests } from '../../components/ClassroomItem';
import type { Classroom } from '../../utils';
import {useEffect, useState} from "react";

import { Routes, Route, Outlet, useLocation, useParams } from 'react-router-dom';

export default function ClassOverview() {
    // Lấy classId từ URL để ghép path hoặc gọi API (nếu cần)
    const { classId } = useParams<{ classId: string }>();

    // Lấy dữ liệu lớp học truyền từ trang trước
    const location = useLocation();
    // const classroom: Classroom | null = location.state ?? null;

    // const [classroom, setClassroom] = useState<Classroom | null>(null);
    const [classroom, setClassroom] = useState<Classroom | null>(location.state ?? null);

    useEffect(() => {
        if (classId) {
            const data = getClassroomById(classId);
            setClassroom(data); // hoặc fetch từ API
        }
    }, [classId]);

    return (
        <MainLayout>
             {/*Nested routes ‒ index = Overview*/}
            <Routes>
                {/*<Route path="/class/:classId" element={<ClassOverview />}>*/}
                    <Route
                        index
                        element={<Overview classroom={classroom} />}
                    />
                    <Route
                        path="test"
                        element={<Tests tests={classroom?.tests ?? []} />}
                    />
                    <Route
                        path="members"
                        element={<Members members={classroom?.members ?? []} />}
                    />
                    {/* Route 404 riêng cho lớp học (tuỳ chọn) */}
                    <Route path="*" element={<div>Không tìm thấy trang</div>} />
                {/*</Route>*/}
            </Routes>

        </MainLayout>
    );
}
