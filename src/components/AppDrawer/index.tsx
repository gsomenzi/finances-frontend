import { CloseOutlined } from '@mui/icons-material';
import { Box, Button, Drawer, Link, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { CloseBtnWrapper, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, Wrapper } from './styles';

export type AppDrawerProps = {
    title?: string;
    open: boolean;
    onClose(): void;
    children: ReactNode;
    afterClose?(): void;
};

export default function AppDrawer({ title, open, onClose, children, afterClose }: AppDrawerProps) {
    function handleCloseBtn(e: any) {
        e.preventDefault();
        handleClose();
    }

    function handleClose() {
        onClose();
        if (afterClose) {
            afterClose();
        }
    }

    return (
        <Drawer variant="temporary" anchor="right" open={open} onClose={handleClose}>
            <Wrapper>
                <DrawerHeader>
                    <DrawerTitle>{title || ''}</DrawerTitle>
                    <CloseBtnWrapper onClick={handleCloseBtn}>
                        <CloseOutlined />
                    </CloseBtnWrapper>
                </DrawerHeader>
                <DrawerContent>{children}</DrawerContent>

                <DrawerFooter>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button style={{ marginLeft: '1rem' }} variant="contained">
                        Salvar
                    </Button>
                </DrawerFooter>
            </Wrapper>
        </Drawer>
    );
}
