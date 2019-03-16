import { expect } from "chai";
import {createOrda, createViysko, MongolianArcher, MongolianCrusader, MongolianMag} from "./5-abstract-factory";

describe("Test abstract factories.", () => {
    it('should similar by nation warriors.', function () {
        const orda = createOrda();
        const viysko = createViysko();

        expect(orda[0]).is.instanceOf(MongolianArcher);
        expect(orda[1]).is.instanceOf(MongolianCrusader);
        expect(orda[2]).is.instanceOf(MongolianMag);
    });
});