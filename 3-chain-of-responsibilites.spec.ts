import {expect} from "chai";
import {Bucket, BucketMaster, PoorFiller, WaterThief} from "./3-chain-of-responsibilites";

describe("Test bucket.", () => {
    it("A bucket have to throw an error when one tries to add water more than its capacity.", () => {
        const bucket = new Bucket();

        expect(() => {
            bucket.filling = 12;
        }).to.throw;
    });
});

describe("Test chain of bucket operators.", () => {
    it(`Chain should have correct impact on the bucket.`, function () {
        const bucket = new Bucket();
        const smallSlave = new PoorFiller(1);
        const bigSlave = new PoorFiller(2);
        const thief = new WaterThief(2);
        const bucketMaster = new BucketMaster(1);

        smallSlave.addNext(bigSlave).addNext(thief).addNext(bucketMaster);
        smallSlave.fill(bucket);

        expect(bucket.filling).is.equal(1);
        expect(bucket.capacity).is.equal(11);
    });
});