import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Chip } from '@mui/material';

/**
 * Da formato al precio
 * @param {*} num 
 * @returns 
 */
const currencyFormat = (num) => {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

/**
 * Productos a mostrar cuando son seleccionados
 * @returns 
 */
const ShoppProduct = ({ product,add,remove }) => {



    return (

        <Card sx={{ display: 'flex' }}>

            <CardMedia
                component="img"
                sx={{ width: 180,height: 200 }}
                image={product.img}
                alt=""
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', width:'100%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">

                        {
                            product.total < product.tempTotal ?
                                <>
                                 <Chip variant="outlined" label= {currencyFormat(product.tempTotal)} color="error" sx={{textDecorationLine: 'line-through'}}/>
                                 <Chip variant="outlined" label= {currencyFormat(product.total)} color="secondary" />
                                </>
                                :
                                <>
                                  <Chip variant="outlined" label= {currencyFormat(product.total)} color="secondary" />
                                </>
                        }
                       
                       
                    </Typography>
                </CardContent>
               
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, width:'100%'}}>
                    <IconButton >
                        <RemoveCircleIcon onClick={()=>{remove(product)}} />
                    </IconButton>
                    <IconButton >
                        {product.amount ? product.amount : 1}
                    </IconButton>
                    <IconButton >
                        <AddCircleIcon  onClick={()=>{add(product)}} />
                    </IconButton>
                </Box>
        </Card>
    );
}

export default ShoppProduct;