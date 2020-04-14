import {
    AGREGAR_PROYECTO,
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';


export default (state, action) => {

    switch (action.type) {

        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorFormulario: false
            };

        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            };

        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            };

        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            };

        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            };

        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            };

        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}