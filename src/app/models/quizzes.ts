import { IQuestionResponse } from './question';
import { IUser } from './user';

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
    auth: boolean;
    deleted: boolean;
}
export interface FullQuizResponse extends IQuizResponse {
    questions: Array<IQuestionResponse>;
}

export interface QuizCompleteResponse {
    users: Array<IUser>;
    amountWon: string;
}
