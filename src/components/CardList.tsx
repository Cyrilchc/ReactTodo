import React from 'react';
import { List } from '../objects/List';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardActions from '@material-ui/core/CardActions';
import Checkbox from '@material-ui/core/Checkbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Edit from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import { CardContent, CardHeader, Collapse, GridList, GridListTile, Theme, } from '@material-ui/core';
import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import { CheckBox } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Style
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
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
            alignItems: 'center'
        },
        goRight: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: '0'
        }
    }),
);

interface CardListProps {
    list: List;
    /*AddTodo: () => void;
    DeleteList: () => void;
    EditListName: () => void;*/
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

    // https://material-ui.com/components/checkboxes/
    // Changement de coche des CheckBoxes
    const [checked, setChecked] = React.useState(true);

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
     * Ouvre la popup de modification du titre
     */
    const handleEditTitle = () => {
        handleClose();
    };

    /**
     * Supprime la liste 
     */
    const handleDeleteList = () => {
        handleClose();
    };

    /**
     * Gère le changement de coche
     */
    const handleCheckChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        //event.target.checked = !event.target.checked
    };

    /**
     * Ouvre la popup de modification de Todo
     */
    const handleEditTodo = () => {

    }

    /**
     * Gère la suppression de la todo
     */
    const handleDeleteTodo = () => {

    }

    /**
     * Gère l'ajout d'une tâche
     */
    const handleAddTodo = () => {

    }

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    title={props.list.Name}
                    subheader={
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
                />
                <CardContent>
                    <CardActions disableSpacing>
                        <Tooltip title="Ajouter une tâche">
                            <IconButton
                                onClick={handleAddTodo}
                                aria-label="Ajouter une tâche"
                            >
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Afficher / Cacher les tâches">
                            <IconButton className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="Montrer plus"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <GridList cellHeight={50} cols={1}>
                                {
                                    props.list.Todos.map((todo, i) => (
                                        <GridListTile>
                                            <div className={classes.alignItem}>
                                                <p>{todo.Name}</p>
                                                <Checkbox checked={todo.Completion} onChange={handleCheckChanged} />
                                                <div className={classes.goRight}>
                                                    <Tooltip title="Modifier la tâche">
                                                        <IconButton onClick={handleEditTodo}>
                                                            <Edit />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Supprimer la tâche">
                                                        <IconButton onClick={handleDeleteTodo}>
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
                <MenuItem onClick={handleEditTitle}>Modifier le titre</MenuItem>
                <MenuItem onClick={handleDeleteList}>Supprimer cette liste</MenuItem>
            </Menu>
        </div>
    );
}