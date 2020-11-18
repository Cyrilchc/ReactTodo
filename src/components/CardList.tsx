import React from 'react';
import { List } from '../objects/List';
import { Todo } from '../objects/Todo';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardActions from '@material-ui/core/CardActions';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import { CardContent, CardHeader, Collapse, GridList, GridListTile, Theme, } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import PopupCardCreationTodo from './PopupCardCreationTodo'
import PopupCardEditTodo from './PopupCardEditTodo'
import PopupCardEditList from './PopupCardEditList'
import Fire from '../fire'
import Fab from '@material-ui/core/Fab';
import ColorPicker from "react-pick-color";
import Popover from '@material-ui/core/Popover';

/**
 * Style
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
            minWidth: 345,
            // flex: '1 1 150px',
            // margin: '5px'
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        alignItem: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
        },
        goRight: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: '0'
        },
        taskUnCrossed: {
            maxWidth: '130px',
            textDecoration: 'none'
        },
        taskCrossed: {
            maxWidth: '130px',
            textDecoration: 'line-through'
        }
    }),
);

interface CardListProps {
    list: List;
}

export default function CardList(props: CardListProps) {
    // Utilisation des styles définis
    const classes = useStyles();

    // https://material-ui.com/components/menus/
    // Dot Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // https://material-ui.com/components/cards/
    // Expand button
    const [expanded, setExpanded] = React.useState(false);

    const [anchorPopover, setAnchorElPopover] = React.useState<HTMLButtonElement | null>(null);

    const openPopover = Boolean(anchorPopover);
    const id = openPopover ? 'simple-popover' : undefined;

    /**
     * Popup colorPicker
     * @param event 
     */
    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElPopover(event.currentTarget);
    };

    /**
     * Fermeture colorPicker
     */
    const handlePopoverClose = () => {
        setAnchorElPopover(null);
    };

    /**
     * Gère la position de la flèche
     */
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    /**
     * Affiche le menu au bon endroit
     * @param event 
     */
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * Permet de faire disparaitre le menu
     */
    const handleClose = () => {
        setAnchorEl(null);
    };

    /**
     * Supprime la liste 
     */
    const handleDeleteList = (list: List) => {
        // Suppression en base
        let firebase = new Fire((error: any) => {
            if (error) {
                return alert("Une erreur est survenue lors de la connexion à la base de données");
            }

            firebase.deleteList(props.list)
        });
        handleClose();
    };

    /**
     * Gère le changement de coche
     * @param todo La todo à modifier
     * @param i L'index de la todo dans la liste
     */
    const handleCheckChanged = (todo: Todo, i: number) => {
        props.list.Todos[i].Completion = !props.list.Todos[i].Completion

        // Modification en base
        let firebase = new Fire((error: any) => {
            if (error) {
                return alert("Une erreur est survenue lors de la connexion à la base de données");
            }

            firebase.updateList(props.list)
        });
    };

    /**
     * Gère la suppression de la todo
     * @param todo La todo à modifier
     */
    const handleDeleteTodo = (todo: Todo) => {
        // Retrait de la tâche non désirée de la liste
        let index = props.list.Todos.indexOf(todo)
        props.list.Todos.splice(index, 1);

        // Ferme le tiroir si aucune tâche n'existe
        if (props.list.Todos.length === 0)
            setExpanded(false)

        // Modification en base
        let firebase = new Fire((error: any) => {
            if (error) {
                return alert("Une erreur est survenue lors de la connexion à la base de données");
            }

            firebase.updateList(props.list)
        });
    }

    /**
     * Gère le changement de couleur
     * @param color 
     */
    const handleColorChange = (color: string) => {
        props.list.Color = color;
        // Modification en base
        let firebase = new Fire((error: any) => {
            if (error) {
                return alert("Une erreur est survenue lors de la connexion à la base de données");
            }

            firebase.updateList(props.list)
        });
    }

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    title={props.list.Name}
                    avatar={
                        <div>
                            <Tooltip title="Modifier la couleur">
                                <Fab size={'small'} style={{ backgroundColor: props.list.Color }} aria-label="add" onClick={handlePopoverClick}> <p></p></Fab>
                            </Tooltip>
                            <Popover
                                id={id}
                                open={openPopover}
                                anchorEl={anchorPopover}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <ColorPicker color={props.list.Color} onChange={(color) => handleColorChange(color.hex)} />
                            </Popover>
                        </div>
                    }
                    subheader={
                        props.list.Todos.length === 0 ? "Aucune tâche créée." :
                            props.list.Todos.filter(function (todo) {
                                return todo.Completion;
                            }).length === props.list.Todos.length ? "Tâches toutes réalisées. Félicitation !" :
                                "Tâches complétées : " +
                                props.list.Todos.filter(function (todo) {
                                    return todo.Completion;
                                }).length + " / " + props.list.Todos.length
                    }
                    action={
                        <Tooltip title="Ouvrir le menu">
                            <IconButton aria-label="Paramètres" onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    style={{height:'7em'}}
                />
                <CardContent>
                    <CardActions disableSpacing>
                        <PopupCardCreationTodo list={props.list} />
                        {
                            props.list.Todos.length > 0 ?
                                <Tooltip title="Afficher / Cacher les tâches">
                                    <IconButton className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="Montrer plus"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </Tooltip>
                                :
                                null
                        }
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <GridList cellHeight={50} cols={1}>
                                {
                                    props.list.Todos.map((todo, i) => (
                                        <GridListTile>
                                            <div className={classes.alignItem}>
                                                <Tooltip title={todo.Name}>
                                                    <Typography className={todo.Completion ? classes.taskCrossed : classes.taskUnCrossed} noWrap={true}>{todo.Name}</Typography>
                                                </Tooltip>
                                                <Checkbox checked={todo.Completion} style={{ color: props.list.Color }} onChange={() => handleCheckChanged(todo, i)} />
                                                <div className={classes.goRight}>
                                                    <PopupCardEditTodo list={props.list} todoId={i} />
                                                    <Tooltip title="Supprimer la tâche">
                                                        <IconButton onClick={() => handleDeleteTodo(todo)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </GridListTile>
                                    ))
                                }
                            </GridList>
                        </CardContent>
                    </Collapse>
                </CardContent>
            </Card>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <PopupCardEditList list={props.list} />
                <MenuItem onClick={() => handleDeleteList(props.list)}>Supprimer cette liste</MenuItem>
            </Menu>
        </>
    );
}