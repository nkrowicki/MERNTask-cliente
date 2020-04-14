import React, { Fragment, useState, useContext } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectoContext = useContext(ProyectoContext);
    const { formulario,
        errorFormulario,
        agregarProyecto,
        mostrarFormulario,
        mostrarError } = proyectoContext;

    //State para proyecto

    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    //Extraer valores
    const { nombre } = proyecto;

    //Leer contenidos del input y ponerlos en el state
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    //Cuando el usuario quiere agregar un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto
        if (nombre.trim() === '') {
            mostrarError();
            return;
        }

        //Agregar el proyecto al state
        agregarProyecto(proyecto);

        //Reiniciar el Form
        setProyecto({
            nombre: ''
        })
    }

    return (
        <Fragment>

            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >
                Nuevo Proyecto
        </button>
            {formulario
                ?
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre proyecto"
                        name="nombre"
                        onChange={onChangeProyecto}
                        value={nombre}
                    />

                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar proyecto"
                    />

                </form>

                : null}

            {errorFormulario ?
                <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                : null
            }
        </Fragment>
    );
}

export default NuevoProyecto;