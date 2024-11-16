import Box from '@mui/material/Box';

import { Seo, UserWorkoutContainer } from '../../../components';
import { Container } from '@mui/material';

const Page = () => {
    return (
        <>
            <Seo title="Rutina Usuario" />
            <Box
                component="main" 
            >
                <Container maxWidth="xl" >
                    <UserWorkoutContainer />
                </Container>
            </Box>
        </>
    );
};

export default Page;
