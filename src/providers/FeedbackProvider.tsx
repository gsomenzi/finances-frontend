import React, { ReactNode } from 'react';
import { message, notification } from 'antd';

const ContextProps: {
    showMessage: (type: 'success' | 'error' | 'warning', content: ReactNode) => void;
    showNotification: (
        title: string,
        content: ReactNode,
        config?: { duration?: number; type: 'info' | 'success' | 'error' | 'warning' },
    ) => void;
} = {
    showMessage: () => {},
    showNotification: () => {},
};

const FeedbackContext = React.createContext(ContextProps);

export const useFeedback = () => React.useContext(FeedbackContext);

export const FeedbackProvider = ({ children }: any) => {
    const [messageApi, messageContextHolder] = message.useMessage();
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const showMessage = (type: 'success' | 'error' | 'warning', content: ReactNode) => {
        messageApi.open({
            type,
            content,
        });
    };

    const showNotification = (
        title: string,
        content: ReactNode,
        config?: { duration?: number; type: 'info' | 'success' | 'error' | 'warning' },
    ) => {
        notificationApi.open({
            type: config?.type || 'info',
            message: title,
            description: content,
            duration: config?.duration || 4.5,
        });
    };

    return (
        <FeedbackContext.Provider
            value={{
                showMessage,
                showNotification,
            }}>
            {messageContextHolder}
            {notificationContextHolder}
            {children}
        </FeedbackContext.Provider>
    );
};
