// import React from "react";
// import "./Inbox.css";
// import { Container, Form, Button } from "react-bootstrap";
// import { Navbar } from "react-bootstrap";

// import { useNavigate } from "react-router-dom";
// import { AuthsliceAction } from "../../Store/Auth";
// import { useDispatch } from "react-redux";
// const InboxNavbar = () => {
//   const navigate = useNavigate();
//   const Dispatch = useDispatch();
//   let usermail = localStorage.getItem("mailid").replace(/@gmail.com/g, "");
//   const logoutHandler = () => {
//     localStorage.clear();
//     Dispatch(AuthsliceAction.Login());
//     // navigate("/login");
//   };
//   return (
//     // <div className="navbars">

//       <Navbar border="primary">
//         <Container fluid>
//           <div>
//             <img
//               className="thum-img"
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1200px-Gmail_icon_%282020%29.svg.png"
//             ></img>

//             <img
//               className="thum-img2"
//               alt="mailname"
//               src="https://jagad.id/wp-content/uploads/2021/01/gmail-1.jpg.webp"
//             ></img>
//           </div>
//           {/* <Nav>
//             <Nav.Link>Home</Nav.Link>
//           </Nav> */}
//           <div className="mailname">
//             <h4>
//               Name: <span>{usermail}</span>
//             </h4>
//           </div>

//           <Form className="d-flex pl-5" style={{ width: "600px" }}>
//             <Form.Control
//               type="text"
//               placeholder="Search"
//               className="me-7"
//               aria-label="Search"
//             />
//             <Button variant="primary">Search</Button>
//           </Form>
//         </Container>
//         <Button variant="warning" onClick={logoutHandler}>
//           LogOut
//         </Button>
//       </Navbar>
//     // </div>
//   );
// };
// export default InboxNavbar;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthsliceAction } from "../../Store/Auth";
import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import "./Inbox.css";
import { Button } from "@mui/material";
// import { ToggleButton } from "react-bootstrap";
import ToggleButtonElement from "./ToggleMenuButton";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function InboxNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [state, setState] = React.useState({
    left: false,
  });

  const navigate = useNavigate();
  const Dispatch = useDispatch();
  let usermail = localStorage.getItem("mailid").replace(/@gmail.com/g, "");
  const logoutHandler = () => {
    localStorage.clear();
    Dispatch(AuthsliceAction.Login());
    // navigate("/login");
  };

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={logoutHandler}
        >
          <LogoutIcon></LogoutIcon>
        </IconButton>

        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ToggleButtonElement></ToggleButtonElement>

          <Typography
            variant="div"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <span className="G">G</span>
            <span className="mail">mail</span>
          </Typography>

          {/* <Typography
            variant="div"
            noWrap
            component="div"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <span className="G">G</span>
          </Typography> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 2 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" } }}
            onClick={logoutHandler}
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
              <Button variant="primary">
                Logout
                <LogoutIcon />
              </Button>
            </IconButton>
          </Box>
        </Toolbar>
        {/* <ToggleButton></ToggleButton> */}
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
