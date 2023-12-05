import { RegisterPayload } from '@/providers/AuthProvider';

export type RegisterViewProps = {
    registering: boolean;
    errorMessage: string;
    register: (payload: RegisterPayload) => void;
};
