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
import PopupCardCreation from './components/PopupCardCreation';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';

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
    addButton: {
      height: '6em',
      width: '6em'
    }
  }),
);

function App() {
  const classes = useStyles();
  const [lists, setLists] = useState(Array<List>())
  const [loading, setLoading] = useState(true)
  const [easterEggOpen, setEasterEggOpen] = React.useState(false);
  const [easterEggCount, setEasterEggCount] = React.useState(0);
  //let easterEgg = 1

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

  /**
    * Mise à jour de la value de l'Input
    */
  const handleEasterEgg = () => {
    if (easterEggCount > 8) {
      setEasterEggCount(easterEggCount + 1)
      setEasterEggOpen(true)
      setEasterEggCount(0)
    } else {
      setEasterEggCount(easterEggCount + 1)
    }
  }

  /**
   * Ferme l'easterEgg
   */
  const handleEasterEggClose = () => {
    setEasterEggOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 onClick={handleEasterEgg}>Application Todo</h1>
          <p style={{ color: 'rgb(63, 81, 220)' }}>{easterEggCount + " / " + 10}</p>
        </Toolbar>
      </AppBar>
      <header>
      </header>
      <body>
        <Dialog
          open={easterEggOpen}
          onClose={handleEasterEggClose}
        >
          <img alt="easterEgg" src={window.location.origin + '/easterEgg.jpg'} />
        </Dialog>
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
          <PopupCardCreation />
        </div>
      </body>
    </div>
  );
}

export default App;
