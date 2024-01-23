import React, { createContext, ReactNode, useState } from 'react';
import { TransactionGroup } from '@/types/TransactionGroup';

const ContextProps: {
    transactionGroup: TransactionGroup;
    showContext: boolean;
    setShowContext: (show: boolean) => void;
} = {
    transactionGroup: {} as TransactionGroup,
    showContext: false,
    setShowContext: () => {},
};

const TransactionGroupDetailsContext = createContext(ContextProps);

export const useTransactionGroupDetails = () => {
    return React.useContext(TransactionGroupDetailsContext);
};

export default function TransactionGroupDetailsProvider({
    children,
    transactionGroup,
}: {
    children: ReactNode;
    transactionGroup: TransactionGroup;
}) {
    const [showContext, setShowContext] = useState(false);

    return (
        <TransactionGroupDetailsContext.Provider
            value={{
                transactionGroup,
                showContext,
                setShowContext,
            }}>
            {children}
        </TransactionGroupDetailsContext.Provider>
    );
}
