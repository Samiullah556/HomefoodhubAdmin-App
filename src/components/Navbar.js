import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Person from "@material-ui/icons/Person";
import Fastfood from "@material-ui/icons/Fastfood";
import Receipt from "@material-ui/icons/Receipt";
import VpnKey from "@material-ui/icons/VpnKey";
import People from "@material-ui/icons/People";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { logoutUser } from "../redux/actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Navbar = ({ logoutUser }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }} className={classes.root}>
      <CssBaseline />
      <AppBar
        color="primary"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Link className="text-white text-decoration-none" to="/">
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Link>
          <Button
            variant="contained"
            color="default"
            className="ml-auto"
            startIcon={<ExitToApp />}
            onClick={() => logoutUser()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}></div>
        <Divider />
        <List>
          <Link className="text-decoration-none text-secondary" to="/chef">
            <ListItem button>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Chefs" />
            </ListItem>
          </Link>

          <Link className="text-decoration-none text-secondary" to="/dish">
            <ListItem button>
              <ListItemIcon>
                <Fastfood />
              </ListItemIcon>
              <ListItemText primary="Dishes" />
            </ListItem>
          </Link>

          <Link className="text-decoration-none text-secondary" to="/customer">
            <ListItem button>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
          </Link>

          <Link className="text-decoration-none text-secondary" to="/orders">
            <ListItem button>
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </Link>
          <Link className="text-decoration-none text-secondary" to="/coupons">
            <ListItem button>
              <ListItemIcon>
                <LocalOfferIcon />
              </ListItemIcon>
              <ListItemText primary="Coupons" />
            </ListItem>
          </Link>
          <Link
            className="text-decoration-none text-secondary"
            to="/changepassword"
          >
            <ListItem button>
              <ListItemIcon>
                <VpnKey />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logoutUser })(Navbar);
