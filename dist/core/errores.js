/**
 * ========================================
 * SISTEMA DE ERRORES
 * ========================================
 */
// Función para crear errores de forma consistente
export function crearError(codigo, mensaje, diapositivaId) {
    return {
        codigo,
        mensaje,
        diapositivaId,
        timestamp: new Date().toISOString() // Esto ahora es válido
    };
}
// Función para manejar errores inesperados
export function errorInesperado(error) {
    return {
        codigo: 'ERROR_INTERNO',
        mensaje: error instanceof Error ? error.message : 'Error desconocido',
        detalle: error,
        timestamp: new Date().toISOString()
    };
}
