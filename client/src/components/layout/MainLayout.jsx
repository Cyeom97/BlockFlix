import { Box } from '@mui/material';
import { OutLet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <Box display='flex' minHeight='100vh'>
                <Box component='main'
                flexGrow={1}
                overflow='hidden'
                minHeight='100vh'>
                    <OutLet />

                </Box>
            </Box>
        </>
    )
}

export default MainLayout;