import React from 'react';
import { IMaskInput, IMask } from 'react-imask';
import { InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material';

export interface CurrencyInputProps extends OutlinedInputProps {
    currencySymbol?: string;
}

const MaskedComponent = (props: CurrencyInputProps) => {
    return (
        <IMaskInput
            scale={2}
            thousandsSeparator="."
            radix=","
            signed
            normalizeZeros
            mask={IMask.MaskedNumber}
            overwrite
            {...props}
        />
    );
};

const CurrencyInput = React.forwardRef((props: CurrencyInputProps, ref: any) => {
    const { currencySymbol } = props;
    return (
        <OutlinedInput
            inputComponent={MaskedComponent as any}
            inputRef={ref}
            startAdornment={
                currencySymbol ? <InputAdornment position="start">{currencySymbol || ''}</InputAdornment> : null
            }
            {...props}
        />
    );
});

export default CurrencyInput;
