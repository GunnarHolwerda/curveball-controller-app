import { IQuestionResponse } from './question';

export interface AllQuizzesResponse {
    quizzes: Array<FullQuizResponse>;
}

export interface IQuizResponse {
    quizId: string;
    active: boolean;
    title: string;
    potAmount: number;
    completed: boolean;
    created: string;
}
export interface FullQuizResponse extends IQuizResponse {
    questions: Array<IQuestionResponse>;
}
