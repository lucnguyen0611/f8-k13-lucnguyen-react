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

export interface RegisterPayloadI {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "admin";
  status: "pending" | "confirmed";
}

export interface UserInfoI {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface LoginBodyI {
  email: string;
  password: string;
}


export interface DialogProp {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  width?: number
  children?: any
}