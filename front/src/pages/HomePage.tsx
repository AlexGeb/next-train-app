import React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { SearchStations } from '../components/SearchStations';
import { DepartureList } from '../components/DepartureList';

const styles = theme =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: '#eeeeee',
      height: '100vh',
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    paper: {
      margin: theme.spacing.unit * 2,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const HomePage = ({ classes }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          noWrap
        >
          Next TER
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <SearchStations />
        </div>
        <div className={classes.grow} />
        <IconButton color="inherit">
          <AccountCircle fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Paper className={classes.paper} elevation={1}>
      <DepartureList />
    </Paper>
  </div>
);

export default withStyles(styles)(HomePage);
