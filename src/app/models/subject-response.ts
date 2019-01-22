import { QuestionTopic } from './question-topics-response';

export interface BaseSubjectResponse {
    subjectId: number;
    subjectType: string;
    externalId: string;
    topic: QuestionTopic;
    created: string;
    updated: string;
}
