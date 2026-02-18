/**
 * ========================================
 * SISTEMA DE ERRORES
 * ========================================
 */

// Códigos de error predefinidos
export type CodigoError = 
  | 'LAYOUT_NO_EXISTE'        // El tipo de layout no está registrado
  | 'CONTENIDO_INVALIDO'       // El contenido no coincide con lo esperado
  | 'JSON_INVALIDO'            // El JSON de entrada no es válido
  | 'DATOS_FALTANTES'          // Falta información obligatoria
  | 'ERROR_INTERNO';           // Cualquier otro error

// Estructura de un error de la aplicación
export interface AppError {
  codigo: CodigoError;
  mensaje: string;
  diapositivaId?: number;      // Opcional: en qué diapositiva ocurrió
  detalle?: unknown;           // Información adicional
}

// Función para crear errores de forma consistente
export function crearError(
  codigo: CodigoError, 
  mensaje: string, 
  diapositivaId?: number
): AppError {
  return {
    codigo,
    mensaje,
    diapositivaId,
    timestamp: new Date().toISOString()
  };
}

// Función para manejar errores inesperados
export function errorInesperado(error: unknown): AppError {
  return {
    codigo: 'ERROR_INTERNO',
    mensaje: error instanceof Error ? error.message : 'Error desconocido',
    detalle: error
  };
}
