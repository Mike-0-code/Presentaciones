/**
 * ========================================
 * LAYOUT: Dos Columnas (comparativa)
 * ========================================
 */

import { ContenidoDosColumnas, Resultado } from '../core/types.js';

export class LayoutDosColumnas {
  
  /**
   * El tipo de layout que implementa esta clase
   */
  tipo = 'dosColumnas' as const;

  /**
   * Valida que el contenido sea correcto para dos columnas
   */
  validar(contenido: unknown): Resultado<ContenidoDosColumnas> {
    // Verificar que es un objeto
    if (!contenido || typeof contenido !== 'object') {
      return {
        exito: false,
        error: 'El contenido debe ser un objeto'
      };
    }

    const c = contenido as any;

    // Validar campo obligatorio: titulo
    if (!c.titulo || typeof c.titulo !== 'string') {
      return {
        exito: false,
        error: 'La diapositiva necesita un título válido'
      };
    }

    // Validar columna izquierda
    if (!c.columnaIzquierda || typeof c.columnaIzquierda !== 'object') {
      return {
        exito: false,
        error: 'La columna izquierda es obligatoria'
      };
    }

    // Validar columna derecha
    if (!c.columnaDerecha || typeof c.columnaDerecha !== 'object') {
      return {
        exito: false,
        error: 'La columna derecha es obligatoria'
      };
    }

    // Validar puntos de columna izquierda
    if (!Array.isArray(c.columnaIzquierda.puntos)) {
      return {
        exito: false,
        error: 'Los puntos de la columna izquierda deben ser un array'
      };
    }

    // Validar puntos de columna derecha
    if (!Array.isArray(c.columnaDerecha.puntos)) {
      return {
        exito: false,
        error: 'Los puntos de la columna derecha deben ser un array'
      };
    }

    // Validar títulos de columna si existen
    if (c.columnaIzquierda.titulo !== undefined && 
        typeof c.columnaIzquierda.titulo !== 'string') {
      return {
        exito: false,
        error: 'El título de la columna izquierda debe ser texto'
      };
    }

    if (c.columnaDerecha.titulo !== undefined && 
        typeof c.columnaDerecha.titulo !== 'string') {
      return {
        exito: false,
        error: 'El título de la columna derecha debe ser texto'
      };
    }

    // Validar cada punto
    for (let i = 0; i < c.columnaIzquierda.puntos.length; i++) {
      if (typeof c.columnaIzquierda.puntos[i] !== 'string') {
        return {
          exito: false,
          error: `El punto ${i + 1} de la columna izquierda debe ser texto`
        };
      }
    }

    for (let i = 0; i < c.columnaDerecha.puntos.length; i++) {
      if (typeof c.columnaDerecha.puntos[i] !== 'string') {
        return {
          exito: false,
          error: `El punto ${i + 1} de la columna derecha debe ser texto`
        };
      }
    }

    // Si todo está bien, devolvemos el contenido tipado
    return {
      exito: true,
      data: {
        titulo: c.titulo,
        columnaIzquierda: {
          titulo: c.columnaIzquierda.titulo,
          puntos: c.columnaIzquierda.puntos
        },
        columnaDerecha: {
          titulo: c.columnaDerecha.titulo,
          puntos: c.columnaDerecha.puntos
        }
      }
    };
  }

  /**
   * Renderiza el contenido a HTML
   */
  renderizar(contenido: ContenidoDosColumnas): string {
    const { titulo, columnaIzquierda, columnaDerecha } = contenido;

    // Generar lista de puntos izquierda
    const puntosIzqHTML = columnaIzquierda.puntos.map(punto => 
      `<li>${this.escapeHTML(punto)}</li>`
    ).join('');

    // Generar lista de puntos derecha
    const puntosDerHTML = columnaDerecha.puntos.map(punto => 
      `<li>${this.escapeHTML(punto)}</li>`
    ).join('');

    return `
      <div class="diapositiva dos-columnas">
        <h2 class="titulo-diapositiva">${this.escapeHTML(titulo)}</h2>
        
        <div class="contenedor-columnas">
          <div class="columna">
            ${columnaIzquierda.titulo ? 
              `<h3 class="titulo-columna">${this.escapeHTML(columnaIzquierda.titulo)}</h3>` : 
              ''}
            <ul class="lista-puntos">
              ${puntosIzqHTML}
            </ul>
          </div>
          
          <div class="columna">
            ${columnaDerecha.titulo ? 
              `<h3 class="titulo-columna">${this.escapeHTML(columnaDerecha.titulo)}</h3>` : 
              ''}
            <ul class="lista-puntos">
              ${puntosDerHTML}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Escapa caracteres HTML para evitar inyección de código
   */
  private escapeHTML(texto: string): string {
    return texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
