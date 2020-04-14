import React from 'react';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'


export default (state, action) => {

    switch (action.type) {

        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasProyecto: action.payload
            }

        case AGREGAR_TAREA:
            return {
                ...state,
                tareasProyecto: [action.payload, ...state.tareasProyecto],
                errorTarea: false
            }

        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.filter(tarea => action.payload !== tarea._id)
            }

        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaSeleccionada: null
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }

        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true
            }

        default:
            return state;
    }
}