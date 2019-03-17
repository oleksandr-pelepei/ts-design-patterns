interface Program {
    programInterface: ProgramInterface;

    run(): string;
}

export class Calculator implements Program {
    constructor(
        public programInterface: ProgramInterface
    ) {}

    run(): string {
        let res = '';

        res += this.programInterface.display("Calculator");
        res += ' ';
        res += this.programInterface.close();

        return res;
    }
}

export class Tetris implements Program {
    constructor(
        public programInterface: ProgramInterface
    ) {}

    run(): string {
        let res = '';

        res += this.programInterface.display("Tetris");
        res += ' ';
        res += this.programInterface.close();

        return res;
    }
}

interface ProgramInterface {
    close(): string;

    display(test: string): string;
}

export class VisualInterface implements ProgramInterface {
    close(): string {
        return 'Closed by click on icon';
    }

    display(test: string): string {
        return `Show in a nice window: ${test}`;
    }
}

export class ConsoleInteface implements ProgramInterface {
    close(): string {
        return 'Closed by combination hot keys.';
    }

    display(test: string): string {
        return `Show in console: ${test}`;
    }
}