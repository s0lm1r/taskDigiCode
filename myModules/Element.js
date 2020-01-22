class Element {
  createElement(nameId) {
    const span = document.createElement('span');
    const parentElement = document.getElementById(nameId);
    parentElement.append(span);
    return span;
  }
}
export const element = new Element();
