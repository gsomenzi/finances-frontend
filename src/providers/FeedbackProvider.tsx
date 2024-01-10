import React, { ReactNode, useCallback } from 'react';
import { List, message, notification } from 'antd';
import axios, { AxiosError } from 'axios';

const ContextProps: {
    showMessage: (type: 'success' | 'error' | 'warning', content: ReactNode) => void;
    showNotification: (
        title: string,
        content: ReactNode,
        config?: { duration?: number; type: 'info' | 'success' | 'error' | 'warning' },
    ) => void;
    showError: (title: string, content: ReactNode, config?: { duration?: number }) => void;
} = {
    showMessage: () => {},
    showNotification: () => {},
    showError: () => {},
};

const FeedbackContext = React.createContext(ContextProps);

export const useFeedback = () => React.useContext(FeedbackContext);

export const FeedbackProvider = ({ children }: any) => {
    const [messageApi, messageContextHolder] = message.useMessage();
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const AxiosErrorComponent = useCallback(({ error }: { error: AxiosError<any> }) => {
        const message: string | string[] = error?.message || 'Ocorreu um erro inesperado';
        if (Array.isArray(message)) {
            return (
                <List>
                    {message.map((m) => (
                        <List.Item>{m}</List.Item>
                    ))}
                </List>
            );
        }
        return <div>{message}</div>;
    }, []);

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

    const showError = (title: string, content: ReactNode | AxiosError, config?: { duration?: number }) => {
        if (typeof content === 'object') {
            const parsedError = content as AxiosError;
            showNotification(title, <AxiosErrorComponent error={parsedError} />, {
                type: 'error',
                duration: config?.duration || 6,
            });
        } else {
            showNotification(title, content, {
                type: 'error',
                duration: config?.duration || 6,
            });
        }
    };

    return (
        <FeedbackContext.Provider
            value={{
                showMessage,
                showNotification,
                showError,
            }}>
            {messageContextHolder}
            {notificationContextHolder}
            {children}
        </FeedbackContext.Provider>
    );
};
