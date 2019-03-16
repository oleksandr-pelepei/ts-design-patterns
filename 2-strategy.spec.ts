import { expect } from "chai";
import {
    ComposedFilter,
    EvalFilter,
    ModThirdFilter,
    StrictUnionComposeStrategy,
    UnionComposeStrategy
} from "./2-strategy";

describe("Strategy tests.", () => {
    it("Union strategy should return elements that a present at least in one array", () => {
        let strategy: UnionComposeStrategy = new UnionComposeStrategy();

        expect( strategy.compose([1, 2], [3, 4]) ).has.to.be.deep.eq([1, 2, 3, 4]);
    });

    it("Strict Union strategy should return elements that a present in both arrays", () => {
        let strategy: StrictUnionComposeStrategy = new StrictUnionComposeStrategy();

        expect( strategy.compose([1, 2], [3, 4]) ).has.to.be.deep.eq([]);
        expect( strategy.compose([1, 2, 5], [3, 4, 5]) ).has.to.be.deep.eq([5]);
    });
});

describe("Filters tests.", () => {
    it("Eval filter should return numbers that are divided by two without rest.", () => {
        const filter = new EvalFilter();

        expect(filter.exec([1, 2, 3, 4, 5])).has.to.be.deep.equal([2, 4]);
    });

    it("ModThirdFilter filter should return numbers that are divided by three without rest.", () => {
        const filter = new ModThirdFilter();

        expect(filter.exec([1, 2, 3, 4, 5])).has.to.be.deep.equal([3]);
    });

    it("Composed filter should work with different strategies.", () => {
        const evalFilter = new EvalFilter();
        const modThreeFilter = new ModThirdFilter();
        const unionStratey = new UnionComposeStrategy();
        const filter = new ComposedFilter([evalFilter, modThreeFilter], unionStratey);

        expect( filter.exec([1, 2, 3, 4, 5]) ).has.to.be.deep.equal( [2, 3, 4] );

        const strictStrategy = new StrictUnionComposeStrategy();

        filter.setComposeStrategy(strictStrategy);
        expect( filter.exec([1, 2, 3, 4, 5, 6]) ).has.to.be.deep.equal( [6] );
    });
});
