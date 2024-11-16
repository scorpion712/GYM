import { Autocomplete, Box, Chip, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { GetAllUsersResponse, UserCustomer, WorkoutPlanFormValues } from "../../models";
import { mockedUsers, userService } from "../../services";
import { useAsync, useService } from "../../hooks";
import { adaptGetAllCustomersToCustomers } from "../../adapters";
import { useFormikContext } from "formik";

export const CustomerWorkoutAssignment = () => {

    const [users, setUsers] = useState<UserCustomer[]>(mockedUsers);
    const [selectedUsers, setSelectedUsers] = useState<UserCustomer[]>(mockedUsers);
    const { loading, callEndpoint } = useService<GetAllUsersResponse>();

    const { setFieldValue } = useFormikContext<WorkoutPlanFormValues>();

    const fetchUsers = async () => await callEndpoint(await userService.getAll());

    const handleFetchUsersResponse = (data: GetAllUsersResponse) => {
        setUsers(adaptGetAllCustomersToCustomers(data));
    }

    useAsync(fetchUsers, handleFetchUsersResponse);

    const handleCustomerSelect = (value: string | null) => {
        if (!value) return;

        // Find the user object that matches the selected name
        const selectedUser = users.find(user => `${user.firstName} ${user.lastName}` === value);

        if (!selectedUser) return;

        if (selectedUsers.find(user => user.id === selectedUser.id)) return;

        setSelectedUsers([...selectedUsers, selectedUser]);
        setFieldValue("customersId", [...selectedUsers, selectedUser].map(user => user.id));
    }

    const handleCustomerRemove = (value: string | null) => {
        if (!value) return;

        setSelectedUsers(selectedUsers.filter(user => user.id !== value));
        setFieldValue("customersId", selectedUsers.filter(user => user.id !== value));
    }

    if (loading)
        return (
            <Box>
                <LinearProgress sx={{ mt: 5 }} />
            </Box>
        );

    return (
        <Stack spacing={2} mb={3}>
            <Typography variant="h5" gutterBottom>
                Asignar a cliente
            </Typography>
            <Autocomplete
                disablePortal
                options={users.map(user => `${user.firstName} ${user.lastName}`)}
                sx={{ width: 500, mb: 3 }}
                renderInput={(params) => <TextField {...params} label="Clientes" />}
                onChange={(_e, value) => handleCustomerSelect(value)}
            />
            <Stack direction={'row'} spacing={2} >
                {
                    selectedUsers.map((user, index) => {
                        return (
                            <Chip
                                key={index}
                                color="primary"
                                label={`${user.firstName} ${user.lastName}`}
                                onDelete={() => handleCustomerRemove(user.id)}
                            />
                        )
                    })
                }
            </Stack>
        </Stack>
    );
}