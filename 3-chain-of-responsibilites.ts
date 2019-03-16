interface BucketInterface {
    capacity: number;

    filling: number;
}

export class Bucket implements BucketInterface {
    private _filling;

    set filling(filling: number) {
        if (filling > this.capacity) {
            throw new Error("Filling level cannot be higher than a bucket capacity.");
        }

        this._filling = filling;
    }

    get filling(): number {
        return this._filling;
    }

    constructor(
        public capacity: number = 10,
        filling: number = 0,
    ) {
        this.filling = filling;
    }
}

interface BucketOperator {
    fill(bucket: BucketInterface): BucketInterface;

    addNext(next: BucketOperator): BucketOperator;
}

abstract class BaseBucketOperator implements BucketOperator {
    protected next: BucketOperator | null;

    protected amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    fill(bucket: BucketInterface): BucketInterface {
        if (this.next) {
            this.next.fill(bucket)
        }

        return bucket;
    }

    addNext(next: BucketOperator): BucketOperator {
        this.next = next;

        return next;
    }
}

export class PoorFiller extends BaseBucketOperator {
    fill(bucket: BucketInterface): BucketInterface {
        bucket.filling += this.amount;

        return super.fill.call(this, bucket);
    }
}

export class WaterThief extends BaseBucketOperator {
    fill(bucket: BucketInterface): BucketInterface {
        bucket.filling -= this.amount;

        return super.fill.call(this, bucket);
    }
}

export class BucketMaster extends BaseBucketOperator {
    fill(bucket: BucketInterface): BucketInterface {
        bucket.capacity += this.amount;

        return super.fill.call(this, bucket);
    }
}
