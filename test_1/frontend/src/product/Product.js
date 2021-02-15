import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from "../common/Footer";
import Header from "../common/Header";
import {Button} from "@material-ui/core";
import {addProduct, getAllProducts} from "../util/ApiService";
import ProductDisplay from "./ProductDisplay";
import AddProduct from "./AddProduct";
import {useSnackbar} from "notistack";
import CardMedia from "@material-ui/core/CardMedia";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function Product(props) {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [openAddProduct, setOpenAddProduct] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        loadAllProducts()
    }, []);

    const loadAllProducts = () => {
        getAllProducts()
            .then(res => {
                setProducts(res.data)
            })
            .catch(function (error) {
                console.log(error.message)
                // notifyError(error.message || 'Sorry! Something went wrong. Please try again!');
            });
    }

    const handleClickAddProduct = () => {
        setOpenAddProduct(true);
    }

    const handleCloseAddProduct = () => {
        setOpenAddProduct(false);
    };

    const handleAddProduct = () => {
        const product = {
            "title": title,
            "description": description
        }

        addProduct(product)
            .then(res => {
                enqueueSnackbar(`Product Added Successfully!`, {variant: 'info'});
                loadAllProducts();
                setOpenAddProduct(false);
                setTitle('');
                setDescription('');
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
        <div className={classes.root}>
            <Header pageTitle={'Products'}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" onClick={handleClickAddProduct}>
                                Add Product
                            </Button>
                            <AddProduct openAddProduct={openAddProduct}
                                        handleClose={handleCloseAddProduct}
                                        title={title}
                                        setTitle={setTitle}
                                        description={description}
                                        setDescription={setDescription}
                                        handleAddProduct={handleAddProduct}
                            />
                            <CardMedia
                                className={classes.media}
                                image="https://picsum.photos/200"
                                title="sample"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                {products.map((p) => (
                                    <Grid key={p.id} item xs={12} md={3}>
                                        {/*<Paper className={classes.paper}>*/}
                                        <ProductDisplay key={p.id} product={p}
                                                        loadAllProducts={loadAllProducts}
                                        />
                                        {/*</Paper>*/}
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Footer/>
                </Container>
            </main>
        </div>

    );
}