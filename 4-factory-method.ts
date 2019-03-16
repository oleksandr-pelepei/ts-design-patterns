interface Warrior {
    health: number;
    strength: number;

    fight(enemy: Warrior): Warrior;
}

abstract class AbstractWarrior implements Warrior {
    health: number;
    strength: number;

    fight(enemy: Warrior): Warrior {
        enemy.health -= this.strength;

        return this;
    }
}

export class Mag extends AbstractWarrior {
    health: number = 50;
    strength: number = 10;
}

export class Archer extends AbstractWarrior {
    health: number = 75;
    strength: number = 7.5;
}

class Crusader extends AbstractWarrior {
    health: number = 100;
    strength: number = 5;
}

abstract class Army {
    protected warriors: Warrior[];

    abstract crateWarrior(): Warrior;

    defeat(enemyArmy: Army) {};

    getWariors(): Warrior[] {
        return this.warriors;
    };

    constructor(size: number) {
        this.warriors = [];

        for (let i = 0; i < size; i++) {
            this.warriors.push(
                this.crateWarrior()
            );
        }
    }
}

export class MagicArmy extends Army {
    crateWarrior(): Warrior {
        return new Mag();
    }
}

export class ArchersArmy extends Army {
    crateWarrior(): Warrior {
        return new Archer();
    }
}
