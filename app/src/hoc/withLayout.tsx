import React from 'react';
import { BaseLayout } from '../layouts';

const availableLayouts = {
  base: BaseLayout,
};

export function withLayout<T>(
  Component: React.FC<T>,
  layout: keyof typeof availableLayouts = 'base',
): React.FC<T> {
  let Layout: React.FC = availableLayouts[layout];

  return (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
}
