import { Badge, Fab, Grid } from "@mui/material";
import Product from "../../Components/Product";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from "react";
import ShoppCart from "../../Components/ShoppCart";
import { useSnackbar } from "notistack";
import api from "../../Services/api";
import Loading from "../../Components/Loading";

/**
 * Constante para esperar una cantidad de segundos
 */
const delay = ms => new Promise(res => setTimeout(res, ms));


/**
 * Página principal para el usuario
 */
const Main = ({ theme }) => {

    /**
     * Variable para abrir la ventana modal
     */
    const [open, setOpen] = useState(false);

    /**
     * Notifiaciones
     */
    const { enqueueSnackbar } = useSnackbar();

    /**
     * Alamcena los productos
     */
    const [products, setProducts] = useState([])

    /**
     * Variable para msotrar la pantalla de carga
     */
    const [loading, setLoading] = useState(false)

    /**
    * Alamcena los productos
    */
    const [shopCart, setShopCart] = useState({
        "products": {

        },
        "status": "pending",
        "total": 0
    })

    /**
     * Notificaciones del carrito
     */

    const [notifyNum, setNotifyNum] = useState(0);

    /**
     * Consulta los productos
     */
    const loadProducts = async () => {

        try {
            const { data } = await api.get('/api/products');
            ///api/shoppingcar
            // console.log(data);

            if (data.status == "Success") {
                setProducts(data.products);
            } else {
                console.log(data);
                enqueueSnackbar('Ocurrió un error al consultar los prodcutos', {
                    variant: 'error',
                });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Ocurrió un error al consultar los prodcutos', {
                variant: 'error',
            });
        }
    }

    /**
     * Crea un nuevo carrito
     */
    const createShopCart = async () => {

        try {
            const { data } = await api.post('/api/shoppingcar', {
                shoppingCar: {
                    "products": {

                    },
                    "status": "pending",
                    "total": 0
                }
            });

            //console.log(data);

            if (data.status == "Success") {
                setShopCart(data.newCar);
            } else {
                console.log(data);
                enqueueSnackbar('Ocurrió un error al crear el carrito de compra', {
                    variant: 'error',
                });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Ocurrió un error al crear el carrito de compra', {
                variant: 'error',
            });
        }
    }

    /**
     * Actualiza un carrito de compra
     */
    const updateShopCart = async (shopCartTemp) => {

        try {
            const { data } = await api.put('/api/shoppingcar', { shoppingCar: shopCartTemp, filter: { id: shopCartTemp.id } });

            console.log(data);

            if (data.status == "Success") {
                setShopCart(data.updatedCars[0]);
            } else {
                console.log(data);
                enqueueSnackbar('Ocurrió un error al crear el carrito de compra', {
                    variant: 'error',
                });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Ocurrió un error al crear el carrito de compra', {
                variant: 'error',
            });
        }
    }

    /**
     * Elimina un carrito de compra
     */
    const deleteShopCart = async (id) => {

        try {
            const { data } = await api.delete('/api/shoppingcar', { filter: { id: id } });

            //console.log(data);

            if (data.status == "Success") {
                loadProducts();
                createShopCart();
                setOpen(false)
                enqueueSnackbar('Carrito de compra eliminado', {
                    variant: 'success',
                });
            } else {
                console.log(data);
                enqueueSnackbar('Ocurrió un error al eliminar el carrito de compra', {
                    variant: 'error',
                });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar('Ocurrió un error al eliminar el carrito de compra', {
                variant: 'error',
            });
        }
    }

    /**
     * Agrega un prodcuto al carrito
     * @param {*} newProduct 
     */
    const addProduct = async (newProduct) => {

        let productsTemp = { ...shopCart.products };

        /**
         * Si existe el prodcto en el carrito aumenta la cantidad
         * Sino lo agrega
         */
        if (productsTemp[newProduct.code]) {

            productsTemp[newProduct.code].amount++;
        } else {
            productsTemp[newProduct.code] = {
                code: newProduct.code,
                name: newProduct.name,
                price: newProduct.price,
                img: newProduct.img,
                amount: 1,
            }
        }

        console.log({
            ...shopCart,
            products: productsTemp
        });


        updateShopCart({
            ...shopCart,
            products: productsTemp
        });
        setNotifyNum(notifyNum + 1);

        if (!open) {
            enqueueSnackbar('Producto agregado', {
                variant: 'success',
            });
        }

    }

    /**
     * Elimina un producto del carrito
     * @param {*} newProduct 
     */
    const removeProduct = async (newProduct) => {

        let productsTemp = { ...shopCart.products };

        /**
         * Revisa si la cantidad es mayor a uno
         * de lo contrario lo quita del carrito
         */
        if (productsTemp[newProduct.code].amount > 1) {

            productsTemp[newProduct.code].amount--;
        } else {
            delete productsTemp[newProduct.code];
        }

        console.log({
            ...shopCart,
            products: productsTemp
        });

        updateShopCart({
            ...shopCart,
            products: productsTemp
        });

        setNotifyNum(notifyNum + 1);
    }

    /**
     * Funcion para comprar los productos del carrito
     */
    const buyCart = async () => {
        setLoading(true);
        setOpen(false)
        await delay(3000);
        setLoading(false);
        enqueueSnackbar('Compra exitosa', {
            variant: 'success',
        });
    }
    /**
     * Inicia la pagina
     */
    useEffect(() => {

        loadProducts();
        createShopCart();

    }, [])

    useEffect(() => {
        setNotifyNum(0)
    }, [open])


    return (
        <>
            <Grid
                container
                // spacing={2}
                //justifyContent="center"
                style={
                    {
                        margin: 0,
                        width: '100%',
                        minHeight: '90vh',
                        background: '#dbd7d7',
                        padding: 10

                    }}

            >
                {
                    products.map((product, key) => {
                        return (
                            <Grid item lg={3} md={4} sm={12} xs={12} sx={{ padding: '5px' }}>
                                <Product theme={theme} product={product} add={addProduct} />
                            </Grid>
                        )
                    })
                }
            </Grid>

            <ShoppCart
                open={open}
                setOpen={setOpen}
                products={shopCart.products}
                total={shopCart.total}
                add={addProduct}
                remove={removeProduct}
                buyAction={buyCart}
                id={shopCart.id}
                deleteCart={deleteShopCart}
            />

            <Fab color="primary" aria-label="add" sx={{ position: 'Fixed', right: '12px', bottom: '12px' }} onClick={() => setOpen(true)}>

                <Badge badgeContent={notifyNum} color="error">
                    <ShoppingCartIcon />
                </Badge>

            </Fab>

            <Loading open={loading} />
        </>
    )
}

export default Main;