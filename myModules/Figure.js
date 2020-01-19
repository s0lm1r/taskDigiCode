"use strict";
import {randomInteger} from './RandomInteger.js';

class Figure {
    constructor(mainSquare = false) {
        if (mainSquare) return this._createSquare(1280, 720, 1);
    }
    
  createFigure(shape) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(Math.random() * 0xFFFFFF); 

    switch(shape) {
      case 'square': 
         return this._createSquare();
      case 'circle': 
        this._createCircle(graphics);
        break; 
      case 'triangle': 
        this._createTriangle(graphics);
        break; 
      case 'ellipse': 
        this._createEllipse(graphics);
        break;
      case 'hexagon': 
        this._createHexagon(graphics);
        break;
      case 'pentagon': 
        this._createPentagon(graphics);
        break;
      case 'random': 
        this._createRandomShape(graphics);
        break;

      
    }
    graphics.endFill();
    return graphics;
  }

  _createSquare(sideA = 100, sideB = 100, color = Math.random()) {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(color * 0xFFFFFF);
    graphics.drawRect(0, 0, sideA, sideB);
    graphics.squarePixels = sideA * sideB;
    graphics.endFill();
    return graphics;
  }

  _createCircle(graphics) {
    const radius = 50; 
    graphics.drawCircle(50, 50, 50);
    graphics.endFill();
    graphics.squarePixels = Math.PI * Math.pow(radius, 2);
  }

  _createEllipse(graphics) {
    const radius1 = 50;
    const radius2 = 25;
    graphics.drawEllipse(50, 25, radius1, radius2);
    graphics.endFill();
    graphics.squarePixels = Math.PI * radius1 * radius2;
  }
  _createTriangle(graphics) {
    const side = 100;
    graphics.drawPolygon([
      0, 0,
      side, 0,
      side, side,
      0, 0
    ]);
    graphics.endFill();
    graphics.squarePixels = (Math.pow(side, 2)) / 2;
  }

  _createHexagon(graphics) {
    const hexagonRadius = 50; 
    const hexagonHeight = hexagonRadius * Math.sqrt(3); 
    graphics.drawPolygon([
      0, hexagonHeight / 2,
      hexagonRadius / 2, hexagonHeight,
      hexagonRadius * 1.5, hexagonHeight,
      hexagonRadius * 2, hexagonHeight / 2,
      hexagonRadius * 1.5, 0,
      hexagonRadius / 2, 0,
    ]);
    graphics.squarePixels = (3 * Math.sqrt(3) / 2) * Math.pow(hexagonRadius, 2);  
  }

  _createPentagon(graphics) {
    graphics.drawPolygon([
      50, 0,
      2, 35,
      21, 90,
      79, 90,
      98, 35,
    ]);
    const side = 50 * 1.17557;  // approximately from math formula 
    graphics.squarePixels = 1.72048 * Math.pow(side, 2); // the same
  }

  _createRandomShape(graphics) {
    const side = 75;
    const radius = 25;
    graphics.drawRect(25, 25, side, side);
    graphics.drawCircle(25, 25, radius);
    graphics.drawCircle(100, 25, radius);
    graphics.drawCircle(25, 100, radius);
    graphics.drawCircle(100, 100, radius);
   

    graphics.squarePixels = (Math.PI * Math.pow(radius, 2)) * 3 + Math.pow(side, 2);
  }

}

export const myFigure = new Figure();
export default Figure;