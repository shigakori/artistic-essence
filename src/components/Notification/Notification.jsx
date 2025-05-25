"use client";

import React, { createContext, useContext, useState } from 'react';
import './Notification.css';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        
        setTimeout(() => {
            removeNotification(id);
        }, 5000);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <div className="notification-container">
                {notifications.map(notification => (
                    <div 
                        key={notification.id} 
                        className={`notification notification--${notification.type}`}
                    >
                        <div className="notification__content">
                            {notification.message}
                        </div>
                        <button 
                            className="notification__close"
                            onClick={() => removeNotification(notification.id)}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export default NotificationProvider; 