import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import insta  from '../Assets/Instagram.JPG'
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import Avatar from '@mui/material/Avatar';




export default function Navbar({userData}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory();
  const {logout} = React.useContext(AuthContext)
  
  


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleExplore = () => {
    let min = Window.open('https://www.pepcoding.com','blank')
    min.focus()
  }

  const handleBannerClick = () => {
    history.push('/')
  }
  
  const handleProfile = () => {
    history.push(`/profile/${userData.uid}`)

  }
   
  const handleLogout = async() => {
    await logout()
    history.push('/login')

  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircleIcon/>&nbsp;&nbsp; Profile</MenuItem>
      <MenuItem onClick={handleLogout}><ExitToAppIcon/>&nbsp;&nbsp; Logout </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
       <MenuItem onClick={handleProfile}><AccountCircleIcon/>&nbsp;&nbsp; Profile</MenuItem>
      <MenuItem onClick={handleLogout}><ExitToAppIcon/>&nbsp;&nbsp; Logout </MenuItem>
      
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{background:'white'}} >
        <Toolbar>
          <div style={{marginLeft:'5%'}}>
              <img src= {insta} onClick={handleBannerClick} />
            </div>
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <HomeIcon onClick={handleBannerClick} style={{display:{xs:'none',md:'flex'},color:'black',alignItems:'center',marginRight:'2rem'}}/>
              <ExploreIcon onClick={handleExplore} style={{display:{xs:'none',md:'flex'},color:'black',alignItems:'center',marginRight:'2rem'}}/>
              <Avatar 
                src={userData.userProfile}
                sx= {{height:'2rem',width:'2rem'}}
                />
             
            </IconButton>
          </Box>
         
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
