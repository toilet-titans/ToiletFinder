import React, { useMemo } from 'react';
import { MantineReactTable } from 'mantine-react-table';
import { personalData } from './Data';

const Rating = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'Rating',
        header: 'Rating',
        filterVariant: 'range',
      },
      {
        accessorKey: 'Comment',
        header: 'Comment',
        enableColumnFilterModes: false,
      },
    ],
    [],
  );
  return (
    <MantineReactTable
      columns={columns}
      data={personalData}
      initialState={{ showColumnFilters: true, enableRowSelection: true }}
    />
  );
};

export default Rating;
