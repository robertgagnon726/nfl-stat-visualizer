import { CssBaseline} from '@material-ui/core';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from './util/config';
import LeftDrawer from './components/layout/LeftDrawer';
import ViewController from './components/layout/ViewController';
import LoadingBackdrop from './components/layout/LoadingBackdrop';
import Header from "./components/layout/Header";
import ErrorDialog from './components/layout/ErrorDialog';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: "rgb(27, 38, 53)",
    padding: theme.spacing(3),
    height: "200vh",
    marginLeft: drawerWidth,
    color: "white",
    marginTop: 65
  },
}));


function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <LoadingBackdrop />
      <ErrorDialog />
      <Header />
      <LeftDrawer />
      <main className={classes.content}>
        <ViewController />
      </main>
    </React.Fragment>
  );
}

export default App;