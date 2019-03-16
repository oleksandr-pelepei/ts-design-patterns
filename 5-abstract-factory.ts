interface Archer {}

export class MongolianArcher implements Archer {}

export class UkranianArcher implements Archer {}

interface Mag {}

export class MongolianMag implements Mag {}

export class UkranianMag implements Mag {}

interface Crusader {}

export class MongolianCrusader implements Crusader {}

export class UkranianCrusader implements Crusader {}

type Warior = Archer | Mag | Crusader;
type MongolianWarior = MongolianArcher | MongolianMag | MongolianCrusader;
type UkranianWarior = UkranianArcher | UkranianMag | UkranianCrusader;

abstract class ArmyFactory {
    abstract createArcher() : Archer;

    abstract createMag() : Mag;

    abstract createCrusader() : Crusader;

    constructor() {};
}

class UkranianArmyFactory extends ArmyFactory  {
    createArcher(): UkranianArcher {
        return new UkranianArcher();
    }

    createCrusader(): UkranianCrusader {
        return new UkranianCrusader();
    }

    createMag(): UkranianMag {
        return new UkranianMag();
    }
}

class MongolianFactory extends ArmyFactory {
    createArcher(): MongolianArcher {
        return new MongolianArcher();
    }

    createCrusader(): MongolianCrusader {
        return new MongolianCrusader();
    }

    createMag(): MongolianMag {
        return new MongolianMag();
    }
}

export const createOrda: () => MongolianWarior[] = (() => {
    const factory = new MongolianFactory();

    return () => {
        return createArmy(factory);
    };
})();

export const createViysko: () => UkranianWarior[] = (() => {
    const factory = new UkranianArmyFactory();

    return () => {
        return createArmy(factory);
    };
})();

function createArmy(factory: ArmyFactory) : Warior[] {
    return [
        factory.createArcher(),
        factory.createCrusader(),
        factory.createMag(),
    ];
}
