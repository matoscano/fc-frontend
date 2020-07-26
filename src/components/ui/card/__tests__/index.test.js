import React from 'react';
import { render } from '@testing-library/react';
import Card from '../index';

it('renders a Card', () => {
  const { container } = render(
    <Card title="Title" width="200">
      Body
    </Card>,
  );
  expect(container).toMatchSnapshot();
});
