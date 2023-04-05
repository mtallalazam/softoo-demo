import { render, screen, waitFor, fireEvent, waitForElementToBeRemoved, act } from '@testing-library/react';
import { vi } from 'vitest';

import Home from './Home';
import { productsList } from '../../data/products';

describe('<Home />', () => {
  it('should initially render the Home Component in Loading State', async () => {
    render(<Home />);
    expect(screen.getByTestId('loading-element')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => expect(screen.getByTestId('loading-element')));
  });

  it('renders items when data is fetched', async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => expect(screen.getByTestId('loading-element')));
    expect(screen.getAllByTestId('item-card').length).toBe(productsList.length);
  });

  it('filters items by color', async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => expect(screen.getByTestId('loading-element')));

    const select = screen.getByTestId('color-filter-select-input');
    fireEvent.change(select, { target: { value: 'Red' } });

    const filteredItems = screen.getAllByTestId('item-card');
    expect(filteredItems.length).toBeGreaterThan(0);

    filteredItems.forEach((item) => {
      expect(item).toHaveTextContent('Red');
    });
  });

  it('clears filter', async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => expect(screen.getByTestId('loading-element')));

    const select = screen.getByTestId('color-filter-select-input');
    fireEvent.change(select, { target: { value: 'Red' } });

    const filteredItems = screen.getAllByTestId('item-card');
    expect(filteredItems.length).toBeGreaterThan(0);

    fireEvent.click(screen.getByTestId('clear-filter-button'));

    const allItems = screen.getAllByTestId('item-card');
    expect(allItems.length).toBeGreaterThan(filteredItems.length);
  });
});
