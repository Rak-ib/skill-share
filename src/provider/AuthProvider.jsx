import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user info on app load
    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/users/me", {
                    withCredentials: true
                });
                console.log(response.data)
                setUser(response.data);
            } catch (error) {
                setUser(null); // User is not logged in or token expired
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users/me", {
                withCredentials: true
            });
            setUser(response.data);
        } catch (error) {
            setUser(null);
        }
    };
    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:5000/users/login",
                { email, password },
                { withCredentials: true }
            );
            // setUser(response.data)
            await checkUser();
            
            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    

    const logOut = async () => {
        console.log("logout");
        try {
            await axios.get("http://localhost:5000/users/logout", { withCredentials: true });
            await checkUser();
            // setUser(null);  // ✅ Update state immediately
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
