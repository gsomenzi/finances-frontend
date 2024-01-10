'use client';

import CreditCardModel from '@/models/CreditCardModel';
import { CreditCardDetailsViewProps } from './types';
import { useQuery } from 'react-query';
import { CreditCard } from '@/types/CreditCard';
import StatementModel from '@/models/StatementModel';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Statement } from '@/types/Statement';

export default function CreditCardDetailsViewModel({ params }: { params: { id: string } }): CreditCardDetailsViewProps {
    const { id } = params;
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [search, setSearch] = useState('');
    const creditCardModel = new CreditCardModel();
    const statementModel = new StatementModel();

    const { data: creditCard, isLoading: gettingCreditCard } = useQuery<CreditCard>(
        ['credit-card', id],
        () => creditCardModel.findOne(id),
        {
            onSuccess: () => {},
        },
    );

    const { data: statement, isLoading: gettingStatements } = useQuery<Statement>(
        ['statements', { creditCardId: id, date }],
        () => statementModel.findOneByDate(creditCard?.id || 0, date),
        {
            enabled: !!creditCard?.id && !!date,
        },
    );

    const transactions: Statement['transactions'] = useMemo(() => {
        if (statement?.transactions && statement.transactions.length > 0) {
            return statement.transactions.filter((t) => t.description.toLowerCase().includes(search.toLowerCase()));
        } else {
            return [];
        }
    }, [statement, search]);

    function goPreviousDate() {
        const newDate = dayjs(date).subtract(1, 'month').format('YYYY-MM-DD');
        setDate(newDate);
    }

    function goNextDate() {
        const newDate = dayjs(date).add(1, 'month').format('YYYY-MM-DD');
        setDate(newDate);
    }

    return {
        creditCard: creditCard || null,
        statement: statement || null,
        transactions,
        gettingCreditCard,
        gettingStatements,
        goPreviousDate,
        goNextDate,
        setSearch,
    };
}
