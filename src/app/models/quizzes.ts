import { IQuestionResponse } from './question';

export interface AllQuizzesResponse {
    quizzes: Array<FullQuizResponse>;
}

export interface FullQuizResponse {
    quizId: string;
    active: boolean;
    title: string;
    potAmount: number;
    completed: boolean;
    created: string;
    questions: Array<IQuestionResponse>;
}
