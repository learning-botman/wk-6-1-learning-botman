import React from 'react';
import { render, screen } from '@testing-library/react';
import BookList from '../BookList';

describe('BookList', () => {
  test('shows empty state when no books', () => {
    render(<BookList books={[]} onPurchase={() => {}} />);
    expect(screen.getByText(/No books found/)).toBeInTheDocument();
  });

  test('renders BookCard items when books are present', () => {
    const books = [
      { id: 1, title: 'A Book', author: 'A', price: 5.0, image: '', description: '' },
    ];
    render(<BookList books={books} onPurchase={() => {}} />);
    // BookCard uses data-testid="book-title"
    expect(screen.getByTestId('book-title')).toHaveTextContent('A Book');
  });
});
