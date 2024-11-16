import { Box, Container } from "@mui/material";
import { Seo, WorkoutsPageContainer } from "../../../components";

const Page = () => {
    return (
        <>
            <Seo title="Rutinas" />
            <Box
                component="main" 
            >
                <Container maxWidth="xl" >
                    <WorkoutsPageContainer />
                </Container>
            </Box>
        </>
    );
};

export default Page;