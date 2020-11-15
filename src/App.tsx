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
import { makeStyles, withStyles, createStyles, useTheme, fade } from "@material-ui/core/styles";
import { Hidden, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PopupCardCreation from './components/PopupCardCreation';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { getMaxListeners } from 'process';

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
    goBottomRightFar: {
      position: 'fixed',
      right: '3em',
      bottom: '3em'
    },
    goBottomRightClose: {
      position: 'fixed',
      right: '1em',
      bottom: '1em'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: '20em',
    },
  }),
);

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [lists, setLists] = useState(Array<List>())
  const [mutableLists, setMutableLists] = useState(Array<List>())
  const [loading, setLoading] = useState(true)
  const [easterEggOpen, setEasterEggOpen] = React.useState(false);
  const [easterEggCount, setEasterEggCount] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    let firebase = new Fire((error: any) => {
      if (error) {
        return alert("Une erreur est survenue lors de la connexion à la base de données");
      }

      firebase.getLists((lists: List[]) => {
        setLists(lists);
        setMutableLists(lists)
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

  /**
  * Filtre les listes
  */
  const handleSearchKeyDown = (event: React.KeyboardEvent): any => {
    if (event.key === 'Enter') {
      if (searchValue === "") {
        setMutableLists(lists)
      } else {
        let newLists = lists.filter(list => list.Name.toLowerCase().includes(searchValue.toLowerCase()));
        setMutableLists(newLists)
      }
    }
  }

  /**
   * Met à jour la valeur de la recherche
   * @param event 
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {/* <Toolbar style={{ display: "flex", justifyContent: "space-between" }}> */}
        <Toolbar>
          <h1 onClick={handleEasterEgg}>Application Todo</h1>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Rechercher une liste..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          <p style={{ position:'fixed', right:'1em', visibility: easterEggCount > 0 ? 'visible' : 'hidden' }}>{easterEggCount + " / " + 10}</p>
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
            mutableLists.map((list, i) => {
              return (
                <CardList list={list} />
              );
            })}
        </div>
        <div className={fullScreen ? classes.goBottomRightClose : classes.goBottomRightFar}>
          <PopupCardCreation />
        </div>
      </body>
    </div>
  );
}

export default App;
