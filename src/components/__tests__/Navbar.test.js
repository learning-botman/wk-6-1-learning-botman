import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { StoreContext } from '../../store/StoreProvider';

describe('Navbar', () => {
  test('renders brand and shows cart count from context, clears search on Escape', () => {
    const storeValue = { cartCount: 3 };
    render(
      <StoreContext.Provider value={storeValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </StoreContext.Provider>
    );

    // brand link
    expect(screen.getByText(/BookStore/)).toBeInTheDocument();

    // cart count from context
    expect(screen.getByLabelText(/Cart with 3 items/)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Search books/);
    // type some text
    fireEvent.change(input, { target: { value: 'React' } });
    expect(input.value).toBe('React');

    // press Escape - should clear and focus the input
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input.value).toBe('');
    expect(document.activeElement).toBe(input);
  });
});
