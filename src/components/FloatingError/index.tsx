import { Alert, AlertTitle, Box, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { normalizeError } from 'tools';
import { AppError } from 'types/AppError';

type Props = {
    duration?: number;
    open: boolean;
    onClose(): void;
    title: string;
    error?: unknown;
};

export default function FloatingError({ duration, open, onClose, title, error }: Props) {
    const [internalError, setInternalError] = useState<AppError | null>(null);
    useEffect(() => {
        if (error) {
            setInternalError(normalizeError(error));
        } else {
            setInternalError(null);
        }
    }, [error]);

    return (
        <Snackbar
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            open={open}
            autoHideDuration={duration || 6000}
            onClose={onClose}>
            <Box textAlign="left">
                <Alert variant="filled" onClose={onClose} severity="error" sx={{ width: '100%' }}>
                    <AlertTitle>{title}</AlertTitle>
                    {internalError?.fields
                        ? Object.values(internalError.fields).map((v, i) => (
                              <Typography key={i} marginBottom={0}>
                                  {v}
                              </Typography>
                          ))
                        : null}
                </Alert>
            </Box>
        </Snackbar>
    );
}
