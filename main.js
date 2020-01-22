import {element} from "./myModules/Element.js";
import {button} from "./myModules/Button.js";
import Game from "./myModules/Game.js";
import {controler} from "./myModules/Controler.js";

const root = document.getElementById('root');
const config = {
  gravity: 5,
  perSecond : 1
};
root.append(new Game(config));

const buttons = {
  buttonIncreace: button.getElement('buttIncreace', config),
  buttonDecreace: button.getElement('buttDecreace', config),
  gravityUp: button.getElement('gravUp', config),
  gravityDown: button.getElement('gravDown', config)
};

document.addEventListener('click', (event) => {
  const target =  event.target;
  if (target === document.getElementById('buttIncreace')
    || target === document.getElementById('buttDecreace')) {
    dispGenerated.innerHTML = `Figure per second: ${config.perSecond}`;
};
if (target === document.getElementById('gravUp')
  || target === document.getElementById('gravDown')) {
  dispValue.innerHTML = `Gravity value: ${config.gravity}`;
}
});  

const dispAmount = element.createElement('amountFigures');
const dispSquare = element.createElement('totalSquare');
const dispValue = element.createElement('gravityValue');
const dispGenerated = element.createElement('generatedFigure');

setInterval(() => {
  dispAmount.innerHTML =  `figures on Scene ${controler.getAmount()}`;
  dispSquare.innerHTML =  `total square: ${controler.getSquare()}`;
}, 100);
dispGenerated.innerHTML = `Figure per second: ${config.perSecond}`;
dispValue.innerHTML = `Gravity value:  ${config.gravity}`;