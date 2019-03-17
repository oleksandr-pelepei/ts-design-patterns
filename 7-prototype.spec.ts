import { expect } from "chai";
import {simpleHuman} from "./7-prototype";

describe("Test prototype pattern.", () => {
    it('should create a clone of the prototype', function () {
        const clone = simpleHuman.clone();

        expect(clone).is.deep.equal(simpleHuman);
    });

    it('should add new features to the clone', function () {
        const clone = simpleHuman.clone();

        clone.fears.spiders = true;

        expect(clone.arms).is.equal(simpleHuman.arms);
        expect(clone.legs).is.equal(simpleHuman.legs);
        expect(clone.fears).is.not.deep.equal(simpleHuman.fears);
    });
});