import Box from '@mui/material/Box';

import { CreateWorkoutPlanContainer, Seo } from '../../../components';
import { Container } from '@mui/material';

const Page = () => {
    return (
        <>
            <Seo title="Crear Plan Entrenamiento" />
            <Box
                component="main" 
            >
                <Container maxWidth="xl" >
                    <CreateWorkoutPlanContainer />
                </Container>
            </Box>
        </>
    );
};

export default Page;