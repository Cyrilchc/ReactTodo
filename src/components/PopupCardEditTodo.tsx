import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import Fire from '../fire'
import { List } from '../objects/List';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import SnackBarAlert from './SnackBarAlert';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addButton: {
            height: '6em',
            width: '6em'
        },
        inputField: {
            width: '25em'
        }
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Grow ref={ref} {...props} />;
});

interface PopupCardEditTodoProps {
    list: List
    todoId: number
}

export default function PopupCardEditTodo(props: PopupCardEditTodoProps) {
    const classes = useStyles();

    // https://material-ui.com/components/dialogs/
    const [open, setOpen] = React.useState(false);
    const [isError, setError] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(props.list.Todos[props.todoId].Name);
    const [inputHelper, setInputHelper] = React.useState('Veuillez entrer un nom');
    const [inputLabel, setInputLabel] = React.useState('Nom');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [snackOpen, setSnackOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditTask = () => {
        if (inputValue === '') {
            // Le champ est encore vide, afficher le message d'erreur
            setInputHelper('Le champ est vide, veuillez entrer un nom pour votre tâche')
            setInputLabel('Erreur, le champ est vide')
            setError(true)
        } else {
            // Ok, Lancer la création
            setInputHelper('Veuillez entrer un nom')
            setInputLabel('Nom')
            setError(false)
            // Modification en base
            let firebase = new Fire((error: any) => {
                if (error) {
                    return alert("Une erreur est survenue lors de la connexion à la base de données");
                }

                setSnackOpen(true);
                props.list.Todos[props.todoId].Name = inputValue
                firebase.updateList(props.list)
            });
            setOpen(false);
        }
    }

    /**
     * Mise à jour de la value de l'Input
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return (
        <>
            <Tooltip title="Modifier la tâche">
                <IconButton onClick={handleClickOpen}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                TransitionComponent={Transition}
            >
                <DialogTitle id="responsive-dialog-title">Modifier une tâche</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer le nom de la tâche.
                    </DialogContentText>
                    <TextField
                        className={classes.inputField}
                        error={isError}
                        placeholder="Nom de la tâche"
                        id="outlined-error-helper-text"
                        label={inputLabel}
                        helperText={inputHelper}
                        variant="outlined"
                        value={inputValue}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleEditTask} color="primary">
                        Modifier
                    </Button>
                    <Button onClick={handleClose} color="default" autoFocus>
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
            {
                snackOpen &&
                <SnackBarAlert description={"Tâche modifiée avec succès"} snackVisible={snackOpen} />
            }
        </>
    );
}