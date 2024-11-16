import { Autocomplete, Box, Chip, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";

import { GetAllUsersResponse, WorkoutPlanFormValues } from "../../models";
import { userService } from "../../services";
import { useAsync, useService } from "../../hooks";
import { adaptGetAllCustomersToCustomersSelector } from "../../adapters";

type Customer = { id: string, name: string };

interface CustomerWorkoutAssignmentProps {
    selectedUsers: Customer[];
}

export const CustomerWorkoutAssignment = (props: CustomerWorkoutAssignmentProps) => {

    const { setFieldValue } = useFormikContext<WorkoutPlanFormValues>();

    const { selectedUsers: selectedUsersProp } = props;

    const [users, setUsers] = useState<Customer[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<Customer[]>(selectedUsersProp);
    const { loading, callEndpoint } = useService<GetAllUsersResponse>();


    const fetchUsers = async () => await callEndpoint(await userService.getAll());

    const handleFetchUsersResponse = (data: GetAllUsersResponse) => {
        setUsers(adaptGetAllCustomersToCustomersSelector(data));
    }

    useAsync(fetchUsers, handleFetchUsersResponse);

    const handleCustomerSelect = (value: string | null) => {
        if (!value) return;

        // Find the user object that matches the selected name
        const selectedUser = users.find(user => user.name === value);

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

    useEffect(() => {
        setSelectedUsers(selectedUsersProp);
    }, [selectedUsersProp]);

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
                options={users.map(user => user.name)}
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
                                label={user.name}
                                onDelete={() => handleCustomerRemove(user.id)}
                            />
                        )
                    })
                }
            </Stack>
        </Stack>
    );
}