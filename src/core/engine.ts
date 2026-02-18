/**
 * ========================================
 * MOTOR PRINCIPAL DE PRESENTACIONES
 * ========================================
 */

import { Manifiesto, Resultado, PresentacionRenderizada } from './types.js';
import { AppError, crearError } from './errores.js';

export class PresentacionEngine {
  
  /**
   * Procesa un JSON y genera una presentación
   */
  procesar(jsonInput: string): Resultado<PresentacionRenderizada> {
    try {
      // PASO 1: Validar que el JSON es válido
      const manifiesto = this.validarJSON(jsonInput);
      if (!manifiesto.exito) {
        return manifiesto; // Devolvemos el error tal cual
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
    // TODO: Implementar validación completa
    // Por ahora, validación básica
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
    // TODO: Implementar renderizado real
    // Por ahora devolvemos algo vacío para que no falle
    return {
      exito: true,
      data: {
        metadatos: manifiesto.metadatos,
        diapositivas: [],
        css: ''
      }
    };
  }
}
