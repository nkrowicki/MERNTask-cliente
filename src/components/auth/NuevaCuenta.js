import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // En caso de que el usuario se haya autenticado/Registrado o sea un registro duplicado
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria); 
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    // State Inicial
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmarPassword: ''
    });

    const { nombre, email, password, confirmarPassword } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        }
        )
    }

    //Cuando quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //Validar que no haya campos vacios
        if (nombre.trim() === '' ||
            email.trim() === '' ||
            password.trim() === ''
            || confirmarPassword.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;

        }


        // Password minimo de 6 caracteres

        if (password.length < 6) {
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        // Ambos password iguales
        if (password !== confirmarPassword) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        registrarUsuario({
            nombre,
            email,
            password
        });

    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear cuenta</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Tu nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmarPassword">Confirmar password</label>
                        <input
                            type="password"
                            id="confirmarPassword"
                            name="confirmarPassword"
                            placeholder="Repetir password"
                            onChange={onChange}
                            value={confirmarPassword}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />
                    </div>

                </form>

                <Link to={'/'} className="enlace-cuenta">Iniciar sesión</Link>

            </div>
        </div>);
}

export default NuevaCuenta;