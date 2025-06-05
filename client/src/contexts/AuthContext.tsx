import React, { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import apiClient from '../services/api';

interface User {
    _id: string;
    email: string;
    roles: string[];
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    hasRole: (role: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [isLoading, setIsLoading] = useState(true); 

    const login = (token: string, userData: User) => {
        localStorage.setItem('accessToken', token);
        setAccessToken(token);
        setUser(userData);
    };

    const logout = useCallback(async () => {
        try {
            await apiClient.post('/auth/logout'); 
        } catch (error) {
            console.error("Logout failed on server:", error);
        } finally {
            localStorage.removeItem('accessToken');
            setAccessToken(null);
            setUser(null);
        }
    }, []);

    const hasRole = (role: string): boolean => {
        return user?.roles.includes(role) || false;
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (accessToken) {
                try {
                    const { data } = await apiClient.get<{ user: User }>('/users/me');
                    setUser(data.user);
                } catch (error) {
                    console.error('Failed to fetch user, possibly expired token', error);
                    if ((error as any).response?.status === 401) {
                        logout();
                    }
                }
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [accessToken, logout]);

    return (
        <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};