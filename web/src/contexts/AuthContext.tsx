import { createContext, useState, type ReactNode, useContext } from 'react';

type AuthContextType = {
    token: string | null;
    user: string | null;
    role: string | null;
    login: (token: string, username: string, role: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Initialiser depuis localStorage 
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [user, setUser] = useState<string | null>(() => localStorage.getItem('user'));
    const [role, setRole] = useState<string | null>(() => localStorage.getItem('role'));

    const login = (newToken: string, username: string, userRole: string) => {
        setToken(newToken);
        setUser(username);
        setRole(userRole);
        // Sauvegarder dans localStorage
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', username);
        localStorage.setItem('role', userRole);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setRole(null);
        // Supprimer de localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
    };

    const isAuthenticated = !!token;
    const isAdmin = role === 'admin';

    return (
        <AuthContext.Provider value={{ token, user, role, login, logout, isAuthenticated, isAdmin }}>
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
