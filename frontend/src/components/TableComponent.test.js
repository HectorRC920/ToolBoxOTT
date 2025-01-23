import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import TableComponent from './TableComponent';
import useFetchFileList from '../hooks/useFetchFileList.js';
import useFetchData from '../hooks/useFetchData.js';
import '@testing-library/jest-dom';

jest.mock('../hooks/useFetchFileList');
jest.mock('../hooks/useFetchData');

describe('TableComponent', () => {
  test('displays data correctly when fetch is successful', async () => {
    useFetchFileList.mockReturnValue({ data: ['file1'] });
    useFetchData.mockReturnValue({
      data: [
        {
          file: 'file1',
          lines: [{ text: 'Sample Text', number: 42, hex: '0x2a' }],
        },
      ],
      loading: false,
      error: null,
    });

    render(<TableComponent />);

    const dropdown = screen.getByLabelText('Select a File:');
    fireEvent.change(dropdown, { target: { value: 'file1' } });

    await waitFor(() => {
      // Query only within the table for "file1"
      const table = screen.getByRole('table');
      expect(within(table).getByText('file1')).toBeInTheDocument();
      expect(within(table).getByText('Sample Text')).toBeInTheDocument();
      expect(within(table).getByText('42')).toBeInTheDocument();
      expect(within(table).getByText('0x2a')).toBeInTheDocument();
    });
  });
});
