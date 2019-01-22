import { BaseSubjectResponse } from './subject-response';
import { SportTeamResponse } from './team-response';

export interface SportPlayerResponse extends BaseSubjectResponse {
    teamExternalId: string;
    team: SportTeamResponse;
    player: {
        fullName: string;
        position: string;
    };
}
