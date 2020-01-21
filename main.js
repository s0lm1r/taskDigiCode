'use strict';

import {myFigure} from "./myModules/Figure.js";
import {element} from "./myModules/Element.js";
import {button} from "./myModules/Button.js";
import {randomInteger} from './myModules/RandomInteger.js';

const app = new PIXI.Application({width: 1280, height: 720});
document.body.appendChild(app.view);

const typeShapes = ['square', 'triangle', 'circle', 'ellipse','pentagon', 'hexagon', 'random'];
const config = {
  gravity: 5,
  perSecond : 1
};
let respTime;
let timer = 0;
let totalSquare;
const figures = [];

const mainSquare = new PIXI.Graphics();
mainSquare.lineStyle(3, 0x0, 3);
mainSquare.beginFill(0xFFFFFF);
mainSquare.drawRect(0, 0, 1280, 720);
mainSquare.endFill();
mainSquare.interactive = true;
mainSquare.on('pointerdown', onStartAtlas);
app.stage.addChild(mainSquare);

const buttons = {
  buttonIncreace: button.getElement('buttIncreace', config),
  buttonDecreace: button.getElement('buttDecreace', config),
  gravityUp: button.getElement('gravUp', config),
  gravityDown: button.getElement('gravDown', config)
};

const dispAmount = element.createElement('amountFigures');
const dispSquare = element.createElement('totalSquare');
const dispValue = element.createElement('gravityValue');
const dispGenerated = element.createElement('generatedFigure');

function gameLoop(delta) {
  respTime = 60 / config.perSecond;
  timer += delta;
    if (timer > respTime) {
      timer = 0;
      addFiggure();
    }
    
  figures.forEach((figure, index) => {
    figure.y += config.gravity;
    if (figure.y > app.view.height + figure.height/2) {
      figures.splice(index, 1);
      app.stage.removeChild(figure);
    }
  });

  totalSquare = figures.reduce((acc, figure) => {
    return acc + figure.squarePixels;
  }, 0);
  dispAmount.innerHTML =  `${figures.length} figures on Scene`;
  dispSquare.innerHTML =  `total square: ${totalSquare.toFixed(2)}`;
  dispGenerated.innerHTML = `Figure per second: ${60/respTime > 1 ? Math.round(60/respTime): 60/respTime}`;
  dispValue.innerHTML = `Gravity value:${config.gravity}`;
};

function addFiggure(pos = false) {
  const currFigure = myFigure.createFigure(typeShapes[randomInteger(0, typeShapes.length - 1)]);
  currFigure.pivot.set(currFigure.width/2, currFigure.height/2);
  currFigure.interactive = true;
  currFigure.buttonMode = true;
  currFigure.on('pointerdown', onStart);
  figures.push(currFigure);
  pos ? currFigure.position.set(pos.x, pos.y) : currFigure.position.set(randomInteger(50, 1150), -50);
  app.stage.addChild(currFigure);
}

function onStart(event) {
  const currTarget = event.target;
  const index = figures.indexOf(currTarget);
  changeColor(currTarget.shape, currTarget.tint);
  app.stage.removeChild(figures[index]);
  figures.splice(index, 1);
};

function onStartAtlas(event) {
  const currPos = event.data.global;
  addFiggure(currPos);
};

function changeColor(shape, color) {
  figures
    .filter(figure => figure.shape === shape)
    .map(figure => figure.tint = color);
};

app.ticker.add(delta => gameLoop(delta))