import { Component, OnInit, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormControl, Validators, FormArray, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SubjectService } from 'src/app/services/subject.service';
import { QuestionTopic } from 'src/app/models/question-topics-response';
import { QuestionType } from 'src/app/models/question-types-response';
import { SportGameResponse } from 'src/app/models/game-response';
import { SportTeamResponse } from 'src/app/models/team-response';
import { SubjectTypeTopicResponse } from 'src/app/models/subject-type-topic-response';
import { QuestionDetails } from '../question-creator/question-creator.component';

interface SpreadForm {
  question: string;
  ticker: string;
  subjectId: number;
  favoredTeam: SportTeamResponse;
  spread: number;
}

@Component({
  selector: 'cb-spread-question-creator',
  templateUrl: './spread-question-creator.component.html',
  styleUrls: ['./spread-question-creator.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SpreadQuestionCreatorComponent),
    multi: true
  }]
})
export class SpreadQuestionCreatorComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() topic?: QuestionTopic;
  @Input() type?: QuestionType;
  detailsForm: FormGroup;
  subjectResponse: SubjectTypeTopicResponse<SportGameResponse, any>;
  questionSubjects: Array<{ label: string, subjectId: number }> = [];
  teams: { home: SportTeamResponse, away: SportTeamResponse };

  constructor(private subjectService: SubjectService) { }

  ngOnChanges(changes: SimpleChanges) {
    const { type, topic } = changes;
    const typeOrTopicHasChanged: boolean = !!(topic || type);
    if (((this.topic && this.type) && typeOrTopicHasChanged)) {
      this.subjectService.subjectsForTopicAndType<SportGameResponse, any>(this.topic.topicId, this.type.id).then((response) => {
        this.subjectResponse = response;
        this.questionSubjects = response.questionSubjects.map(s => {
          const { game } = s;
          return { label: `${game.home.team.name} vs. ${game.away.team.name}`, subjectId: s.subjectId };
        });
      });
    }
  }

  ngOnInit() {
    this.detailsForm = new FormGroup({
      subjectId: new FormControl(null, [Validators.required]),
      favoredTeam: new FormControl(null, Validators.required),
      spread: new FormControl(null, Validators.required)
    });

    this.detailsForm.controls['subjectId'].valueChanges.subscribe((value: number) => {
      this.teams = {
        home: this.subjectResponse.questionSubjects.find(g => g.subjectId === value).game.home,
        away: this.subjectResponse.questionSubjects.find(g => g.subjectId === value).game.away
      };
    });

    this.detailsForm.valueChanges.subscribe((value) => {
      if (this.detailsForm.invalid) {
        return null;
      }
      this.propogateChanges(this.convertToQuestionDetails(value));
    });
  }

  propogateChanges = (_: QuestionDetails) => { };

  writeValue(value: SpreadForm): void {
    if (value) {
      this.detailsForm.patchValue({ ...value });
    }
  }

  registerOnChange(fn: (details: QuestionDetails) => void): void {
    this.propogateChanges = fn;
  }

  registerOnTouched(_: any): void {
    // ignore interaction
    return;
  }

  private convertToQuestionDetails(form: SpreadForm): QuestionDetails {
    const { away, home } = this.teams;
    const { favoredTeam, spread } = form;

    const getSpreadValue = (teamId: number): string => {
      return favoredTeam.subjectId === teamId ? `-${spread}` : `+${spread}`;
    };

    return {
      question: `${home.team.name} vs. ${away.team.name}`,
      ticker: `${home.team.abbreviation} vs. ${away.team.abbreviation}`,
      subjectId: form.subjectId,
      choices: [
        { text: getSpreadValue(home.subjectId), subjectId: home.subjectId, isAnswer: false },
        { text: getSpreadValue(away.subjectId), subjectId: away.subjectId, isAnswer: false },
      ]
    };
  }

}
