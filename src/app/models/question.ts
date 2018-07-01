export interface IQuestionResponse {
    questionId: string;
    created: string;
    question: string;
    questionNum: number;
    sent: boolean;
    expired: string;
    quizId: string;
    choices: Array<IChoiceResponse>;
}

export interface IChoiceResponse {
    choiceId: string;
    questionId: string;
    text: string;
    isAnswer?: boolean;
}
