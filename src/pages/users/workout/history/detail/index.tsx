import Box from '@mui/material/Box';

import { Seo, WorkoutDetailContainer } from '../../../../../components';
import { Container } from '@mui/material';

const Page = () => {
    return (
        <>
            <Seo title="Detalle Rutina" /> 
            <Box
                component="main" 
            >
                <Container maxWidth="xl" >
                    <WorkoutDetailContainer />
                </Container>
            </Box>
        </>
    );
};

export default Page;
