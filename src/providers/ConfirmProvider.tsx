import { Modal } from 'antd';
import React, { ReactNode, useState } from 'react';

type ConfirmConfigProps = { title: string; description: ReactNode; onConfirm: () => void; onCancel: () => void };

const ContextProps: {
    confirm: (props: ConfirmConfigProps) => void;
} = {
    confirm: (props: ConfirmConfigProps) => {},
};

const ConfirmContext = React.createContext(ContextProps);

export const useConfirm = () => React.useContext(ConfirmContext);

export const ConfirmProvider = ({ children }: any) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState<ReactNode>();
    const [onConfirm, setOnConfirm] = useState<() => void>();
    const [onCancel, setOnCancel] = useState<() => void>();

    function confirm(configs: ConfirmConfigProps) {
        const { title, description, onConfirm, onCancel } = configs;
        setTitle(title);
        setDescription(description);
        setOnConfirm(() => onConfirm);
        setOnCancel(() => onCancel);
        setOpen(true);
    }

    function handleOk() {
        setOpen(false);
        onConfirm?.();
    }

    function handleCancel() {
        setOpen(false);
        onCancel?.();
    }

    function cleanState() {
        setOpen(false);
        setTitle('');
        setDescription(undefined);
        setOnConfirm(undefined);
        setOnCancel(undefined);
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            <Modal
                open={open}
                title={title}
                onOk={handleOk}
                onCancel={handleCancel}
                afterClose={cleanState}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}>
                {description}
            </Modal>
            {children}
        </ConfirmContext.Provider>
    );
};
