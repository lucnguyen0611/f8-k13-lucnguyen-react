import { MainLayout } from '../../components';
import { Members, Overview, ExamGroup, Exam, ExamDetail } from '../../components/ClassroomItem';
import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import axiosClient from '../../utils/api/axiosClient.ts';
import type {ExamGroupI, ClassI} from '../../utils'

export default function ClassOverview() {
    const { id: classId } = useParams();

    const [classroom, setClassroom] = useState<ClassI>();
    const [examGroup, setExamGroup] = useState<ExamGroupI[]>([]);
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
            axiosClient.get(`/exam_group`)
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
                <Route index element={<Overview classroom={classroom} examGroup={examGroup} />} />
                <Route path="exam" element={<ExamGroup  examGroup={examGroup} classId={classroom.id}/>} />
                {/*<Route path="exam" element={<ExamGroup examGroup={examGroup} classId={classroom.id} />}>*/}
                {/*    <Route path={":id"} element={<Exam />} />*/}
                {/*</Route>*/}
                {/*<Route path="exam/:id" element={<Exam />} >*/}
                {/*    <Route path=":id" element={<ExamDetail />} />*/}
                {/*</Route>*/}
                <Route path="exam/:id" element={<Exam />} >
                </Route>
                <Route path="exam/:id/:id" element={<ExamDetail />} />
                <Route path="members" element={<Members members={classroom.users} />} />
                {/*<Route path="step-2" element={<StepTwoLayout />}>*/}
                {/*    <Route index element={<SubStepA />} />*/}
                {/*    <Route path="sub-b" element={<SubStepB />} />*/}
                {/*</Route>*/}
                <Route path="*" element={<div>Không tìm thấy trang</div>} />
            </Routes>
            {/*<Overview classroom={classroom} examGroup={examGroup} />*/}
        </MainLayout>
    );
}