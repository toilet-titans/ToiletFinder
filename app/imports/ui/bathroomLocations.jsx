import { useMemo, React } from 'react';
import { MantineReactTable } from 'mantine-react-table';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        filterFn: 'equals',
        mantineFilterSelectProps: {
          data: ['Male', 'Female', 'Other'],
        },
        filterVariant: 'select',
      },
      {
        accessorKey: 'age',
        header: 'Age',
        filterVariant: 'range',
      },
    ],
    [],
  );

  return (
    <MantineReactTable
      columns={columns}
      data={data}
      columnFilterDisplayMode="popover"
    />
  );
};

export default Example;