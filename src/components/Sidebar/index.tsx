import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { Menu, MenuItem, Panel, Wrapper } from './styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from 'providers/AuthProvider';
import ConfirmDialog from 'components/ConfirmDialog';

export default function Sidebar() {
    const { signOut } = useAuth();
    const [showConfirm, setShowConfirm] = useState(false);

    function showSignOutConfirm() {
        setShowConfirm(true);
    }

    function handleSignOut() {
        setShowConfirm(false);
        signOut();
    }

    return (
        <>
            <Wrapper>
                <Panel>
                    <Menu>
                        <MenuItem>
                            <HomeOutlinedIcon />
                            <Typography>Dashboard</Typography>
                        </MenuItem>
                        <MenuItem>
                            <AccountBalanceOutlinedIcon />
                            <Typography>Contas</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ReceiptOutlinedIcon />
                            <Typography>Transações</Typography>
                        </MenuItem>
                        <MenuItem>
                            <SettingsOutlinedIcon />
                            <Typography>Configurações</Typography>
                        </MenuItem>
                        <MenuItem onClick={showSignOutConfirm}>
                            <LogoutOutlinedIcon />
                            <Typography>Sair</Typography>
                        </MenuItem>
                    </Menu>
                </Panel>
            </Wrapper>
            <ConfirmDialog
                title="Sair?"
                description="Você realmente deseja sair do aplicativo?"
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                handleConfirm={handleSignOut}
            />
        </>
    );
}
