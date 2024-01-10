'use client';

import CreditCardModel from '@/models/CreditCardModel';
import { CreditCardDetailsViewProps } from './types';
import { useQuery } from 'react-query';
import { CreditCard } from '@/types/CreditCard';
import StatementModel from '@/models/StatementModel';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Statement } from '@/types/Statement';

export default function CreditCardDetailsViewModel({ params }: { params: { id: string } }): CreditCardDetailsViewProps {
    const { id } = params;
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const creditCardModel = new CreditCardModel();
    const statementModel = new StatementModel();

    const { data: creditCard, isLoading: gettingCreditCard } = useQuery<CreditCard>(['credit-card', id], () =>
        creditCardModel.findOne(id),
    );

    const { data: statement, isLoading: gettingStatements } = useQuery<Statement>(
        ['statements', { creditCardId: id, date }],
        () => statementModel.findOneByDate(creditCard?.id || 0, date),
        {
            enabled: !!creditCard?.id && !!date,
        },
    );

    console.log('statements', statement);

    return {
        creditCard: creditCard || null,
        statement: statement || null,
        gettingCreditCard,
        gettingStatements,
    };
}
