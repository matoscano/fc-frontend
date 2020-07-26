import React from 'react';
import { render } from '@testing-library/react';
import Link from '../index';

describe('Link', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Link href="/" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
