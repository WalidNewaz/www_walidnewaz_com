jest.mock('./ContentRibbon.css', () => ({}));
import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import ContentRibbon from './ContentRibbon';

describe('ContentRibbon', () => {
  // Set the desired window size before rendering the component
  beforeEach(() => {
    // Set the window size to 1200x800
    window.innerWidth = 600;
    window.innerHeight = 400;
  });

  test('renders children correctly', () => {
    const { getByText } = render(
      <ContentRibbon>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ContentRibbon>,
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
    expect(getByText('Child 3')).toBeInTheDocument();
  });
});
