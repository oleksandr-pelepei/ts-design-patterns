import { expect } from "chai";
import {Calculator, ConsoleInteface, Tetris, VisualInterface} from "./9-bridge";

describe("Bridge pattern tests.", () => {
    it("Different programs have to work both with visual interface and console one.", () => {
        const windowsInterface = new VisualInterface();
        const consoleInterface = new ConsoleInteface();

        const calc = new Calculator(windowsInterface);
        const tetris = new Tetris(windowsInterface);

        expect( calc.run() ).have.to.be.equal(`Show in a nice window: Calculator Closed by click on icon`);

        expect( tetris.run() ).have.to.be.equal(`Show in a nice window: Tetris Closed by click on icon`);

        calc.programInterface = consoleInterface;
        tetris.programInterface = consoleInterface;

        expect( calc.run() ).have.to.be.equal(`Show in console: Calculator Closed by combination hot keys.`);

        expect( tetris.run() ).have.to.be.equal(`Show in console: Tetris Closed by combination hot keys.`);
    });
});