import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CartelContext = createContext();

const CartelProvider = ({ children }) => {
    const inicialCartel = {
        abierto: false,
        tipo: 'info',
        text: ""
    }
    const [openCartel, setOpenCartel] = useState(inicialCartel);
    const handleCartel = (orden) => {
        setOpenCartel({
            abierto: true,
            tipo: orden.tipo,
            text: orden.text
        })
    }
    
    return (
        <CartelContext.Provider value={handleCartel}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{ width: 300 }}
                open={openCartel.abierto}
                autoHideDuration={5000}
                onClose={() => setOpenCartel({ ...openCartel, abierto: false })}
            >
                <Alert
                    variant='filled'
                    severity={openCartel.tipo}
                    sx={{ width: '100%' }}
                >{openCartel.text}</Alert>
            </Snackbar>
            {children}
        </CartelContext.Provider>
    )
}
export { CartelProvider, CartelContext };