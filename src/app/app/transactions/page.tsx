'use client';

import withViewModel from '@/hooks/withViewModel';

import TransactionsView from './page.view';
import TransactionsViewModel from './page.model';

export default withViewModel(TransactionsView, TransactionsViewModel);
