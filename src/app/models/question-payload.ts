export interface ChoicePayload {
    text: string;
    isAnswer: boolean;
    subjectId: number;
}
export interface QuestionPayload {
    question: string;
    questionNum: number;
    ticker: string;
    topic: number;
    typeId: number;
    subjectId: number;
    choices: Array<ChoicePayload>;
}

export interface QuestionsPayload {
    questions: Array<QuestionPayload>;
}
