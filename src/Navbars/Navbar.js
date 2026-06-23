import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import main_logo from "../../src/Images/Navbars/HI_logo.png";
// import MyProfile from "../../src/Images/Navbars/MyProfile.png";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import {
  Avatar,
  Button,
  Card,
  Grid,
  InputAdornment,
  InputBase,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../UseContext/UserContext";

import Home from "../../src/Images/Navbars/Home.png";
import History from "../../src/Images/Navbars/history_icon2.png";

const drawerWidth = 220;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  ///marginLeft: drawer == "miniopen" ? `${drawerWidth}` : "0px", // whichever your mini-drawer width
  transition: theme.transitions.create(["margin"], {
    duration: theme.transitions.duration.standard,
  }),
}));

export default function Navbar({ children }) {
  const [selectedNav, setSelectedNav] = React.useState(
    sessionStorage.getItem("selectnav1"),
  );

  const [menuItems, setMenuItems] = React.useState([
    {
      text: "Home",
      activeicon: Home,
      path: "Home",
      id: 1,
    },
    {
      text: "History",
      activeicon: History,
      path: "History",
      id: 2,
    },
  ]);
  const [heading, setHeading] = React.useState(
    sessionStorage.getItem("selectnav1") == null
      ? "Dashboard"
      : sessionStorage.getItem("selectnav1"),
  );

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  // const { drawer, setDrawer } = React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const location = useLocation();
  // const {
  //   activeTab,
  //   setActiveTab,
  //   activeStep,
  //   setActiveStep,
  //   modal,
  //   setModal,
  //   modalTittle,
  //   setModalTittle,
  //   modalDesc,
  //   setModalDesc,
  //   modalNavigate,
  //   setModalNavigate,
  // } = React.useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const bellOpen = Boolean(anchorEl);
  const id = bellOpen ? "simple-popover" : undefined;

  const profileOpen = Boolean(anchorEl2);
  const id2 = profileOpen ? "simple-popover" : undefined;

  const chatbotOPen = Boolean(anchorEl3);
  const id3 = chatbotOPen ? "simple-popover" : undefined;

  const navigate = useNavigate();

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  React.useEffect(() => {
    if (sessionStorage.getItem("user_id") == null) {
      navigate("/");
    }
  }, []);

  // React.useEffect(() => {
  //   sessionStorage.setItem("activeStep", activeStep);
  // }, [activeStep]);

  const access = JSON.parse(localStorage.getItem("access"));

  const INACTIVITY_TIME = 2 * 60 * 60 * 1000; // 2 hours

  // const INACTIVITY_TIME = 1 * 60 * 1000; // 1 minute

  React.useEffect(() => {
    let timer;

    const logout = () => {
      sessionStorage.clear();
      localStorage.clear();
      navigate("/");
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, INACTIVITY_TIME);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        // open={open}
        sx={{
          backgroundColor: "#f8f8f8",
          boxShadow: "none",
          height: "8vh",
        }}
      >
        <Grid>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='100%'
            sx={{ mt: "2px" }}
          >
            <Grid sx={{ paddingLeft: 15 }}></Grid>

            <Grid
              sx={{ paddingRight: 5, display: "flex", alignItems: "center" }}
            >
              <IconButton onClick={handleClick2}>
                <PersonOutlineOutlinedIcon sx={{ color: "black" }} />
              </IconButton>
              <Grid>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontFamily: "Poppins, sans-serif",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                  onClick={handleClick2}
                >
                  {" "}
                  {sessionStorage.getItem("name")}
                </Typography>
                {/* <Typography
                  sx={{
                    fontSize: "8px",
                    fontFamily: "Poppins, sans-serif",
                    color: "white",
                  }}
                >
                  {" "}
                  {sessionStorage.getItem("role")}
                </Typography> */}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </AppBar>
      <Drawer
        variant='permanent'
        open={open}
        sx={{
          // width: drawer == "miniopen" ? drawerWidth : 60, // 👈 IMPORTANT
          width: 100,
          transition: "width 0.3s",
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            // width: drawer == "miniopen" ? drawerWidth : 60, // 👈 IMPORTANT
            width: 100,
            transition: "width 0.3s",
            overflowX: "hidden",
            boxSizing: "border-box",
            border: "none",
            background: "#1F2933",
          },
        }}
      >
        {/* <DrawerHeader></DrawerHeader> */}
        <Grid sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <img
            src={main_logo}
            alt='icon'
            style={{
              height: 60,
              objectFit: "contain",
            }}
          />
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Grid sx={{ p: "3px" }}>
            {menuItems.map((item) => {
              const selected = selectedNav === item.text;

              return (
                <Grid
                  onClick={() => {
                    setSelectedNav(item.text);
                    sessionStorage.setItem("selectnav1", item.text);
                    navigate(`/${item.path}`);
                    // if (item.text == "Home") {
                    //   setActiveTab("Inward Entry");
                    // }
                  }}
                  sx={{
                    mb: 1,
                    borderRadius: "3px",
                    px: "8px",
                    py: "10px",
                    background: selected ? "#1B314E" : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 70, // total width control
                    }}
                  >
                    {/* ICON BOX */}
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: selected ? "#4500E2" : "#4C545C",
                        borderRadius: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexShrink: 0, // icon size fixed
                      }}
                    >
                      <Box
                        component='img'
                        src={item.activeicon}
                        sx={{
                          width: 20,
                          height: 20,
                          opacity: selected ? 1 : 0.8,
                        }}
                      />
                    </Box>

                    {/* TEXT */}
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "0.6rem",
                        fontFamily: "Poppins, sans-serif",
                        mt: 0.8,
                        textAlign: "center",
                        wordBreak: "break-word", // long text wrap
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Drawer>
      <Main
        open={open}
        sx={{
          pl: 3,
          bgcolor: "#fafafa",
          height: "100vh",
          overflow: "auto",
          paddingTop: "10vh",
        }}
      >
        {/* <DrawerHeader /> */}
        {children}
      </Main>

      <div>
        <Popover
          id={id}
          open={bellOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 5, // rounded corners
                mt: 1, // small margin from icon
              },
            },
          }}
        >
          <Card
            sx={{
              width: 420,
              borderRadius: 5,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                bgcolor: "#f7faff",
                paddingLeft: 2,
                paddingRight: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Notifications
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.7rem",
                  color: "#144FEE",
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": { textDecoration: "underline" },
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Mark all as read
              </Typography>
            </Box>

            {/* Notification list */}

            {/* <TableContainer>
              <Table>
                <TableBody>
                  {notifications.map((item, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f5f7ff" },
                      }}
                    >
                      <TableCell
                        sx={{ width: "70%", borderBottom: "1px solid #eee" }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            lineHeight: 1.3,
                          }}
                        >
                          <span
                            style={{ fontWeight: 600, fontSize: "0.75rem" }}
                          >
                            {item.title}
                          </span>
                          <span
                            style={{
                              fontWeight: 400,
                              fontSize: "0.65rem",
                              color: "#666",
                              marginLeft: 4,
                            }}
                          >
                            {item.desc}
                          </span>
                        </Typography>
                      </TableCell>

                      <TableCell
                        align='right'
                        sx={{
                          width: "30%",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "0.7rem",
                          color: "#999",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        {item.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}

            {/* <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  cursor: "pointer",
                  color: "#144FEE",
                  fontFamily: "Poppins, sans-serif",

                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                View all notifications
              </Typography>
            </Box> */}
          </Card>
        </Popover>
      </div>

      <div>
        <Popover
          id={id2}
          open={profileOpen}
          anchorEl={anchorEl2}
          onClose={handleClose2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 5, // rounded corners
                mt: 1, // small margin from icon
              },
            },
          }}
        >
          {/* <Button
            variant='contained'
            sx={{
              textTransform: "none",
              borderRadius: 2,
              bgcolor: "#144FEE",
              color: "white",
              boxShadow: "none",
              "&:hover": { bgcolor: "#144FEE", boxShadow: "none" },
            }}
            onClick={() => {
              navigate("/");
              sessionStorage.clear();
            }}
          >
            ↪ Sign out
          </Button> */}
          <Card
            sx={{
              width: 420,
              borderRadius: 5,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
              overflow: "hidden",
              padding: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 500,
                mb: 1,
                textAlign: "center",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {sessionStorage.getItem("role")}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 1,
                mb: 2,
              }}
            >
              <Avatar sx={{ width: 56, height: 56, bgcolor: "purple" }}>
                {sessionStorage.getItem("role")?.[0]?.toUpperCase()}
              </Avatar>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  mt: 1,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Hi, {sessionStorage.getItem("user_name")} !
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                variant='contained'
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  bgcolor: "#144FEE",
                  color: "white",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#144FEE", boxShadow: "none" },
                }}
                onClick={() => {
                  navigate("/");
                  sessionStorage.clear();
                }}
              >
                ↪ Sign out
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "gray",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Privacy Policy · Terms of Service
              </Typography>
            </Box>
          </Card>
        </Popover>
      </div>
    </Box>
  );
}
