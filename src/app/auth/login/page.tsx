'use client';

import withViewModel from '@/hooks/withViewModel';

import LoginView from './page.view';
import LoginViewModel from './page.model';

export default withViewModel(LoginView, LoginViewModel);
