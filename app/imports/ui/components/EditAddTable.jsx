import React, { useMemo, useState } from 'react';
import { MRT_EditActionButtons, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Button, Flex, Stack, Text, Title, Tooltip } from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { data } from './Data';

const Example = () => {
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
        editVariant: 'select',
        mantineEditSelectProps: {
          data: data.Building,
        },
      },
    ],
    [],
  );
  // CREATE hook (post new user to api)
  function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        // send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      // client side optimistic update
      onMutate: (newUserInfo) => {
        queryClient.setQueryData(['users'], (prevUsers) => [
          ...prevUsers,
          {
            ...newUserInfo,
            id: (Math.random() + 1).toString(36).substring(7),
          },
        ]);
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }

  // READ hook (get users from api)
  function useGetUsers() {
    return useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        // send api request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve(fakeData);
      },
      refetchOnWindowFocus: false,
    });
  }

  // UPDATE hook (put user in api)
  function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (user) => {
        // send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      // client side optimistic update
      onMutate: (newUserInfo) => {
        queryClient.setQueryData(['users'], (prevUsers) =>
          prevUsers?.map((prevUser) =>
            prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
          ),
        );
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }

  // DELETE hook (delete user in api)
  function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (userId) => {
        // send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
        return Promise.resolve();
      },
      // client side optimistic update
      onMutate: (userId) => {
        queryClient.setQueryData(['users'], (prevUsers) =>prevUsers?.filter((user) => user.id !== userId));
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
  }

  // call CREATE hook
  const { mutateAsync: createUser, isLoading: isCreatingUser } =
    useCreateUser();
  // call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  // call UPDATE hook
  const { mutateAsync: updateUser, isLoading: isUpdatingUser } =
    useUpdateUser();
  // call DELETE hook
  const { mutateAsync: deleteUser, isLoading: isDeletingUser } =
    useDeleteUser();

  // CREATE action
  const handleCreateUser = async ({ values, exitCreatingMode }) => {
    await createUser(values);
    exitCreatingMode();
  };

  // UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    await updateUser(values);
    table.setEditingRow(null); // exit editing mode
  };

  // DELETE action
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: 'Are you sure you want to delete this user?',
      children: (
        <Text>
          Are you sure you want to delete {row.original.firstName}{' '}
          {row.original.lastName}? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteUser(row.original.id),
    });

  const table = useMantineReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', // default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', // default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: isLoadingUsersError
      ? {
        color: 'red',
        children: 'Error loading data',
      }
      : undefined,
    mantineTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowSave: handleCreateUser,
    onEditingRowSave: handleSaveUser,
    renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Create New User</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    ),
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Edit User</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    ),
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          table.setCreatingRow(true); // simplest way to open the create row modal with no default values
          // or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MantineReactTable table={table} />;
};


const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  // Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <ModalsProvider>
      <Example />
    </ModalsProvider>
  </QueryClientProvider>
);

export default ExampleWithProviders;
