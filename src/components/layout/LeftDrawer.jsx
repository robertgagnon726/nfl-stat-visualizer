import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import { drawerWidth } from '../../util/config';
import { setPageView } from '../../redux/actions';

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'rgb(35, 48, 68)',
    marginTop: 65
  },
  listItem: {
    "& p": {
      fontSize: '.8rem',
      color: 'white'
    }
  },
  icon: {
    fontSize: '1.3rem',
    color: 'white'
  }
}));

const useListItemStyles = makeStyles(() => ({
  root: {
    '&.Mui-selected': {
    backgroundColor: 'rgb(30, 41, 58)'
    }
  }
}));

export default function LeftDrawer() {
  const classes = useStyles();
  const listItemClasses = useListItemStyles();
  const pageView = useSelector(state => state.view.pageView);
  const dispatch = useDispatch();

  const listItems = [
    {
      displayName: "Season Line Chart",
      icon: <TrendingUpIcon className={classes.icon} />,
      value: 'season-line-chart'
    },
    {
      displayName: "Season Bar Chart",
      icon: <BarChartIcon className={classes.icon} />,
      value: 'season-bar-chart'
    },
  ]

  /**
   * 
   * @param {String} view 
   */
  const handleNavClick = (view) => {
    if (view !== pageView) {
      dispatch(setPageView(view))
    }
  }

  return (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {listItems.map((item) => (
            <ListItem 
              classes={listItemClasses} 
              selected={item.value === pageView} 
              button key={item.value} 
              className={classes.listItem} 
              onClick={() => handleNavClick(item.value)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText secondary={item.displayName} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  )
}