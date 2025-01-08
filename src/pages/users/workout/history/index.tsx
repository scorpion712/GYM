import Box from '@mui/material/Box';

import { Seo, UserWorkoutHistoryContainer } from '../../../../components';
import { Container } from '@mui/material';

const Page = () => {
    return (
        <>
            <Seo title="Histórico Rutinas Usuario" />
            <Box
                component="main" 
            >
                <Container maxWidth="xl" >
                    <UserWorkoutHistoryContainer />
                </Container>
            </Box>
        </>
    );
};

export default Page;
