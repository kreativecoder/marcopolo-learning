import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteProduct from "./DeleteProduct";
import {deleteProduct, editProduct} from "../util/ApiService";
import {useSnackbar} from "notistack";
import EditProduct from "./EditProduct";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function ProductDisplay({product, loadAllProducts}) {
    const classes = useStyles();
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openEditProduct, setOpenEditProduct] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
    };

    const handleDeleteProductClick = () => {
        setOpenConfirmation(true);
    }

    const handleEditProductClick = () => {
        setOpenEditProduct(true);
    };

    const closeEditProduct = () => {
        setOpenEditProduct(false);
    }

    const handleDeleteProduct = (productId) => {
        deleteProduct(productId)
            .then(res => {
                enqueueSnackbar(`Product deleted!`, {variant: 'info'});
                setOpenConfirmation(false);
                loadAllProducts();
            })
            .catch(function (error) {
                if (error.response) {
                    enqueueSnackbar(error.response.data.message, {variant: 'error'});
                } else {
                    enqueueSnackbar(error.message || 'Sorry! Something went wrong. Please try again!', {variant: 'error'});
                }
            });
    };

    const handleEditProduct = (product) => {
        editProduct(product.id, product)
            .then(res => {
                enqueueSnackbar(`Product Edited Successfully!`, {variant: 'info'});
                loadAllProducts();
                setOpenEditProduct(false);
            })
            .catch(function (error) {
                if (error.response) {
                    enqueueSnackbar(error.response.data.message, {variant: 'error'});
                } else {
                    enqueueSnackbar(error.message || 'Sorry! Something went wrong. Please try again!', {variant: 'error'});
                }
            });
    };

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={product.imageUrl}
                    title={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {product.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Details
                </Button>
                <Button size="small" color="primary" onClick={handleEditProductClick}>
                    Edit
                </Button>
                <Button size="small" color="secondary" onClick={handleDeleteProductClick}>
                    Delete
                </Button>
                <DeleteProduct openConfirmation={openConfirmation}
                               handleClose={handleCloseConfirmation}
                               productId={product.id}
                               handleDeleteProduct={handleDeleteProduct}
                />
                <EditProduct openEditProduct={openEditProduct}
                             handleClose={closeEditProduct}
                             product={product}
                             handleEditProduct={handleEditProduct}
                />
            </CardActions>
        </Card>
    );
}