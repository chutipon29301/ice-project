export class State {
    constructor(private passPhase: string) {}

    compareTo(correctPassPhase): boolean {
        return this.passPhase === correctPassPhase;
    }
}
