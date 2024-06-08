import Login from "../components/Login/Login";
import { Box } from '@mui/material';

const LoginPage = () => {
    return(
        <>
        <Box display="flex" alignItems="center" justifyContent="center" minHeight="90vh">
            <Login/>
        </Box>
        </>
        
    );
}
export default LoginPage;