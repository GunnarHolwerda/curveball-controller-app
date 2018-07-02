import { IChoiceResponse } from './question';

export interface QuestionsPayload {
    questions: Array<{
        question: string;
        questionNum: number;
        choices: Array<Partial<IChoiceResponse>>;
    }>;
}
