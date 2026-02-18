/**
 * ========================================
 * EXPORTADOR HTML
 * ========================================
 */

import { PresentacionRenderizada } from '../core/types.js';

export class HTMLExporter {
  
  /**
   * Genera un documento HTML completo a partir de la presentación renderizada
   */
  exportar(presentacion: PresentacionRenderizada): string {
    const { metadatos, diapositivas, css } = presentacion;
    
    // Generar el HTML de cada diapositiva
    const slidesHTML = diapositivas.map(slide => 
      `<div class="slide" id="slide-${slide.id}">${slide.html}</div>`
    ).join('');

    // Construir el documento HTML completo
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.escapeHTML(metadatos.titulo)}</title>
    <style>
        /* RESET BÁSICO */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            background: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        
        /* CONTENEDOR DE LA PRESENTACIÓN */
        .presentacion-container {
            max-width: 1200px;
            width: 100%;
            background: ${metadatos.tema === 'oscuro' ? '#1a1a1a' : 'white'};
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        
        /* METADATOS */
        .presentacion-metadatos {
            padding: 15px 20px;
            background: ${metadatos.tema === 'oscuro' ? '#2d2d2d' : '#f5f5f5'};
            color: ${metadatos.tema === 'oscuro' ? '#fff' : '#333'};
            border-bottom: 2px solid ${metadatos.tema === 'oscuro' ? '#444' : '#ddd'};
            font-size: 0.9em;
        }
        
        /* DIAPOSITIVAS */
        .slide {
            padding: 40px;
            min-height: 500px;
            border-bottom: 1px solid ${metadatos.tema === 'oscuro' ? '#333' : '#eee'};
            color: ${metadatos.tema === 'oscuro' ? '#fff' : '#333'};
        }
        
        .slide:last-child {
            border-bottom: none;
        }
        
        /* ESTILOS COMUNES PARA DIAPOSITIVAS */
        .titulo-diapositiva {
            font-size: 2.5em;
            margin-bottom: 30px;
            color: ${metadatos.tema === 'oscuro' ? '#fff' : '#2c3e50'};
            border-bottom: 2px solid ${metadatos.tema === 'oscuro' ? '#555' : '#3498db'};
            padding-bottom: 10px;
        }
        
        /* LISTAS */
        .lista-puntos {
            list-style-type: disc;
            margin-left: 30px;
            line-height: 1.8;
            font-size: 1.2em;
        }
        
        /* PORTADA */
        .portada {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 500px;
            text-align: center;
        }
        
        .titulo-portada {
            font-size: 3.5em;
            margin-bottom: 20px;
            color: ${metadatos.tema === 'oscuro' ? '#fff' : '#2c3e50'};
        }
        
        .subtitulo-portada {
            font-size: 2em;
            margin-bottom: 30px;
            color: ${metadatos.tema === 'oscuro' ? '#ccc' : '#7f8c8d'};
            font-weight: normal;
        }
        
        .fecha-portada {
            font-size: 1.2em;
            color: ${metadatos.tema === 'oscuro' ? '#999' : '#95a5a6'};
        }
        
        /* DOS COLUMNAS */
        .contenedor-columnas {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 20px;
        }
        
        .columna {
            background: ${metadatos.tema === 'oscuro' ? '#2d2d2d' : '#f9f9f9'};
            padding: 25px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
        }
        
        .titulo-columna {
            font-size: 1.5em;
            margin-bottom: 15px;
            color: #3498db;
        }
        
        /* NOTA AL PIE */
        .nota-pie {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px dashed ${metadatos.tema === 'oscuro' ? '#444' : '#ccc'};
            font-style: italic;
            color: ${metadatos.tema === 'oscuro' ? '#999' : '#7f8c8d'};
            font-size: 0.9em;
        }
        
        /* BARRA DE NAVEGACIÓN (simple) */
        .nav-controls {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${metadatos.tema === 'oscuro' ? '#2d2d2d' : 'white'};
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            display: flex;
            gap: 10px;
        }
        
        .nav-btn {
            padding: 8px 15px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .nav-btn:hover {
            background: #2980b9;
        }
        
        .nav-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        
        ${css}
    </style>
</head>
<body>
    <div class="presentacion-container">
        <div class="presentacion-metadatos">
            <strong>${this.escapeHTML(metadatos.titulo)}</strong> • 
            ${this.escapeHTML(metadatos.autor)} • 
            ${metadatos.fechaCreacion}
        </div>
        
        ${slidesHTML}
    </div>
    
    <!-- Controles de navegación simples -->
    <div class="nav-controls">
        <button class="nav-btn" onclick="navegarSlide(-1)">◀ Anterior</button>
        <span id="slide-indicator">1 / ${diapositivas.length}</span>
        <button class="nav-btn" onclick="navegarSlide(1)">Siguiente ▶</button>
    </div>
    
    <script>
        // Navegación simple entre diapositivas
        let slideActual = 0;
        const slides = document.querySelectorAll('.slide');
        const indicator = document.getElementById('slide-indicator');
        
        function mostrarSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
            slideActual = index;
            if (indicator) {
                indicator.textContent = (index + 1) + ' / ' + slides.length;
            }
        }
        
        function navegarSlide(direccion) {
            const nuevoIndex = slideActual + direccion;
            if (nuevoIndex >= 0 && nuevoIndex < slides.length) {
                mostrarSlide(nuevoIndex);
            }
        }
        
        // Mostrar primera diapositiva al cargar
        if (slides.length > 0) {
            mostrarSlide(0);
        }
    </script>
</body>
</html>`;
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
