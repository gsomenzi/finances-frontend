import { ReactNode } from 'react';

export type ErrorAlertProps = {
    show: boolean;
    title: string;
    description?: ReactNode;
};
