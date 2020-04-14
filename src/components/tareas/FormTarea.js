import React, { useContext, useState, useEffect } from 'react';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {

    //Obtener el state de proyectos
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;

    //Obtener la funcion de context de tareas
    const tareaContext = useContext(TareaContext);
    const { errorTarea, tareaSeleccionada, agregarTarea, limpiarTarea, actualizarTarea, obtenerTareas, validarTarea } = tareaContext;

    //Effect que detecta una tarea seleccionada
    useEffect(() => {
        if (tareaSeleccionada !== null) {
            setTarea(tareaSeleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada]);

    //State del formulario
    const [tarea, setTarea] = useState({
        nombre: ''
    });

    //Extraer el nombre del proyecto
    const { nombre } = tarea;

    if (!proyecto) return null;

    //Array destructuring para extraer el proyecto igual
    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    //onSubmit
    const onSubmit = e => {
        e.preventDefault();

        //Validar
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }

        if (tareaSeleccionada === null) {
            //Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else{
            //Si estamos aca.. estamos editando asi que actualizamos
            actualizarTarea(tarea);

            //Elimina tarea selecionada del state
            limpiarTarea();

        }

        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)

        //Reiniciar el form
        setTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea"
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar tarea' : 'Agregar Tarea'}
                    />
                </div>
                {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
            </form>
        </div>
    );
}

export default FormTarea;