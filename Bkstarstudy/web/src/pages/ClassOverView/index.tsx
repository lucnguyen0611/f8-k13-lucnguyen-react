import {MainLayout} from '../../components'
import {Members, Overview, Tests} from "../../components/ClassroomItem";
import type {Classroom} from '../../utils'
import {useLocation} from "react-router-dom";
// import {useState} from "react";


export default function ClassOverview() {
    const location = useLocation();
    // const [classroom, setClassroom] = useState<Classroom>(location.state);
    const classroom: Classroom = location.state;

    return (
        <>
            <MainLayout>
                <Overview classroom={classroom} />
                <Members members={classroom.members} />
                <Tests tests={classroom. tests} />
            </MainLayout>
        </>
    )
}