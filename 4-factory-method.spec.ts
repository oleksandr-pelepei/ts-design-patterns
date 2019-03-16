import { expect } from "chai";
import {Archer, ArchersArmy, Mag, MagicArmy} from "./4-factory-method";

describe("Check factory method patter.", () => {
    it('should be different warrior types in armies.', function () {
        const magicArmy = new MagicArmy(10);
        const archerArmy = new ArchersArmy(10);

        magicArmy.getWariors().forEach((warrior) => {
            expect(warrior).is.an.instanceOf(Mag);
        });

        archerArmy.getWariors().forEach((warrior) => {
            expect(warrior).is.an.instanceOf(Archer);
        });
    });
});