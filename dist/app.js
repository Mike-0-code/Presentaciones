/**
 * ========================================
 * APLICACIÓN PRINCIPAL
 * ========================================
 */
import { PresentacionEngine } from './core/engine.js';
import { HTMLExporter } from './exporters/html.exporter.js';
// Esta clase es la que usaremos desde el HTML
export class PresentatorApp {
    constructor() {
        // Último resultado generado (para poder descargarlo)
        this.ultimaPresentacion = null;
        this.motor = new PresentacionEngine();
        this.exportador = new HTMLExporter();
    }
    /**
     * Procesa un JSON y genera la presentación
     */
    procesarJSON(jsonInput) {
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
        }
        catch (error) {
            return {
                exito: false,
                error: `Error inesperado: ${error}`
            };
        }
    }
    /**
     * Genera una vista previa (primera diapositiva)
     */
    generarPreview(presentacion) {
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
    generarHTMLCompleto() {
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
        }
        catch (error) {
            return {
                exito: false,
                error: `Error al generar HTML: ${error}`
            };
        }
    }
}
// Exportamos para uso en módulos
export default PresentatorApp;
