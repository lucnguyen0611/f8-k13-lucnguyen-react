import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { getInfo } from '../utils/api/authService';

interface IUserInfo {
    id: number;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
}

interface IStoreContext {
    userInfo: IUserInfo | null;
    handleLogOut: () => void;
    setUserId: (id: string | undefined) => void;
}

export const StoreContext = createContext<IStoreContext>({
    userInfo: null,
    handleLogOut: () => {},
    setUserId: () => {},
});

function decodeJWT(token?: string) {
    if (!token) return undefined;
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload) as { id?: string };
    } catch (err) {
        console.error('Invalid token', err);
        return undefined;
    }
}

const decoded = decodeJWT(Cookies.get('token'));

export function StoreProvider({ children }: { children: ReactNode }) {
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
    const [userId, setUserId] = useState<string | undefined>(decoded?.id);

    const handleLogOut = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('userId');
        setUserInfo(null);
        setUserId(undefined);
    };

    useEffect(() => {
        if (!userId) return;

        let isMounted = true;

        getInfo(userId)
            .then((res) => {
                if (isMounted && res) {
                    const { id, name, email, role } = res;
                    setUserInfo({ id, name, email, role });
                }
            })
            .catch((err) => {
                console.error('Failed to fetch user info:', err);
                handleLogOut(); // nếu lỗi có thể do token hỏng
            });

        return () => {
            isMounted = false;
        };
    }, [userId]);

    return (
        <StoreContext.Provider value={{ userInfo, handleLogOut, setUserId }}>
            {children}
        </StoreContext.Provider>
    );
}
