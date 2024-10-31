import Box from '@mui/material/Box';

import { CreateUserContainer, Seo } from '../../../components';
import { Container } from '@mui/material';

const Page = () => {
    return (
        <>
            <Seo title="Crear Usuario" />
            <Box
                component="main" 
            >
                <Container maxWidth="xl" >
                    <CreateUserContainer />
                </Container>
            </Box>
        </>
    );
};

export default Page;