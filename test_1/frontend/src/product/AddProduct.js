import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 70,
    },
}));

export default function AddProduct(props) {
    const classes = useStyles();
    const {
        openAddProduct, handleClose, title, setTitle, description, setDescription, handleAddProduct
    } = props;

    return (
        <Dialog disableBackdropClick={true} disableEscapeKeyDown={true} open={openAddProduct}
                onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Product</DialogTitle>
            <DialogContent>
                <form className={classes.container}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="title"
                        name="title"
                        label="title"
                        fullWidth
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="description"
                        name="description"
                        label="description"
                        fullWidth
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                </form>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddProduct} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}