import { QuestionTopic } from './question-topics-response';
import { QuestionType } from './question-types-response';

export interface IQuestionResponse {
    questionId: string;
    created: string;
    question: string;
    ticker: string;
    topic: QuestionTopic;
    type: QuestionType;
    subjectId: number;
    questionNum: number;
    sent: boolean;
    expired: string;
    quizId: string;
    choices: Array<IChoiceResponse>;
}

export interface ITokenResponse {
    token?: string;
}

export interface IChoiceResponse {
    choiceId: string;
    questionId: string;
    text: string;
    isAnswer?: boolean;
}
