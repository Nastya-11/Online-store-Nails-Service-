// store/providers.tsx
'use client';

import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from './index';

const Providers = ({ children }: PropsWithChildren<{}>) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
