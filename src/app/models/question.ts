export interface IQuestionResponse {
    questionId: string;
    created: string;
    question: string;
    ticker: string;
    sport: string;
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
