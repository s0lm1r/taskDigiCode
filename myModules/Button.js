"use strict";

class Button {
  getElement (id, config) {
    return document.getElementById(id).onclick = function() {
      switch(id) {
        case 'buttIncreace':
          if (config.perSecond< 1) {
            config.perSecond *= 2;
          } else {
            config.perSecond++;
          };
          break;
        case 'buttDecreace': 
          if (config.perSecond< 2) {
            config.perSecond /= 2;
          } else {
            config.perSecond--;
          }
          break;
        case 'gravUp':  
          if (config.gravity < 1) {
            config.gravity *= 2;
          } else {
            config.gravity++;
          };
          break;
        case 'gravDown':
          if (config.gravity < 2) {
            config.gravity /= 2;
          } else {
            config.gravity--;
          };
          break;
      }
    }
  }
};
  
export const button = new Button();
