import { QuestionTopic } from './question-topics-response';

export interface BaseSubjectResponse {
    subjectId: number;
    subjectType: string;
    id: string;
    topic: QuestionTopic;
    created: string;
    updated: string;
}
