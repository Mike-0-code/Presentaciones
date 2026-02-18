/**
 * ========================================
 * APLICACIÓN PRINCIPAL
 * ========================================
 */

import { PresentacionEngine } from './core/engine.js';
import { HTMLExporter } from './exporters/html.exporter.js';
import { Resultado, PresentacionRenderizada } from './core/types.js';

// Esta clase es la que usaremos desde el HTML
export class PresentatorApp {
  private motor: PresentacionEngine;
  private exportador: HTMLExporter;
  
  // Último resultado generado (para poder descargarlo)
  private ultimaPresentacion: PresentacionRenderizada | null = null;

  constructor() {
    this.motor = new PresentacionEngine();
    this.exportador = new HTMLExporter();
  }

  /**
   * Procesa un JSON y genera la presentación
   */
  procesarJSON(jsonInput: string): {
    exito: boolean;
    error?: string;
    preview?: string;
  } {
    try {
      // Procesar con el motor
      const resultado = this.motor.procesar(jsonInput);
      
      if (!resultado.exito) {
        return {
          exito: false,
          error: resultado.error
        };
      }

      // Guardar para posible descarga
      this.ultimaPresentacion = resultado.data;

      // Generar vista previa (solo la primera diapositiva)
      const previewHTML = this.generarPreview(resultado.data);

      return {
        exito: true,
        preview: previewHTML
      };

    } catch (error) {
      return {
        exito: false,
        error: `Error inesperado: ${error}`
      };
    }
  }

  /**
   * Genera una vista previa (primera diapositiva)
   */
  private generarPreview(presentacion: PresentacionRenderizada): string {
    if (presentacion.diapositivas.length === 0) {
      return '<div class="error">No hay diapositivas para mostrar</div>';
    }

    // Cogemos la primera diapositiva para la vista previa
    const primera = presentacion.diapositivas[0];
    
    // Aplicamos estilos básicos para la vista previa
    return `
      <style>
        .preview-container {
          font-family: Arial, sans-serif;
          padding: 20px;
          background: ${presentacion.metadatos.tema === 'oscuro' ? '#1a1a1a' : 'white'};
          color: ${presentacion.metadatos.tema === 'oscuro' ? 'white' : '#333'};
          border-radius: 8px;
        }
        .preview-container .diapositiva {
          margin: 0;
          padding: 20px;
        }
        .preview-container ul {
          text-align: left;
        }
      </style>
      <div class="preview-container">
        <h3>Vista previa (diapositiva 1 de ${presentacion.diapositivas.length})</h3>
        <hr>
        ${primera.html}
      </div>
    `;
  }

  /**
   * Genera el HTML completo para descargar
   */
  generarHTMLCompleto(): { exito: boolean; html?: string; error?: string } {
    if (!this.ultimaPresentacion) {
      return {
        exito: false,
        error: 'No hay ninguna presentación generada. Procesa un JSON primero.'
      };
    }

    try {
      const htmlCompleto = this.exportador.exportar(this.ultimaPresentacion);
      return {
        exito: true,
        html: htmlCompleto
      };
    } catch (error) {
      return {
        exito: false,
        error: `Error al generar HTML: ${error}`
      };
    }
  }
}

// Hacemos la app accesible desde el navegador
declare global {
  interface Window {
    PresentatorApp: typeof PresentatorApp;
  }
}

// Exportamos para uso en módulos
export default PresentatorApp;
