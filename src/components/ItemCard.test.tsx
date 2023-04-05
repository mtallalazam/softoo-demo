import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import ItemCard from './ItemCard';

const MockItem = {
  id: 1,
  colour: 'Black',
  name: 'Black Sheet Strappy Textured Glitter Bodycon Dress',
  price: 10,
  img: 'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg?imwidth=1024',
  quantity: 1
};

describe('<Item Card />', () => {
  it('should render all details about the item', () => {
    render(<ItemCard item={MockItem} />);
    expect(screen.getByRole('itemTitle')).toHaveTextContent(MockItem.name);
    expect(screen.getByRole('itemPrice')).toHaveTextContent(`${MockItem.price}`);
    expect(screen.getByRole('itemQuantity')).toHaveTextContent(`${MockItem.quantity}`);
    expect(screen.getByRole('itemImage')).toHaveAttribute('src', MockItem.img);
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<ItemCard item={MockItem} onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId('deleteItemButton'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('calls onIncreaseQty when increase quantity button is clicked', () => {
    const onIncreaseQty = vi.fn();
    render(<ItemCard item={MockItem} onIncreaseQty={onIncreaseQty} />);
    fireEvent.click(screen.getByTestId('increaseItemButton'));
    expect(onIncreaseQty).toHaveBeenCalledTimes(1);
  });

  it('calls onDecreaseQty when decrease quantity button is clicked', () => {
    const onDecreaseQty = vi.fn();
    render(<ItemCard item={MockItem} onDecreaseQty={onDecreaseQty} />);
    fireEvent.click(screen.getByTestId('decreaseItemButton'));
    expect(onDecreaseQty).toHaveBeenCalledTimes(1);
  });
});
