import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(() => {
  fetch.resetMocks();
});

test('renders the app with the correct header and footer', async () => {
  fetch.mockResponseOnce(JSON.stringify({ data: 'mocked data' }));

  render(<App />);
  
  // Check for the header
  const headerElement = await screen.findByText(/ToolBoxOTT Dashboard/i);
  expect(headerElement).toBeInTheDocument();

  // Check for the footer
  const footerElement = screen.getByText(/Made with ❤️ by Hector Rubio./i);
  expect(footerElement).toBeInTheDocument();
});