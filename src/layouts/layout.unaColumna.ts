/**
 * ========================================
 * LAYOUT: Una Columna (título + lista de puntos)
 * ========================================
 */

import { ContenidoUnaColumna, Resultado } from '../core/types.js';

export class LayoutUnaColumna {
  
  /**
   * El tipo de layout que implementa esta clase
   */
  tipo = 'unaColumna' as const;

  /**
   * Valida que el contenido sea correcto para una columna
   */
  validar(contenido: unknown): Resultado<ContenidoUnaColumna> {
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

    // Validar que puntos existe y es un array
    if (!Array.isArray(c.puntos)) {
      return {
        exito: false,
        error: 'Los puntos deben ser un array'
      };
    }

    // Validar que cada punto es texto
    for (let i = 0; i < c.puntos.length; i++) {
      if (typeof c.puntos[i] !== 'string') {
        return {
          exito: false,
          error: `El punto ${i + 1} debe ser texto`
        };
      }
    }

    // Validar nota si existe
    if (c.nota !== undefined && typeof c.nota !== 'string') {
      return {
        exito: false,
        error: 'La nota debe ser texto'
      };
    }

    // Si todo está bien, devolvemos el contenido tipado
    return {
      exito: true,
      data: {
        titulo: c.titulo,
        puntos: c.puntos,
        nota: c.nota
      }
    };
  }

  /**
   * Renderiza el contenido a HTML
   */
  renderizar(contenido: ContenidoUnaColumna): string {
    const { titulo, puntos, nota } = contenido;

    // Generar lista de puntos HTML
    const puntosHTML = puntos.map(punto => 
      `<li>${this.escapeHTML(punto)}</li>`
    ).join('');

    return `
      <div class="diapositiva una-columna">
        <h2 class="titulo-diapositiva">${this.escapeHTML(titulo)}</h2>
        
        <ul class="lista-puntos">
          ${puntosHTML}
        </ul>
        
        ${nota ? `<p class="nota-pie">${this.escapeHTML(nota)}</p>` : ''}
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
