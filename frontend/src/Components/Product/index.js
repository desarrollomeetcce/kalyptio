import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, Grid } from '@mui/material';

/**
 * Boceto principal para los productos
 * @returns 
 */
const Product = ({ theme, product,add }) => {

  /**
   * Da formato al precio
   * @param {*} num 
   * @returns 
   */
  const currencyFormat = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardHeader
 
       
        title={product.name}
        subheader={currencyFormat(product.price)}
      />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: '200px' }}
      >

        <Grid item xs={3}>
          <img height={200} src={product.img} />
        </Grid>
      </Grid>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>

      <CardActions >
        <Button fullWidth variant="contained" color="secondary" startIcon={<AddShoppingCartIcon />} onClick={()=>{add(product)}}>
          Agregar
        </Button>



      </CardActions>

    </Card>
  );
}

export default Product;
