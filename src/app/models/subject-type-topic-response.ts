export interface SubjectTypeTopicResponse<TQSubject, TCSubject> {
    questionSubjects: Array<TQSubject>;
    choiceSubjects: Array<TCSubject>;
}
