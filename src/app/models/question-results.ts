export interface QuestionResults {
    totalAnswers: number;
    correctAnswer?: string;
    results: {
        [choiceId: string]: number;
    };
}
