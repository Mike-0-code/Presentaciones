/**
 * ========================================
 * MOTOR PRINCIPAL DE PRESENTACIONES
 * ========================================
 */

import { Manifiesto, Resultado, PresentacionRenderizada } from './types.js';
import { crearError } from './errores.js';

// Importamos tipos de layouts (sin instanciar aún)
import { LayoutPortada } from '../layouts/layout.portada.js';
import { LayoutUnaColumna } from '../layouts/layout.unaColumna.js';
import { LayoutDosColumnas } from '../layouts/layout.dosColumnas.js';

export class PresentacionEngine {
  
  private layouts: Map<string, any> = new Map();

  constructor() {
    this.registrarLayouts();
  }

  /**
   * Registra todos los layouts disponibles
   */
  private registrarLayouts(): void {
    const layouts = [
      new LayoutPortada(),
      new LayoutUnaColumna(),
      new LayoutDosColumnas()
    ];
    
    layouts.forEach(layout => {
      this.layouts.set(layout.tipo, layout);
    });
    
    console.log(`✅ ${layouts.length} layouts registrados`);
  }
  
  /**
   * Procesa un JSON y genera una presentación
   */
  procesar(jsonInput: string): Resultado<PresentacionRenderizada> {
    try {
      // PASO 1: Validar que el JSON es válido
      const manifiesto = this.validarJSON(jsonInput);
      if (!manifiesto.exito) {
        return manifiesto;
      }

      // PASO 2: Validar la estructura del manifiesto
      const validacion = this.validarManifiesto(manifiesto.data);
      if (!validacion.exito) {
        return validacion;
      }

      // PASO 3: Renderizar diapositivas
      const renderizado = this.renderizar(manifiesto.data);
      
      return renderizado;

    } catch (error) {
      return {
        exito: false,
        error: `Error inesperado: ${error}`
      };
    }
  }

  /**
   * Valida que el string sea JSON válido
   */
  private validarJSON(input: string): Resultado<Manifiesto> {
    try {
      const data = JSON.parse(input);
      return { exito: true, data };
    } catch (error) {
      return {
        exito: false,
        error: 'El JSON no es válido. Revisa la sintaxis.'
      };
    }
  }

  /**
   * Valida que el manifiesto tenga la estructura correcta
   */
  private validarManifiesto(manifiesto: any): Resultado<Manifiesto> {
    if (!manifiesto.metadatos) {
      return {
        exito: false,
        error: 'Faltan los metadatos de la presentación'
      };
    }
    
    if (!Array.isArray(manifiesto.diapositivas)) {
      return {
        exito: false,
        error: 'Las diapositivas deben ser un array'
      };
    }

    return { exito: true, data: manifiesto };
  }

  /**
   * Renderiza todas las diapositivas
   */
  private renderizar(manifiesto: Manifiesto): Resultado<PresentacionRenderizada> {
    const diapositivasRenderizadas = [];
    
    for (const diapositiva of manifiesto.diapositivas) {
      
      // Buscar el layout correspondiente
      const layout = this.layouts.get(diapositiva.contenido.tipo);
      
      if (!layout) {
        return {
          exito: false,
          error: `Tipo de layout "${diapositiva.contenido.tipo}" no encontrado en diapositiva ${diapositiva.id}`
        };
      }
      
      // Validar el contenido específico del layout
      const validacion = layout.validar(diapositiva.contenido.datos);
      
      if (!validacion.exito) {
        return {
          exito: false,
          error: `Error en diapositiva ${diapositiva.id}: ${validacion.error}`
        };
      }
      
      // Renderizar
      const html = layout.renderizar(validacion.data);
      
      diapositivasRenderizadas.push({
        id: diapositiva.id,
        html: html
      });
    }
    
    return {
      exito: true,
      data: {
        metadatos: manifiesto.metadatos,
        diapositivas: diapositivasRenderizadas,
        css: '' // Por ahora vacío, luego añadiremos temas
      }
    };
  }
}
