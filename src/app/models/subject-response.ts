import { QuestionTopic } from './question-topics-response';

export interface BaseSubjectResponse {
    id: number;
    topic: QuestionTopic;
    created: string;
    updated: string;
}
