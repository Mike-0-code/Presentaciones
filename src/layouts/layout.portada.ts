/**
 * ========================================
 * LAYOUT: Portada
 * ========================================
 */

import { ContenidoPortada, Resultado } from '../core/types.js';

export class LayoutPortada {
  
  /**
   * El tipo de layout que implementa esta clase
   */
  tipo = 'portada' as const;

  /**
   * Valida que el contenido sea correcto para una portada
   */
  validar(contenido: unknown): Resultado<ContenidoPortada> {
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
        error: 'La portada necesita un título válido'
      };
    }

    // Validar campos opcionales si existen
    if (c.subtitulo !== undefined && typeof c.subtitulo !== 'string') {
      return {
        exito: false,
        error: 'El subtítulo debe ser texto'
      };
    }

    if (c.fecha !== undefined && typeof c.fecha !== 'string') {
      return {
        exito: false,
        error: 'La fecha debe ser texto'
      };
    }

    // Si todo está bien, devolvemos el contenido tipado
    return {
      exito: true,
      data: {
        titulo: c.titulo,
        subtitulo: c.subtitulo,
        fecha: c.fecha
      }
    };
  }

  /**
   * Renderiza el contenido a HTML
   */
  renderizar(contenido: ContenidoPortada): string {
    const { titulo, subtitulo, fecha } = contenido;

    return `
      <div class="diapositiva portada">
        <h1 class="titulo-portada">${this.escapeHTML(titulo)}</h1>
        ${subtitulo ? `<h2 class="subtitulo-portada">${this.escapeHTML(subtitulo)}</h2>` : ''}
        ${fecha ? `<p class="fecha-portada">${this.escapeHTML(fecha)}</p>` : ''}
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
