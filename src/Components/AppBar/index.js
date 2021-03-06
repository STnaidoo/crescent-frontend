import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import MUIMenuItem from 'material-ui/Menu/MenuItem';
import List, { ListItemIcon, ListItemText } from 'material-ui/List';

import HomeIcon from 'material-ui-icons/Home';
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew';
import AddIcon from 'material-ui-icons/Add';
import ListIcon from 'material-ui-icons/ViewList';
import CourseIcon from 'material-ui-icons/ChromeReaderMode';
import ModuleIcon from 'material-ui-icons/Assignment';
import AttachIcon from 'material-ui-icons/Attachment';
import UserIcon from 'material-ui-icons/People';
import ClientIcon from 'material-ui-icons/Person';
import TestIcon from 'material-ui-icons/Create';
import QuestionIcon from 'material-ui-icons/QuestionAnswer';
import PolicyIcon from 'material-ui-icons/Gavel';

import UserActions from '../../Actions/UserActions';
import ExpandableMenu from '../../Components/ExpandableMenu';
import Logo from '../../Images/LogoBackground.png';
import MenuItem from './styles';
import history from '../../Helpers/History';
import ROUTES from '../../Routers/Routes';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.accent[1000],
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.primary[500],
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  paperColor: {
    color: theme.palette.background.paper,
  },
  paperBackground: {
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const CourseDetails = {
  listName: 'Course',
  listIcon: <CourseIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Course',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Course List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

const ModuleDetails = {
  listName: 'Module',
  listIcon: <ModuleIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Module',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Module List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
    {
      key: 2,
      subItemName: 'Module Material',
      subItemIcon: <AttachIcon />,
      subItemExtension: 'material/create',
    },
  ],
};

const PolicyDetails = {
  listName: 'Policy',
  listIcon: <PolicyIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Policy',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Policy List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
    {
      key: 2,
      subItemName: 'Upload Policy Material',
      subItemIcon: <AddIcon />,
      subItemExtension: 'material/create',
    },
    {
      key: 3,
      subItemName: 'Assign Acknowledgement',
      subItemIcon: <AddIcon />,
      subItemExtension: 'acknowledgement/create',
    },
    {
      key: 4,
      subItemName: 'View Outstanding Acknowledgements',
      subItemIcon: <ListIcon />,
      subItemExtension: 'acknowledgement/list',
    },
  ],
};

const TestDetails = {
  listName: 'Assessment',
  listIcon: <TestIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Assessment',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Assessment List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

const QuestionDetails = {
  listName: 'Question',
  listIcon: <QuestionIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Question',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Question List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

const UserDetails = {
  listName: 'User',
  listIcon: <UserIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create User',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'User List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
    {
      key: 2,
      subItemName: 'Enrol',
      subItemIcon: <AttachIcon />,
      subItemExtension: 'enrol',
    },
    {
      key: 3,
      subItemName: 'Enrol All Courses',
      subItemIcon: <AttachIcon />,
      subItemExtension: 'enrol/all',
    },
    {
      key: 4,
      subItemName: 'Enrolment List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'enrol/list',
    },
  ],
};

const ClientDetails = {
  listName: 'Client',
  listIcon: <ClientIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Create Client',
      subItemIcon: <AddIcon />,
      subItemExtension: 'create',
    },
    {
      key: 1,
      subItemName: 'Client List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
    {
      key: 2,
      subItemName: 'Subscribe Course',
      subItemIcon: <AttachIcon />,
      subItemExtension: 'subscription/create',
    },
    {
      key: 3,
      subItemName: 'Subscribe All Courses',
      subItemIcon: <AttachIcon />,
      subItemExtension: 'subscription/create/all',
    },
  ],
};

const ClientDetails1 = {
  listName: 'Client',
  listIcon: <ClientIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'Subscribe',
      subItemIcon: <AttachIcon />,
      subItemExtension: 'subscription/create',
    },
    {
      key: 1,
      subItemName: 'Subscription List',
      subItemIcon: <ListIcon />,
      subItemExtension: 'subscription/list',
    },
  ],
};

const ClientCourseDetails = {
  listName: 'Courses',
  listIcon: <CourseIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'View My Courses',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

const ClientPolicyDetails = {
  listName: 'Policies',
  listIcon: <PolicyIcon />,
  subItems: [
    {
      key: 0,
      subItemName: 'View My Policies',
      subItemIcon: <ListIcon />,
      subItemExtension: 'list',
    },
  ],
};

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  state = {
    open: true,
  };

  handleLogout() {
    this.props.dispatch(UserActions.logout);
    history.push(ROUTES.LOGIN);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes, theme, children, role,
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift,
          )}
        >
          <Toolbar
            disableGutters={!this.state.open}
            className="justify-content"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.hide,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              <i>“Unless you try to do something beyond what you have already mastered, you will never grow.”</i> ― <b>Ronald E. Osborn</b>
            </Typography>
            <MenuItem onClick={this.handleLogout}>
              <ListItemIcon>
                <PowerSettingsNew />
              </ListItemIcon>
            </MenuItem>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose,
            ),
          }}
          open={this.state.open}
        >
          <div className={classes.paperBackground}>
            <div className={classes.toolbar}>
              <Link to={role !== 'Regular' ? '/admin/home' : '/home'}>
                <img
                  width="34px"
                  src={Logo}
                  alt="Crescent"
                  className="drawerLogo"
                />
              </Link>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
          </div>
          <Divider />
          {role === 'Admin' && (
            <List>
              <Link to="/admin/home">
                <MUIMenuItem>
                  <ListItemIcon>
                    <HomeIcon className={classes.paperColor} />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    className={classes.paperColor}
                    disableTypography
                    primary="Home"
                  />
                </MUIMenuItem>
              </Link>
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={CourseDetails}
              />
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={ModuleDetails}
              />
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={TestDetails}
              />
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={QuestionDetails}
              />
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={PolicyDetails}
              />
              {role === 'Admin' && (
                <ExpandableMenu
                  color={theme.palette.accent[500]}
                  details={ClientDetails}
                />
              )}
              {role === 'Client' && (
                <ExpandableMenu
                  color={theme.palette.accent[500]}
                  details={ClientDetails1}
                />
              )}
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={UserDetails}
              />
            </List>
          )}
          {role === 'Client' && (
            <List>
              {this.state.open && (
                <Typography className="user-type" type="subheading">
                  Client View
                </Typography>
              )}
              <Link to="/admin/home">
                <MUIMenuItem>
                  <ListItemIcon>
                    <HomeIcon className={classes.paperColor} />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    className={classes.paperColor}
                    disableTypography
                    primary="Home"
                  />
                </MUIMenuItem>
              </Link>
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={CourseDetails}
              />
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={ModuleDetails}
              />
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={TestDetails}
              />
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={QuestionDetails}
              />
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={PolicyDetails}
              />
              {role === 'Admin' && (
                <ExpandableMenu
                  color={theme.palette.accent[500]}
                  details={ClientDetails}
                />
              )}
              {role === 'Client' && (
                <ExpandableMenu
                  color={theme.palette.accent[500]}
                  details={ClientDetails1}
                />
              )}
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={UserDetails}
              />
            </List>
          )}
          {role === 'Regular' && (
            <List>
              {this.state.open && (
                <Typography className="user-type" type="subheading">
                  User View
                </Typography>
              )}
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={ClientCourseDetails}
              />
              <ExpandableMenu
                color={theme.palette.accent[500]}
                details={ClientPolicyDetails}
              />
            </List>
          )}
          {/* <List>
            <ExpandableMenu
              color={theme.palette.accent[500]}
              details={ClientModuleDetails}
            />
          </List> */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(null, mapDispatchToProps);

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.object,
  dispatch: PropTypes.func,
  role: PropTypes.string,
};

export default withConnect(withStyles(styles, { withTheme: true })(MiniDrawer));
