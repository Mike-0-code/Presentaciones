/**
 * ========================================
 * SISTEMA DE ERRORES
 * ========================================
 */
// Función para crear errores
export function crearError(codigo, mensaje, diapositivaId) {
    return {
        codigo,
        mensaje,
        diapositivaId,
        timestamp: new Date().toISOString()
    };
}
// Función para errores inesperados
export function errorInesperado(error) {
    return {
        codigo: 'ERROR_INTERNO',
        mensaje: error instanceof Error ? error.message : 'Error desconocido',
        detalle: error,
        timestamp: new Date().toISOString()
    };
}
