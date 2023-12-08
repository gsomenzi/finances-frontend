'use client';

import withViewModel from '@/hooks/withViewModel';

import CreditCardsView from './page.view';
import CreditCardsViewModel from './page.model';

export default withViewModel(CreditCardsView, CreditCardsViewModel);
