import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';


const Barra = () => {

    // Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuario, cerrarSesion, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        //eslint-disable-next-line
    }, []);


    return (
        <header className="app-header">

            {usuario ?
                <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>
                : null}

            <nav className="nav-principal">
                <button
                    className="btn cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >
                    Cerrar sesion
                </button>
            </nav>
        </header>
    );
}

export default Barra;