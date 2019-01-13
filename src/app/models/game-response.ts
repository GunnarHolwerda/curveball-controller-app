import { SportTeamResponse } from './team-response';
import { BaseSubjectResponse } from './subject-response';

export interface SportGameResponse extends BaseSubjectResponse {
    game: {
        home: SportTeamResponse,
        away: SportTeamResponse,
        date: string;
    };
}
