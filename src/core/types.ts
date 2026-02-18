/**
 * ========================================
 * CORE: Tipos fundamentales del sistema
 * ========================================
 */

export type TipoLayout = 
  | 'portada'
  | 'unaColumna'
  | 'dosColumnas';

/**
 * ========================================
 * CONTENIDOS: La forma de cada tipo de layout
 * ========================================
 */

// Contenido para una diapositiva de portada
export interface ContenidoPortada {
  titulo: string;
  subtitulo?: string;      // Opcional (por eso el ?)
  fecha?: string;          // Opcional
}

// Contenido para una diapositiva de una columna
export interface ContenidoUnaColumna {
  titulo: string;
  puntos: string[];        // Array de strings (viñetas)
  nota?: string;           // Opcional, texto pequeño al pie
}

// Contenido para una diapositiva de dos columnas
export interface ContenidoDosColumnas {
  titulo: string;
  columnaIzquierda: {
    titulo?: string;       // Título de la columna (opcional)
    puntos: string[];
  };
  columnaDerecha: {
    titulo?: string;
    puntos: string[];
  };
}

/**
 * Unión de todos los contenidos posibles
 */
export type ContenidoDiapositiva = 
  | { tipo: 'portada'; datos: ContenidoPortada }
  | { tipo: 'unaColumna'; datos: ContenidoUnaColumna }
  | { tipo: 'dosColumnas'; datos: ContenidoDosColumnas };

/**
 * ========================================
 * ESTRUCTURA PRINCIPAL: El Manifiesto
 * ========================================
 */

// Metadatos de toda la presentación
export interface MetadatosPresentacion {
  titulo: string;
  autor: string;
  fechaCreacion: string;    // Formato ISO: YYYY-MM-DD
  tema: 'claro' | 'oscuro'; // Por ahora solo dos temas
}

// Una diapositiva individual
export interface Diapositiva {
  id: number;               // Para ordenar y referenciar
  contenido: ContenidoDiapositiva;
}

// EL MANIFIESTO COMPLETO
export interface Manifiesto {
  metadatos: MetadatosPresentacion;
  diapositivas: Diapositiva[];
}

/**
 * ========================================
 * RESULTADOS: Cómo manejamos los errores
 * ========================================
 */

// Tipo Resultado: o funciona (data) o falla (error)
export type Resultado<T> = 
  | { exito: true; data: T }
  | { exito: false; error: string; codigo?: string };

// La representación interna de una diapositiva YA RENDERIZADA
export interface DiapositivaRenderizada {
  id: number;
  html: string;              // El HTML final de esta diapositiva
}

// La presentación completa renderizada
export interface PresentacionRenderizada {
  metadatos: MetadatosPresentacion;
  diapositivas: DiapositivaRenderizada[];
  css: string;               // Los estilos globales
}
