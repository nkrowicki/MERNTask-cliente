import React, { useContext, useReducer } from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'

const TareaState = props => {

    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null
    }


    //Dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //Filtrar tareas de un proyecto en especifico
    const obtenerTareas = async proyecto => {
        try {

            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })


        } catch (error) {
            console.log(error)
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);

            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })

        } catch (error) {
            console.log(error)
        }
    }

    //Valida y muestra un error 
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //ELiminar tarea x id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } });

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Edita modifica una tarea 
    const actualizarTarea = async tarea => {
       try {
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: resultado.data.tarea
        });

       } catch (error) {
           console.log(error);
       }
    }

    //Extdrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }




    //Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }




    return (

        <TareaContext.Provider

            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                agregarTarea,
                actualizarTarea,
                eliminarTarea,
                limpiarTarea,
                guardarTareaActual,
                obtenerTareas,
                validarTarea,
            }}>
            {props.children}
        </TareaContext.Provider>

    );
}

export default TareaState;