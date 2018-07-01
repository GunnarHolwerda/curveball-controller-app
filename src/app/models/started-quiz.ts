import { IQuizResponse } from './quizzes';
import { IQuestionResponse } from './question';

export interface QuizStartResponse {
    quiz: IQuizResponse;
    firstQuestion: IQuestionResponse;
    token: string;
}
