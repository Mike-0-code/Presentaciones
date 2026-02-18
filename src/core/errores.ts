/**
 * ========================================
 * SISTEMA DE ERRORES
 * ========================================
 */

// Códigos de error predefinidos
export type CodigoError = 
  | 'LAYOUT_NO_EXISTE'
  | 'CONTENIDO_INVALIDO'
  | 'JSON_INVALIDO'
  | 'DATOS_FALTANTES'
  | 'ERROR_INTERNO';

// Estructura de un error de la aplicación
export interface AppError {
  codigo: CodigoError;
  mensaje: string;
  diapositivaId?: number;
  detalle?: unknown;
  timestamp?: string;  // ← TIENE QUE ESTAR ESTA LÍNEA
}

// Función para crear errores
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

// Función para errores inesperados
export function errorInesperado(error: unknown): AppError {
  return {
    codigo: 'ERROR_INTERNO',
    mensaje: error instanceof Error ? error.message : 'Error desconocido',
    detalle: error,
    timestamp: new Date().toISOString()
  };
}
