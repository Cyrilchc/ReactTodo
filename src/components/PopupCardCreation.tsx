import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
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
import { isPropertySignature } from 'typescript';

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

export default function PopupCardCreation() {
    const classes = useStyles();

    // https://material-ui.com/components/dialogs/
    const [open, setOpen] = React.useState(false);
    const [isError, setError] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [inputHelper, setInputHelper] = React.useState('Veuillez entrer un nom');
    const [inputLabel, setInputLabel] = React.useState('Nom');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Créé la liste
     */
    const handleAddList = () => {
        if (inputValue === '') {
            // Le champ est encore vide, afficher le message d'erreur
            setInputHelper('Le champ est vide, veuillez entrer un nom pour votre liste')
            setInputLabel('Erreur, le champ est vide')
            setError(true)
        } else {
            // Ok, Lancer la création
            setInputHelper('Veuillez entrer un nom')
            setInputLabel('Nom')
            setError(false)
        }
    }

    /**
     * Mise à jour de la value de l'Input
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return (
        <div>
            <Tooltip title="Ajouter une liste">
                <Fab className={classes.addButton} color="primary" aria-label="add" onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                TransitionComponent={Transition}
            >
                <DialogTitle id="responsive-dialog-title">Ajouter une liste</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez entrer le nom de la liste.
                    </DialogContentText>
                    <TextField
                        className={classes.inputField}
                        error={isError}
                        placeholder="Nom de la nouvelle liste"
                        id="outlined-error-helper-text"
                        label={inputLabel}
                        helperText={inputHelper}
                        variant="outlined"
                        value={inputValue}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleAddList} color="primary">
                        Ajouter
                    </Button>
                    <Button onClick={handleClose} color="default" autoFocus>
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}