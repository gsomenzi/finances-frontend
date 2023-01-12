import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';

type Props = {
    open: boolean;
    onClose?(): void;
    handleCancel?(): void;
    handleConfirm?(): void;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
};

export default function ConfirmDialog({
    open,
    onClose,
    handleCancel,
    handleConfirm,
    title,
    description,
    cancelText,
    confirmText,
}: Props) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title || 'Você tem certeza?'}</DialogTitle>
            <DialogContent>
                <Typography>{description || 'Vocêe tem certeza que deseja executar esta ação?'}</Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel || onClose}>
                    {cancelText || 'Cancelar'}
                </Button>
                <Button onClick={handleConfirm}>{confirmText || 'Sim'}</Button>
            </DialogActions>
        </Dialog>
    );
}
