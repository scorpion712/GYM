import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Seo, UsersPageContainer } from '../../components';

const Page = () => {
  return (
    <>
      <Seo title="Clientes" />
      <Box
        component="main"
      >
        <Container maxWidth="xl">
          <UsersPageContainer />
        </Container>
      </Box>
    </>
  );
};

export default Page;
