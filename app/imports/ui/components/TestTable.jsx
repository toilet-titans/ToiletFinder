import React, { useMemo } from 'react';
import { MantineReactTable } from 'mantine-react-table';
import { data } from './Data';

const SavedTables = () => {
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
        accessorKey: 'AverageRatingOfBuilding',
        header: 'Average Rating Of Building',
        filterVariant: 'range',
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      initialState={{ showColumnFilters: true, enableRowSelection: true }}
    />
  );
};

export default SavedTables;
