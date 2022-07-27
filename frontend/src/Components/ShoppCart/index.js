import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ShoppProduct from '../ShoppProduct';
import { Grid } from '@mui/material';

/**
 * Controla la animación de inicio
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Da formato al precio
 * @param {*} num 
 * @returns 
 */
const currencyFormat = (num) => {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/**
 * Componente principal del 
 * @returns 
 */
const ShoppCart = ({ open, setOpen, products, add, remove, total,buyAction,deleteCart,id }) => {

  /**
   * Cierra la ventana modal
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Prodcutos en array
   */

  const [productsArr, setProductsArr] = React.useState([])

  React.useEffect(() => {

    let tempProductsArr = [];

    Object.keys(products).map((key) => {
      tempProductsArr.push(products[key])
    })

    // console.log(tempProductsArr);

    setProductsArr(tempProductsArr);

  }, [products])

  return (
    <div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogTitle >{`Carrito de compra. Total: ${currencyFormat(total)}`} <Button color="error" onClick={()=>{deleteCart(id)}}>Eliminar</Button></DialogTitle>

        <DialogContent  style={
          {

            background: '#dbd7d7'

          }}>

          <Grid
            container
            spacing={0}
            justifyContent="center"
            style={
              {
                margin: 0,
                width: '100%',


              }}
          >
            {productsArr.map((product) => {
              return (
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{    padding: '5px'}}>
                  <ShoppProduct add={add} remove={remove} product={product} />
                </Grid>
              )
            })}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>Cancelar</Button>
          {productsArr.length > 0 && <Button variant="contained" color="success" onClick={()=>buyAction()}>Comprar</Button>}
          

        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShoppCart;
