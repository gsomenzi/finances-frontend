'use client';

import withViewModel from '@/hooks/withViewModel';

import RegisterView from './page.view';
import RegisterViewModel from './page.model';

export default withViewModel(RegisterView, RegisterViewModel);
