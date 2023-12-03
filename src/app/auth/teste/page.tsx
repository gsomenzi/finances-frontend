'use client';

import withViewModel from '@/hooks/withViewModel';

import TesteView from './page.view';
import TesteViewModel from './page.model';

export default withViewModel(TesteView, TesteViewModel);
