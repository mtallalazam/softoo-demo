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

const onDelete = vi.fn();
const onIncreaseQty = vi.fn();
const onDecreaseQty = vi.fn();

describe('<Item Card />', () => {
  it('should render all details about the item', () => {
    render(<ItemCard item={MockItem} onDelete={onDelete} onIncreaseQty={onIncreaseQty} onDecreaseQty={onDecreaseQty} />);
    expect(screen.getByTestId('itemTitle')).toHaveTextContent(MockItem.name);
    expect(screen.getByTestId('itemPrice')).toHaveTextContent(`${MockItem.price}`);
    expect(screen.getByTestId('itemQuantity')).toHaveTextContent(`${MockItem.quantity}`);
    expect(screen.getByTestId('itemImage')).toHaveAttribute('src', MockItem.img);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<ItemCard item={MockItem} onDelete={onDelete} onIncreaseQty={onIncreaseQty} onDecreaseQty={onDecreaseQty} />);
    fireEvent.click(screen.getByTestId('deleteItemButton'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('calls onIncreaseQty when increase quantity button is clicked', () => {
    render(<ItemCard item={MockItem} onDelete={onDelete} onIncreaseQty={onIncreaseQty} onDecreaseQty={onDecreaseQty} />);
    fireEvent.click(screen.getByTestId('increaseItemButton'));
    expect(onIncreaseQty).toHaveBeenCalledTimes(1);
  });

  it('calls onDecreaseQty when decrease quantity button is clicked', () => {
    render(<ItemCard item={MockItem} onDelete={onDelete} onIncreaseQty={onIncreaseQty} onDecreaseQty={onDecreaseQty} />);
    fireEvent.click(screen.getByTestId('decreaseItemButton'));
    expect(onDecreaseQty).toHaveBeenCalledTimes(1);
  });
});
