class Controler{
    constructor() {
        this.figures = [];
        this.totalSquare = null;
    }
    getAmount() {
        return this.figures.length;
    }

    getSquare() {
        return this.totalSquare = this.figures.reduce((acc, figure) => {
            return acc + figure.squarePixels;
        }, 0).toFixed(2);
    }
    setData(data) {
        this.figures = data;
    }
};

export const controler = new Controler();