import { Component, OnInit, Input, SimpleChanges, OnChanges, forwardRef } from '@angular/core';
import { QuestionDetails } from '../question-creator/question-creator.component';
import { FormGroup, FormControl, Validators, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
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
  players: Array<{ option: { label: string, subjectId: number } }>;
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
  positions: Array<string>;
  fantasyForm: FormGroup;
  playerOptions: Array<any>;
  filteredOptions: Array<Observable<string[]>> = [];
  playerFormArray: FormArray;
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
    if (topic) {
      // TODO have this be a call to the backend to retrieve details for the question type
      if (this.topic.machineName === 'nfl') {
        this.positions = ['QB', 'RB', 'WR', 'TE', 'DEF', 'FLEX'];
      } else if (this.topic.machineName === 'nba') {
        this.positions = ['G', 'F', 'C'];
      }
    }
  }

  ngOnInit() {
    this.fantasyForm = new FormGroup({
      position: new FormControl(null, [Validators.required]),
      players: new FormArray([this.createPlayerForm(), this.createPlayerForm(), this.createPlayerForm()])
    });

    this.fantasyForm.valueChanges.subscribe((value) => {
      if (this.formIsValid()) {
        this.propogateChanges(this.convertToQuestionDetails(value));
      }
    });

    this.fantasyForm.controls['position'].valueChanges.subscribe(() => {
      const playerFormArray: FormArray = this.fantasyForm.get('players') as FormArray;
      playerFormArray.patchValue([{ option: null }, { option: null }, { option: null }], { emitEvent: false });
      playerFormArray.reset();
      this.filterSubjects();
    });

    this.playerFormArray = (this.fantasyForm.get('players') as FormArray);
  }

  filterSubjects(): void {
    if (this.subjectResponse === undefined) {
      return;
    }
    const value = this.fantasyForm.controls['position'].value;
    if (!value) {
      return;
    }
    this.playerOptions = this.subjectResponse.choiceSubjects.filter((sub) => {
      if (value === 'DEF' && !sub.hasOwnProperty('player')) {
        return true;
      } else {
        if (!sub.hasOwnProperty('player')) {
          return false;
        }
        const positions = (sub as SportPlayerResponse).player.position.toLowerCase().split('-');
        return positions.find(p => p === value.toLowerCase()) !== undefined;
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
    if (option) {
      return option.label;
    }
    return '';
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

  createPlayerForm(): FormGroup {
    const group = new FormGroup({
      option: new FormControl(null, [Validators.required]),
    });
    this.filteredOptions.push(group.valueChanges
      .pipe(
        startWith({ option: '' }),
        map(value => this._filter(value))
      ));
    return group;
  }

  private _filter(value: { option: string }): Array<string> {
    if (typeof value.option === 'string') {
      const filterValue = value.option.toLowerCase();
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
      choices: players.map((p) => ({ text: p.option.label, subjectId: p.option.subjectId, isAnswer: false }))
    };
  }

  private formIsValid(): boolean {
    const baseFormIsValid = this.fantasyForm.valid;
    let playersFormIsValid = true;
    for (const playerControl of this.playerFormArray.controls) {
      if (typeof playerControl.value !== 'object') {
        playersFormIsValid = false;
      }
    }
    return baseFormIsValid && playersFormIsValid;
  }
}
