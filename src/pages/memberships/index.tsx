import { Box, Container } from "@mui/material";
import { MembershipsPageContainer, Seo } from "../../components";

const Page = () => {
    return (
        <>
            <Seo title="Membresías" />
            <Box
                component="main" 
            >
                <Container maxWidth="xl" >
                    <MembershipsPageContainer />
                </Container>
            </Box>
        </>
    );
};

export default Page;