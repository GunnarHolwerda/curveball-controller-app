import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SubjectService } from 'src/app/services/subject.service';
import { QuestionTopic } from 'src/app/models/question-topics-response';
import { QuestionType } from 'src/app/models/question-types-response';
import { SportGameResponse } from 'src/app/models/game-response';
import { SportTeamResponse } from 'src/app/models/team-response';
import { SubjectTypeTopicResponse } from 'src/app/models/subject-type-topic-response';

@Component({
  selector: 'cb-spread-question-creator',
  templateUrl: './spread-question-creator.component.html',
  styleUrls: ['./spread-question-creator.component.css']
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
          return { label: `${game.home.team.name} vs. ${game.away.team.name}`, subjectId: s.id };
        });
      });
    }
  }

  ngOnInit() {
    this.detailsForm = new FormGroup({
      question: new FormControl(null, [Validators.required, Validators.maxLength(64)]),
      ticker: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      subjectId: new FormControl(null, [Validators.required]),
      choices: new FormArray([this.createChoice()])
    });

    this.detailsForm.controls['subjectId'].valueChanges.subscribe((value) => {
      this.teams = {
        home: this.subjectResponse.questionSubjects.find(g => g.id === value).game.home,
        away: this.subjectResponse.questionSubjects.find(g => g.id === value).game.away
      };
    });
  }

  createChoice(): FormGroup {
    return new FormGroup({
      text: new FormControl('', [Validators.required, Validators.maxLength(64)]),
      subjectId: new FormControl(null, [Validators.required]),
      isAnswer: new FormControl(false)
    });
  }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }

  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }

}
