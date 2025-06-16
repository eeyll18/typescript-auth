import React, { createContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import apiClient, { setAccessTokenMemory } from '../services/api';

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
    const [accessToken, setAccessToken] = useState<string | null>(null); 
    const [isLoading, setIsLoading] = useState(true);


    const login = (token: string, userData: User) => {
        setAccessToken(token);
        setAccessTokenMemory(token); 
        setUser(userData);
    };

    const logout = useCallback(async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error("Logout failed on server:", error);
        } finally {
            setAccessToken(null);
            setAccessTokenMemory(null);
            setUser(null);
        }
    }, []);

    const hasRole = (role: string): boolean => {
        return user?.roles.includes(role) || false;
    };

    useEffect(() => {
        const fetchUserAndToken = async () => {
            setIsLoading(true)
            try {
                // Sayfa açıldığında refresh token ile yeni access token isteği
                const { data } = await apiClient.post<{ accessToken: string, user: User }>('/auth/refresh-token', {});
                setAccessToken(data.accessToken);
                setAccessTokenMemory(data.accessToken);
                setUser(data.user);
            } catch (error) {
                console.error("Refresh token failed or not found", error);
                setAccessToken(null);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserAndToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, accessToken, isLoading, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};
