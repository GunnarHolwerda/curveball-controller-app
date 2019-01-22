import { Component, OnInit, Input, SimpleChanges, OnChanges, forwardRef } from '@angular/core';
import { QuestionDetails } from '../question-creator/question-creator.component';
import { FormGroup, FormControl, Validators, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuestionTopic } from 'src/app/models/question-topics-response';
import { QuestionType } from 'src/app/models/question-types-response';
import { SubjectService } from 'src/app/services/subject.service';
import { SportTeamResponse } from 'src/app/models/team-response';
import { SportPlayerResponse } from 'src/app/models/player-response';
import { SubjectTypeTopicResponse } from 'src/app/models/subject-type-topic-response';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';

interface FantasyForm {
  position: string;
  players: Array<any>;
}

@Component({
  selector: 'cb-fantasy-question-creator',
  templateUrl: './fantasy-question-creator.component.html',
  styleUrls: ['./fantasy-question-creator.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FantasyQuestionCreatorComponent),
    multi: true
  }]
})
export class FantasyQuestionCreatorComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() topic?: QuestionTopic;
  @Input() type?: QuestionType;
  fantasyForm: FormGroup;
  playerOptions: Array<any>;
  filteredOptions: Array<Observable<string[]>> = [];
  subjectResponse: SubjectTypeTopicResponse<any, SportTeamResponse | SportPlayerResponse>;

  constructor(private subjectService: SubjectService) { }

  ngOnChanges(changes: SimpleChanges) {
    const { type, topic } = changes;
    const typeOrTopicHasChanged: boolean = !!(topic || type);
    if (((this.topic && this.type) && typeOrTopicHasChanged)) {
      this.subjectService.subjectsForTopicAndType<any, SportTeamResponse | SportPlayerResponse>(this.topic.topicId, this.type.id)
        .then((response) => {
          this.subjectResponse = response;
          this.filterSubjects();
        });
    }
  }

  ngOnInit() {
    this.fantasyForm = new FormGroup({
      position: new FormControl(null, Validators.required),
      players: new FormArray([this.createPlayerForm(), this.createPlayerForm(), this.createPlayerForm()])
    });

    this.fantasyForm.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.fantasyForm.controls['position'].valueChanges.subscribe(() => {
      this.fantasyForm.controls['players'] = new FormArray([this.createPlayerForm(), this.createPlayerForm(), this.createPlayerForm()]);
      this.filterSubjects();
    });
  }

  filterSubjects(): void {
    if (this.subjectResponse === undefined) {
      return;
    }
    const value = this.fantasyForm.controls['position'].value;
    this.playerOptions = this.subjectResponse.choiceSubjects.filter((sub) => {
      if (value === 'DEF' && !sub.hasOwnProperty('player')) {
        return true;
      } else {
        return sub.hasOwnProperty('player') && (sub as SportPlayerResponse).player.position.toLowerCase() === value.toLowerCase();
      }
    }).map((sub) => {
      if (!sub.hasOwnProperty('player')) {
        const team = sub as SportTeamResponse;
        return { label: team.team.name, subjectId: team.subjectId };
      } else {
        const player = sub as SportPlayerResponse;
        return { label: player.player.fullName, subjectId: player.subjectId };
      }
    });
  }

  autocompleteDisplay(option: { label: string, subjectId: number }): string {
    return option.label;
  }

  propogateChanges = (_: QuestionDetails) => { };

  writeValue(value: FantasyForm): void {
    if (value) {
      this.fantasyForm.patchValue({ ...value });
    }
  }

  registerOnChange(fn: (details: QuestionDetails) => void): void {
    this.propogateChanges = fn;
  }

  registerOnTouched(_: any): void {
    // ignore interaction
    return;
  }

  get positions() {
    return ['QB', 'RB', 'WR', 'TE', 'DEF', 'FLEX'];
  }

  createPlayerForm(): FormControl {
    const control = new FormControl({
      subjectId: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
    });
    this.filteredOptions.push(control.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      ));
    return control;
  }

  private _filter(value: string): Array<string> {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.playerOptions.filter(option => option.label.toLowerCase().includes(filterValue));
    } else {
      return [];
    }
  }

  private convertToQuestionDetails(form: FantasyForm): QuestionDetails {
    const { position, players } = form;

    return {
      question: position,
      ticker: position,
      subjectId: null,
      choices: players
    };
  }
}
