import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';

jest.mock('axios', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

test('renders the multi-city search field', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByRole('heading', { name: /weather app/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/mestá na vyhľadanie/i)).toBeInTheDocument();
});
