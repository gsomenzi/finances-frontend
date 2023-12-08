'use client';

import withViewModel from '@/hooks/withViewModel';

import AccountsView from './page.view';
import AccountsViewModel from './page.model';

export default withViewModel(AccountsView, AccountsViewModel);
