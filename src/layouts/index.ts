/**
 * ========================================
 * REGISTRO DE LAYOUTS
 * ========================================
 */

import { LayoutPortada } from './layout.portada.js';
import { LayoutUnaColumna } from './layout.unaColumna.js';
import { LayoutDosColumnas } from './layout.dosColumnas.js';

// Exportamos cada layout individualmente
export { LayoutPortada } from './layout.portada.js';
export { LayoutUnaColumna } from './layout.unaColumna.js';
export { LayoutDosColumnas } from './layout.dosColumnas.js';

// También exportamos un array con todos para facilitar el registro
export const todosLosLayouts = [
  new LayoutPortada(),
  new LayoutUnaColumna(),
  new LayoutDosColumnas()
];

// Tipo útil: la unión de todos los tipos de layout
export type TipoLayout = 
  | LayoutPortada['tipo']
  | LayoutUnaColumna['tipo']
  | LayoutDosColumnas['tipo'];
