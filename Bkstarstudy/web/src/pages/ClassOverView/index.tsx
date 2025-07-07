// import { MainLayout } from '../../components';
// import { Members, Overview, Tests } from '../../components/ClassroomItem';
// import type { Classroom } from '../../utils';
// import {useEffect, useState} from "react";
//
// import { Routes, Route, Outlet, useLocation, useParams } from 'react-router-dom';
//
// export default function ClassOverview() {
//     // Lấy classId từ URL để ghép path hoặc gọi API (nếu cần)
//     const { classId } = useParams<{ classId: string }>();
//
//     // Lấy dữ liệu lớp học truyền từ trang trước
//     const location = useLocation();
//     // const classroom: Classroom | null = location.state ?? null;
//
//     // const [classroom, setClassroom] = useState<Classroom | null>(null);
//     const [classroom, setClassroom] = useState<Classroom | null>(location.state ?? null);
//
//     useEffect(() => {
//         if (classId) {
//             const data = getClassroomById(classId);
//             setClassroom(data); // hoặc fetch từ API
//         }
//     }, [classId]);
//
//     return (
//         <MainLayout>
//              {/*Nested routes ‒ index = Overview*/}
//             <Routes>
//                 {/*<Route path="/class/:classId" element={<ClassOverview />}>*/}
//                     <Route
//                         index
//                         element={<Overview classroom={classroom} />}
//                     />
//                     <Route
//                         path="test"
//                         element={<Tests tests={classroom?.tests ?? []} />}
//                     />
//                     <Route
//                         path="members"
//                         element={<Members members={classroom?.members ?? []} />}
//                     />
//                     {/* Route 404 riêng cho lớp học (tuỳ chọn) */}
//                     <Route path="*" element={<div>Không tìm thấy trang</div>} />
//                 {/*</Route>*/}
//             </Routes>
//
//         </MainLayout>
//     );
// }


// import { MainLayout } from '../../components';
// import { Members, Overview, Tests } from '../../components/ClassroomItem';
// // import type { Classroom } from '../../utils';
// import { useEffect, useState } from 'react';
// import { Routes, Route, useLocation, useParams } from 'react-router-dom';
// import axiosClient from '../../utils/api/axiosClient.ts';
//
// export default function ClassOverview() {
//     const { classId } = useParams<{ classId: string }>();
//     const location = useLocation();
//     console.log('location', location);
//
//     const [classroom, setClassroom] = useState(location.state);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//
//     console.log('classroom', classroom)
//
//     useEffect(() => {
//         if (!classroom && classId) {
//             setLoading(true);
//             axiosClient.get(`/master/class/${classId}`)
//                 .then((res) => {
//                     setClassroom(res.data);
//                     setError(null);
//                 })
//                 .catch((err) => {
//                     console.error("Không thể lấy thông tin lớp học:", err);
//                     setError("Không tìm thấy lớp học hoặc xảy ra lỗi.");
//                 })
//                 .finally(() => {
//                     setLoading(false);
//                 });
//         }
//     }, [classId, classroom]);
//
//     if (loading) return <MainLayout><div>Đang tải lớp học...</div></MainLayout>;
//     if (error) return <MainLayout><div>{error}</div></MainLayout>;
//     if (!classroom) return <MainLayout><div>Không có dữ liệu lớp học.</div></MainLayout>;
//
//     return (
//         <MainLayout>
//             <Routes>
//                 <Route index element={<Overview classroom={classroom} />} />
//                 <Route path="test" element={<Tests tests={[]} />} /> {/* Cập nhật nếu có `tests` */}
//                 <Route path="members" element={<Members members={classroom.users} />} />
//                 <Route path="*" element={<div>Không tìm thấy trang</div>} />
//             </Routes>
//         </MainLayout>
//     );
// }


//
//
// import { MainLayout } from '../../components';
// import { Members, Overview, Tests } from '../../components/ClassroomItem';
// import { useEffect, useState } from 'react';
// import { Routes, Route, useLocation, useParams } from 'react-router-dom';
// import axiosClient from '../../utils/api/axiosClient.ts';
//
// export default function ClassOverview() {
//     const { classId } = useParams<{ classId: string }>();
//     const location = useLocation();
//
//     const [classroom, setClassroom] = useState<any>(location.state);
//     const [examGroup, setExamGroup] = useState<any[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);
//
//     // useEffect(() => {
//     //     if (!classroom && classId) {
//     //         setLoading(true);
//     //
//     //         // Gọi đồng thời 2 API, không gộp kết quả
//     //         Promise.all([
//     //             axiosClient.get(`/master/class/${classId}`),
//     //             axiosClient.get(`/exam_group/${classId}`)
//     //         ])
//     //             .then(([classRes, testsRes]) => {
//     //                 setClassroom(classRes.data);
//     //                 setExamGroup(testsRes.data || []);
//     //                 setError(null);
//     //             })
//     //             .catch((err) => {
//     //                 console.error("Lỗi khi lấy dữ liệu lớp học hoặc bài kiểm tra:", err);
//     //                 setError("Không tìm thấy lớp học hoặc xảy ra lỗi.");
//     //             })
//     //             .finally(() => {
//     //                 setLoading(false);
//     //             });
//     //     }
//     // }, [classId, classroom]);
//
//     useEffect(() => {
//         if (classId) {
//             setLoading(true);
//
//             const requests = [axiosClient.get(`/master/class/${classId}`)];
//             if (examGroup.length === 0) {
//                 requests.push(axiosClient.get(`/exam_group/${classId}`));
//             }
//
//             Promise.all(requests)
//                 .then(([classRes, testsRes]) => {
//                     setClassroom(classRes.data);
//                     if (testsRes) {
//                         setExamGroup(testsRes.data || []);
//                     }
//                     setError(null);
//                 })
//                 .catch((err) => {
//                     console.error("Lỗi khi lấy dữ liệu lớp học hoặc bài kiểm tra:", err);
//                     setError("Không tìm thấy lớp học hoặc xảy ra lỗi.");
//                 })
//                 .finally(() => {
//                     setLoading(false);
//                 });
//         }
//     }, [classId]);
//
//
//     if (loading) return <MainLayout><div>Đang tải lớp học...</div></MainLayout>;
//     if (error) return <MainLayout><div>{error}</div></MainLayout>;
//     if (!classroom) return <MainLayout><div>Không có dữ liệu lớp học.</div></MainLayout>;
//
//     return (
//         <MainLayout>
//             <Routes>
//                 <Route index element={<Overview classroom={{ ...classroom, examGroup }} />} />
//                 <Route path="test" element={<Tests tests={examGroup} />} />
//                 <Route path="members" element={<Members members={classroom.users} />} />
//                 <Route path="*" element={<div>Không tìm thấy trang</div>} />
//             </Routes>
//         </MainLayout>
//     );
// }


import { MainLayout } from '../../components';
import { Members, Overview, Tests } from '../../components/ClassroomItem';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import axiosClient from '../../utils/api/axiosClient.ts';

export default function ClassOverview() {
    // const { classId } = useParams<{ classId: string }>();
    // console.log(classId);
    const location = useLocation();
    const classId = location.state.id
    console.log(classId);

    const [classroom, setClassroom] = useState<any>();
    const [examGroup, setExamGroup] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Lấy classroom nếu chưa có
    useEffect(() => {
        if (!classroom && classId) {
            setLoading(true);
            axiosClient.get(`/master/class/${classId}`)
                .then((res) => {
                    setClassroom(res.data);
                    setError(null);
                })
                .catch((err) => {
                    console.error("Không thể lấy thông tin lớp học:", err);
                    setError("Không tìm thấy lớp học hoặc xảy ra lỗi.");
                })
                .finally(() => setLoading(false));
        }
    }, [classId, classroom]);

    // Luôn luôn lấy examGroup (không phụ thuộc classroom)
    useEffect(() => {
        if (classId) {
            axiosClient.get(`/exam_group/${classId}`)
                .then(res => {
                    setExamGroup(res.data || []);
                })
                .catch(err => {
                    console.error("Lỗi khi lấy exam group:", err);
                });
        }
    }, [classId]);

    console.log('examGroup', examGroup);
    console.log('classroom', classroom)

    if (loading) return <MainLayout><div>Đang tải lớp học...</div></MainLayout>;
    if (error) return <MainLayout><div>{error}</div></MainLayout>;
    if (!classroom) return <MainLayout><div>Không có dữ liệu lớp học.</div></MainLayout>;

    return (
        <MainLayout>
            <Routes>
                <Route index element={<Overview classroom={{ ...classroom, examGroup }} />} />
                <Route path="test" element={<Tests tests={examGroup} />} />
                <Route path="members" element={<Members members={classroom.users} />} />
                <Route path="*" element={<div>Không tìm thấy trang</div>} />
            </Routes>
        </MainLayout>
    );
}
