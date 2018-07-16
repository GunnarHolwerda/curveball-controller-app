import { IChoiceResponse } from './question';

export interface QuestionsPayload {
    questions: Array<{
        question: string;
        questionNum: number;
        ticker: string;
        sport: string;
        choices: Array<Partial<IChoiceResponse>>;
    }>;
}
