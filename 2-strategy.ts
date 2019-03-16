interface Filter {
    exec(val: number[]) : number[];
}

interface CompositionStrategy {
    compose(firstArr: number[], secArray: number[]): number[];
}

export class EvalFilter implements Filter {
    exec(val: number[]): number[] {
        return val.filter(number => number % 2 === 0);
    }
}

export class ModThirdFilter implements Filter {
    exec(val: number[]): number[] {
        return val.filter(number => number % 3 === 0);
    }
}

export class ComposedFilter implements Filter {
    public constructor(
        private filters: Filter[],
        private strategy: CompositionStrategy
    ) {};

    exec(val: number[]): number[] {
        let res: number[] | undefined = undefined;

        for (let filter of this.filters) {
            let filterRes = filter.exec(val);

            if (!res) {
                res = filterRes;

                continue;
            }

            res = this.strategy.compose(res, filterRes);
        }

        return res;
    }

    setComposeStrategy(strategy: CompositionStrategy): void {
        this.strategy = strategy;
    }
}

export class UnionComposeStrategy implements CompositionStrategy{
    compose(firstArr: number[], secArr: number[]): number[] {
        let presenceArr: { [prop: number]: boolean } = [];
        let res: number[] = [];

        for (let num of firstArr) {
            presenceArr[num] = true;
        }

        for (let num of secArr) {
            presenceArr[num] = true;
        }

        for (let key in presenceArr) {
            let num = Number.parseInt(key);

            if (
                !presenceArr.hasOwnProperty(num) ||
                typeof num !== 'number' ||
                !num
            ) {
                continue;
            }

            res.push(num);
        }

        return res;
    }
}


export class StrictUnionComposeStrategy implements CompositionStrategy{
    compose(firstArr: number[], secArr: number[]): number[] {
        let presenceArr: { [prop: number]: boolean } = [];
        let res: number[] = [];

        for (let num of firstArr) {
            presenceArr[num] = false;
        }

        for (let num of secArr) {
            /**
             * Means a number was present in previous array
             */
            if ( presenceArr[num] === false ) {
                presenceArr[num] = true;
            }
        }

        for (let key in presenceArr) {
            let num = parseInt(key);

            if (
                !presenceArr.hasOwnProperty(key) ||
                typeof num !== 'number' ||
                !presenceArr[key]
            ) {
                continue;
            }

            res.push(num);
        }

        return res;
    }
}
