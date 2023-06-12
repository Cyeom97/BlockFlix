import { useSelector, useDispatch } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkMode';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunny';
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from '@mui/material';
import { cloneElement, useState } from 'react';
import { Link } from 'react-router-dom';
import menuConfigs from '../../configs/menu.configs';
import { themeModes } from '../../configs/theme.configs';
import { setAuthModalOpen } from '../../redux/features/authModelSlice';
import { setThemeMode } from '../../redux/features/themeModeSlice';
import Logo from './Logo';


const ScrollAppBar = ({ children, window }) => {
    const { themeMode } = useSelector((state) => state.themeMode);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
        target: window ? window() : undefined
    })

    return cloneElement(children, {
        sx: {
            color: trigger ? 'text.primary' : themeMode === themeModes.dark ? 'primary.contrastText' : 'text.primary',
            backgroundColor: trigger ? 'background.paper' : themeMode === themeModes.dark ? 'transparent' : 'background.paper'
        }
    })
}
const Topbar = () => {
    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);
    const { themeMode } = useSelector((state) => state.themeMode);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();

    const onSwitchtheme = () => {
        const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark
        dispatch(setThemeMode(theme));
    }

    return (
        <>
            <ScrollAppBar>
                <AppBar elevation={0} sx={{zIndex: 9999 }}>
                    <Toolbar sx={{ alignItem: 'center', justifyContent: 'space-between' }}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <IconButton
                                color='inherit'
                                sx={{ mr: 2, display: { md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Box sx={{ display: { xs: 'inline-block', md: 'none'}}}>
                                <Logo />
                            </Box>
                        </Stack>
                        <Box flexGrow={1} alignItems='center' display={{ xs: 'none', md: 'flex'}}>
                            <Box sx={{ marginRight: '30px'}}>
                                <Logo />
                            </Box>
                            {menuConfigs.main.map((item, index) => (
                                <Button
                                    key={index}
                                    sx={{
                                        color: appState.includes(item.state) ? 'primary.contrastText' : 'inherit', 
                                        mr: 2
                                    }}
                                    component={Link}
                                    to={item.path}
                                    variant={appState.includes(item.state) ? 'contained' : 'text'}
                                >
                                    {item.display}
                                </Button>
                            ))}
                            <IconButton
                             sx={{ color:'inherit'}}
                             onClick={onSwitchtheme}
                            >
                                {themeMode === themeModes.dark && <DarkModeOutlinedIcon/>}
                                {themeMode === themeModes.light && <WbSunnyOutlinedIcon/>}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </ScrollAppBar>
        </>
    );
    }

export default Topbar;