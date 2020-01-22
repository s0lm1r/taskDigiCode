import {myFigure} from "./Figure.js";
import {controler} from "./Controler.js";
import {randomInteger} from './RandomInteger.js';

 export default class Game {
    constructor(config) {
        return this._init(config);
    }

    _init(config) {
        const app =  new PIXI.Application({width: 1280, height: 720});
        const typeShapes = ['square', 'triangle', 'circle', 'ellipse','pentagon', 'hexagon', 'random'];
        let respTime;
        let timer = 0;
        const figures = [];
        
        const mainSquare = new PIXI.Graphics();
        mainSquare.lineStyle(3, 0x0, 3);
        mainSquare.beginFill(0xFFFFFF);
        mainSquare.drawRect(0, 0, 1280, 720);
        mainSquare.endFill();
        mainSquare.interactive = true;
        mainSquare.on('pointerdown', onStartAtlas);
        app.stage.addChild(mainSquare);
      
        this.figures = figures;
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
          controler.setData(figures);
        };
        
        function addFiggure(pos = false) {
          const currFigure = myFigure.createFigure(typeShapes[randomInteger(0, typeShapes.length - 1)]);
          currFigure.pivot.set(currFigure.width/2, currFigure.height/2);
          currFigure.interactive = true;
          currFigure.buttonMode = true;
          currFigure.on('pointerdown', onStart);
          figures.push(currFigure);
          pos ? currFigure.position.set(pos.x, pos.y) : currFigure.position.set(randomInteger(50, 1230), -50);
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
        
        return app.view;
    }
   
}


