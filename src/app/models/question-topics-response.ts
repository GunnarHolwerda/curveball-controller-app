export interface QuestionTopic {
    topicId: number;
    label: string;
    machineName: string;
}

export interface QuestionTopicsResponse {
    topics: Array<QuestionTopic>;
}
