import React from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
}));

const useAppBarStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#24292e",
    color: 'white',
    borderBottom: "1px solid white"
  }
}))

export default function Header() {
  const classes = useStyles();
  const appBarClasses = useAppBarStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" classes={appBarClasses}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            NFL Stat Visualizer
          </Typography>
          <AccountCircleIcon />
        </Toolbar>
      </AppBar>
    </div>
  );
}