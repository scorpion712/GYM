import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, LinearProgress, Stack, SvgIcon, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import BadgeIcon from '@mui/icons-material/Badge';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PaidIcon from '@mui/icons-material/Paid';
import NoteIcon from '@mui/icons-material/Note';
import ElderlyIcon from '@mui/icons-material/Elderly';

import { useAsync, useService } from "../../hooks";
import { GetUserResponse, UserCustomer } from "../../models";
import { mockedUsers, userService } from "../../services";
import { adaptGetCustomerToCustomer } from "../../adapters";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const UserDetail = (props: { id: string }) => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { id } = props;
    const mockedUser = mockedUsers[0];
    const [user, setUser] = useState<UserCustomer | null>(mockedUser);

    const { loading, callEndpoint } = useService<GetUserResponse>();

    const fetchUser = async () => await callEndpoint(await userService.getUser(id));

    const handleFetchUserResponse = (data: GetUserResponse) => {
        //setUser(adaptGetCustomerToCustomer(data));
        // TO DO: uncomment
    }

    useAsync(fetchUser, handleFetchUserResponse);

    if (loading)
        return (
            <Box>
                <LinearProgress sx={{ mt: 5 }} />
            </Box>
        );

    if (!user) return null;

    return (
        <Stack spacing={1}>
            {user.dni && <Stack direction="row" spacing={2} display={'flex'} alignItems="center">
                <SvgIcon>
                    <BadgeIcon color="secondary"/>
                </SvgIcon>
                <Typography variant="h6" >
                    DNI: <span style={{fontWeight:"normal"}}>{user.dni}</span>
                </Typography>
            </Stack>}

            {user.phone && <Stack direction="row" spacing={2} display={'flex'} alignItems="center">
                <SvgIcon>
                    <ContactPhoneIcon color="secondary" />
                </SvgIcon>
                <Typography variant="h6" >
                    {user.phone}
                </Typography>
            </Stack>}

            {user.email && <Stack direction="row" spacing={2} display={'flex'} alignItems="center">
                <SvgIcon>
                    <ContactMailIcon color="secondary"/>
                </SvgIcon>
                <Typography variant="h6" >
                    {user.email}
                </Typography>
            </Stack>}

            {user.age && <Stack direction="row" spacing={2} display={'flex'} alignItems="center">
                <SvgIcon>
                    <ElderlyIcon color="secondary"/>
                </SvgIcon>
                <Typography variant="h6" >
                    Edad: <span style={{fontWeight:"normal"}}>{user.age}</span>
                </Typography>
            </Stack>}

            {user.lastPaidDate && <Stack direction="row" spacing={2} display={'flex'} alignItems="center">
                <SvgIcon>
                    <PaidIcon color="secondary"/>
                </SvgIcon>
                <Typography variant="h6" >
                    Último pago:  <span style={{fontWeight:"normal"}}>{format(user.lastPaidDate, "dd MMMM yyyy", { locale: es })}</span>
                </Typography>
            </Stack>}

            {user.considerations && <Stack direction="row" spacing={2} display={'flex'} alignItems="center">
                <SvgIcon>
                    <NoteIcon color="secondary"/>
                </SvgIcon>
                <Typography variant="h6" >
                    Consideraciones: <span style={{fontWeight:"normal"}}>{user.considerations}</span>
                </Typography>
            </Stack>}

            <Stack display="flex" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h6" gutterBottom align="center">Días por semana:</Typography>
                <FormControl component="fieldset">
                    <FormGroup row >
                        <FormControlLabel
                            control={<Checkbox />}
                            label={isSmallScreen ? "L" : "Lunes"}
                            labelPlacement="top"
                            checked={user.daysPerWeek[0] ?? true}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label={isSmallScreen ? "M" : "Martes"}
                            labelPlacement="top"
                            checked={user.daysPerWeek[1] ?? true}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label={isSmallScreen ? "M" : "Miércoles"}
                            labelPlacement="top"
                            checked={user.daysPerWeek[2] ?? true}
                        />
                        <FormControlLabel
                            control={<Checkbox />}
                            label={isSmallScreen ? "J" : "Jueves"}
                            labelPlacement="top"
                            checked={user.daysPerWeek[3] ?? true}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={user?.daysPerWeek[4]} value={"true"} />}
                            label={isSmallScreen ? "V" : "Viernes"}
                            labelPlacement="top"
                            checked={user.daysPerWeek[4] ?? true}
                        />
                    </FormGroup>
                </FormControl>
            </Stack>
        </Stack>
    );
}