import React, { useState, useEffect } from 'react';
import './App.css';
import 'fontsource-roboto';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { List } from './objects/List';
import Fire from './fire'
import CardList from './components/CardList'
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    addButton:{
      height: '6em',
      width: '6em'
    }
  }),
);
function App() {
  const classes = useStyles();
  const [lists, setLists] = useState(Array<List>())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let firebase = new Fire((error: any) => {
      if (error) {
        return alert("Une erreur est survenue lors de la connexion à la base de données");
      }

      firebase.getLists((lists: List[]) => {
        setLists(lists);
        setLoading(false);
      });

      return function unsubscribe() {
        firebase.detach();
      }
    })
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <h1>Application Todo</h1>
        </Toolbar>
      </AppBar>
      <header>
      </header>
      <body>
        <div className="flexContainer">
          {loading ?
            <CircularProgress /> :
            lists.map((list, i) => {
              console.log(list);
              return (
                <CardList list={list} />
              );
            })}
        </div>
        <div className="goBottomRight">
          <Tooltip title="Ajouter une liste">
            <Fab className={classes.addButton} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
      </body>
    </div>
  );
}

export default App;
