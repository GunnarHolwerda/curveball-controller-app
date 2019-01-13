export interface QuestionType {
    id: number;
    title: string;
    description: string;
    machineName: string;
}

export interface QuestionTypesResponse {
    types: Array<QuestionType>;
}
