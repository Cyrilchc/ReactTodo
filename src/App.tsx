import React, { useState, useEffect } from 'react';
import './App.css';
import 'fontsource-roboto';
import { List } from './objects/List';
import Fire from './fire'
import CardList from './components/CardList'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, useTheme, fade, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Theme, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PopupCardCreation from './components/PopupCardCreation';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import easter from './images/easterEgg.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },

      userSelect: 'none',
      cursor: 'pointer'
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
    goRightEaster: {
      position: 'fixed',
      right: '1em',
      color: 'white'
    },
    goBottomLeftEaster: {
      position: 'fixed',
      left: '1em',
      bottom: '3em',
      color: 'black'
    },
    goRightTheme: {
      position: 'fixed',
      right: '3em',
    },
    goBottomLeftTheme: {
      position: 'fixed',
      left: '0',
      bottom: '0',
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
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 'auto',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

function App() {
  const classes = useStyles();
  const [prefersDarkMode, setThemeMode] = React.useState(true);
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'light' : 'dark',
        },
      }),
    [prefersDarkMode],
  );

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
   * Met à jour la valeur de la recherche
   * @param event 
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    let newLists = lists.filter(list => list.Name.toLowerCase().includes(event.target.value.toLowerCase()));
    setMutableLists(newLists)
  }

  /**
   * Gère le changement de thème
   */
  const handleChangeTheme = () => {
    setThemeMode(!prefersDarkMode)
  }

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Mais que se passe-t-il si je clique là dessus ?">
            <Typography onClick={handleEasterEgg} className={classes.title} variant="h5">Application Todo</Typography>
          </Tooltip>
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
            />
          </div>
          <Typography style={{ visibility: easterEggCount > 0 ? 'visible' : 'hidden' }} className={fullScreen ? classes.goBottomLeftEaster : classes.goRightEaster} variant="body1">{easterEggCount + " / " + 10}</Typography>
          <Tooltip title="Activer le thème clair / sombre" className={fullScreen ? classes.goBottomLeftTheme : classes.goRightTheme}>
            <IconButton aria-label="theming" onClick={handleChangeTheme}>
              <Brightness4Icon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <header>
      </header>
      <body>
        <Dialog
          open={easterEggOpen}
          onClose={handleEasterEggClose}
        >
          <img alt="easterEgg" src={easter} 
            onClick={() => window.open("https://knowyourmeme.com/memes/do-you-think-this-is-a-game", "_blank")}
            style={{ cursor: 'pointer' }}
          />
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
    </ThemeProvider>
  );
}

export default App;
