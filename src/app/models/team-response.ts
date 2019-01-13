import { BaseSubjectResponse } from './subject-response';

export interface SportTeamResponse extends BaseSubjectResponse {
    team: {
        name: string;
        abbreviation: string;
    };
}
