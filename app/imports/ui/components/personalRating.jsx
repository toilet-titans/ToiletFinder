import React, { useMemo } from 'react';
import { MantineReactTable } from 'mantine-react-table';
import { personalData } from './Data';

const Rating = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'Gender',
        header: 'Gender',
        filterFn: 'equals',
        mantineFilterSelectProps: {
          data: ['Male', 'Female'],
        },
        filterVariant: 'select',
      },
      {
        accessorKey: 'Building',
        header: 'Building Name',
      },
      {
        accessorKey: 'Floor',
        header: 'Floor',
      },
      {
        accessorKey: 'BathroomNumber',
        header: 'Bathroom Number',
      },
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
