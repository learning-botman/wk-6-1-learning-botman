import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookCard from '../BookCard';
import { formatCurrency } from '../../config/currency';

describe('BookCard', () => {
  const book = {
    id: 123,
    title: 'Unit Test Book',
    author: 'Tester',
    price: 10.5,
    image: '',
    description: 'A test book',
  };

  test('renders title and price and calls onPurchase when Buy Now clicked', async () => {
    // make onPurchase return a resolved promise to exercise async flow
    const onPurchase = jest.fn().mockResolvedValue(book);
    render(<BookCard book={book} onPurchase={onPurchase} />);

    // title
    expect(screen.getByTestId('book-title')).toHaveTextContent(book.title);
  // price formatted — normalize non-breaking space differences across environments
  const expectedPrice = formatCurrency(book.price).replace(/\u00A0/g, ' ');
  expect(screen.getByTestId('book-price')).toHaveTextContent(expectedPrice);

    const btn = screen.getByTestId('book-buy-button');
    fireEvent.click(btn);
    // wait for the async handler to be called and state updates to settle
    await waitFor(() => expect(onPurchase).toHaveBeenCalledWith(book));
  });
});
