// export interface Course {
//   id: string;
//   name: string;
//   memberCount: number;
//   classCode: string;
//   themeColor?: string;
// }
//
// export interface Test {
//   id: number;
//   name: string;
//   date: string;
//   avatar: string
// }
//
// export interface Member {
//   id: number;
//   name: string;
//   role: string;
// }
//
// export interface Classroom {
//   id: number;
//   name: string;
//   code: string;
//   members: Member[];
//   tests: Test[];
// }

export interface ExamGroupI {
  id: number;
  name: string;
  clas: number;
  start_time: string;
  await_time: number;
  is_once: boolean;
  is_save_local: boolean;
  created_at?: string;
}

export interface UserClassI {
  id: number;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'pending' | 'confirmed' | 'rejected';
}

export interface ClassI {
  id: number;
  code: string;
  name: string;
  users: UserClassI[];
}
