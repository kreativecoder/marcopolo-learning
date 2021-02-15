import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, {useState} from "react";
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

export default function EditProduct(props) {
    const classes = useStyles();
    const {
        openEditProduct, handleClose, handleEditProduct, product
    } = props;

    const [editedProduct, setEditedProduct] = useState(product);

    const editProductClick = () => {
        handleEditProduct(editedProduct);
    }

    const editField = e => {
        const {name, value} = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <Dialog disableBackdropClick={true} disableEscapeKeyDown={true} open={openEditProduct}
                onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
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
                        onChange={e => editField(e)}
                        value={editedProduct.title}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="description"
                        name="description"
                        label="description"
                        fullWidth
                        onChange={e => editField(e)}
                        value={editedProduct.description}
                    />
                </form>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={editProductClick} color="primary">
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
}