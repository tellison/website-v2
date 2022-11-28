import React from 'react';
import { render } from '@testing-library/react';
import BlogIndex, { Head } from '../blog';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import { createMDXData } from '../../__fixtures__/page';

let mockData = createMDXData();

describe('Blog page', () => {
  it('renders correctly', () => {
    const { container } = render(<BlogIndex data={mockData}/>);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('All Posts | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<BlogIndex data={mockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});