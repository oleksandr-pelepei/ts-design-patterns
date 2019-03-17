interface Builder {
    reset(): void;

    step1(): this;
    step2(): this;
    step3(): this;

    getResult(): {};
}

class BusinessStrategy {
    market: boolean;

    profit: number;
}

class BusenessStrategyBuilder implements Builder {
    strategy: BusinessStrategy = new BusinessStrategy();

    getResult(): BusinessStrategy {
        const res = this.strategy;

        this.reset();

        return res;
    }

    reset(): void {
        this.strategy = new BusinessStrategy();
    }

    step1() {
        this.strategy.market = true;

        return this;
    }

    step2() {
        this.strategy.profit = 12;

        return this;
    }

    step3() {
        return this;
    }
}

class Director {
    constructor(protected builder: Builder) {}

    setBuilder(builder: Builder) {
        this.builder = builder;
    }

    getWeak() {
        return this.builder.step1().getResult();
    }

    getStrong() {
        return this.builder.step1().step2().step3().getResult();
    }
}
