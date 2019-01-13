export interface SubjectTypeTopicResponse<TQSubject, TCSubject> {
    choiceSubjectType: string;
    questionSubjectType: string;
    questionSubjects: Array<TQSubject>;
    choiceSubjects: Array<TCSubject>;
}
