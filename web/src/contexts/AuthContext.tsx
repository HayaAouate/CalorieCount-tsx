import { createContext, useState, type ReactNode, useContext } from 'react';

type AuthContextType = {
    token: string | null;
    user: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Initialiser depuis localStorage si disponible
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<string | null>(() => localStorage.getItem('user'));

    const login = (newToken: string, username: string) => {
        setToken(newToken);
        setUser(username);
        // Sauvegarder dans localStorage
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', username);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        // Supprimer de localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

