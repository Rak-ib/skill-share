import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import UseAuth from "../hooks/UseAuth";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = UseAuth(); // Assuming user context
    const [socket, setSocket] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user?._id) return; // Ensure user ID is available
    
        console.log(`🔌 Connecting socket for user ${user._id}...`);
        const newSocket = io("http://localhost:5000", { withCredentials: true });
    
        newSocket.on("connect", () => {
            console.log(`✅ Socket connected: ${newSocket.id}`);
            newSocket.emit("register", user._id); // Register user with backend
        });
    
        newSocket.on("notification", (notification) => {
            console.log("🔔 New Notification:", notification);
            setNotifications((prev) => [...prev, notification].slice(0, 3)); // Keep last 3
        });
    
        setSocket(newSocket);
    
        return () => {
            console.log("🛑 Disconnecting socket...");
            newSocket.disconnect();
            setSocket(null); // Ensure old socket is cleared
        };
    }, [user?._id]); // Reconnect when user._id changes

    return (
        <SocketContext.Provider value={{ socket, notifications }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);