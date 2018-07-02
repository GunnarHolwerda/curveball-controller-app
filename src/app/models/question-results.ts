export interface QuestionResults {
    totalAnswers: number;
    results: {
        [choiceId: string]: number;
    };
}
