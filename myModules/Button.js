class Button {
  getElement (id, config) {
    return document.getElementById(id).onclick = function() {
      switch(id) {
        case 'buttIncreace':
          config.perSecond++;
          break;
        case 'buttDecreace':
          if (config.perSecond > 0) config.perSecond--;
          break;
        case 'gravUp':  
          config.gravity++;
          break;
        case 'gravDown':
          if (config.gravity > 0) config.gravity--;
          break;
      }
    }
  }
};
  
export const button = new Button();
