import { UnauthorizedException } from '@nestjs/common';

export class State {
    public static from(jsonString: string): State {
        try {
            const parsingResult: {
                passPhase: string;
                redirectURL: string;
            } = JSON.parse(jsonString);
            return new State(
                parsingResult.passPhase,
                parsingResult.redirectURL,
            );
        } catch (error) {
            throw new UnauthorizedException('Line callback state not match');
        }
    }

    constructor(private passPhase: string, private redirectURL: string) {}

    get redirectURLString(): string {
        return this.redirectURL;
    }

    compareTo(correctPassPhase): boolean {
        return this.passPhase === correctPassPhase;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}
