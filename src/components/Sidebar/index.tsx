import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { Menu, MenuItem, Panel, Wrapper, MenuItemTitle } from './styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from 'providers/AuthProvider';
import ConfirmDialog from 'components/ConfirmDialog';
import { Link } from 'react-router-dom';

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
                        <Link to="/">
                            <MenuItem>
                                <HomeOutlinedIcon />
                                <MenuItemTitle>Dashboard</MenuItemTitle>
                            </MenuItem>
                        </Link>
                        <Link to="/contas">
                            <MenuItem>
                                <AccountBalanceOutlinedIcon />
                                <MenuItemTitle>Contas</MenuItemTitle>
                            </MenuItem>
                        </Link>
                        <MenuItem>
                            <ReceiptOutlinedIcon />
                            <MenuItemTitle>Transações</MenuItemTitle>
                        </MenuItem>
                        <MenuItem>
                            <SettingsOutlinedIcon />
                            <MenuItemTitle>Configurações</MenuItemTitle>
                        </MenuItem>
                        <MenuItem onClick={showSignOutConfirm}>
                            <LogoutOutlinedIcon />
                            <MenuItemTitle>Sair</MenuItemTitle>
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
