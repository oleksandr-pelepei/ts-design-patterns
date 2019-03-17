abstract class Prototype {
    abstract clone(): this;
}

export class Human extends Prototype {
    constructor(
        public legs: number,
        public arms: number,
        public beauty: number,
        public fears: { [prop: string]: boolean } = {}
    ) {
        super();
    }

    clone(): this {
        const clone = Object.create(this);

        clone.fears = Object.create(this.fears);

        return clone;
    }
}

export const simpleHuman = new Human(2, 2, 0.75, { death: true });
