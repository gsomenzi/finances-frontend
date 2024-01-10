'use client';

import withViewModel from '@/hooks/withViewModel';

import IdView from './page.view';
import IdViewModel from './page.model';

export default withViewModel(IdView, IdViewModel);
