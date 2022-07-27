
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Pantalla de carga
 * @returns 
 */
const Loading = ({open}) => {

    
  return (
    <div>
     
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
          {
          /**
           * Componente que se muestra al caragr
           * falta personalizar
           
           */
           }
           <CircularProgress color="inherit" />

      </Backdrop>
    </div>
  );
}
export default Loading;