import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
    title: string;
    primaryBtn?: {
        title: string;
        onClick(): void;
    };
    onSearch?(e: any): void;
    secondaryContent?: ReactNode;
};

export default function PageHeader({ title, primaryBtn, onSearch, secondaryContent }: Props) {
    return (
        <>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                    <Typography flexGrow="1" variant="h3">
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                    {primaryBtn ? (
                        <Button variant="contained" onClick={primaryBtn.onClick}>
                            {primaryBtn.title}
                        </Button>
                    ) : null}
                </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" marginBottom={2}>
                <Grid item xs={6}>
                    {onSearch ? (
                        <Box>
                            <Box display="flex" alignItems="center"></Box>
                            <TextField
                                id="page-search"
                                label="Pesquisar"
                                variant="standard"
                                type="search"
                                onChange={e => onSearch(e.target.value)}
                            />
                        </Box>
                    ) : null}
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                        {secondaryContent}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
