import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableComponent from './TableComponent';

// Enable fetch mocks
beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  fetch.mockClear();
});

afterAll(() => {
  delete global.fetch;
});

test('displays loading spinner initially', () => {
  fetch.mockImplementation(() => new Promise(() => {})); 

  render(<TableComponent />);
  
  const loadingSpinner = screen.getByRole('status');
  expect(loadingSpinner).toBeInTheDocument();
});

test('displays data correctly when fetch is successful', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      {
        file: 'file1',
        lines: [
          { text: 'Sample Text', number: 42, hex: '0x2a' },
        ],
      },
    ],
  });

  render(<TableComponent />);

  await waitFor(() => {
    const fileName = screen.getByText('file1');
    expect(fileName).toBeInTheDocument();

    const text = screen.getByText('Sample Text');
    expect(text).toBeInTheDocument();

    const number = screen.getByText('42');
    expect(number).toBeInTheDocument();

    const hex = screen.getByText('0x2a');
    expect(hex).toBeInTheDocument();
  });
});

test('displays error message when fetch fails', async () => {
  fetch.mockRejectedValueOnce(new Error('Fetch failed'));

  render(<TableComponent />);

  await waitFor(() => {
    const errorHeading = screen.getByText('Error');
    expect(errorHeading).toBeInTheDocument();

    const errorMessage = screen.getByText('Fetch failed');
    expect(errorMessage).toBeInTheDocument();

    const suggestionMessage = screen.getByText(/Please check your server or try again later./i);
    expect(suggestionMessage).toBeInTheDocument();
  });
});