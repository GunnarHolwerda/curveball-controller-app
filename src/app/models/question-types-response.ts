export interface QuestionType {
    id: number;
    title: string;
    description: string;
}

export interface QuestionTypesResponse {
    types: Array<QuestionType>;
}
