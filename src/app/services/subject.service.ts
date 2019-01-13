import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Env } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { SubjectTypeTopicResponse } from '../models/subject-type-topic-response';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends ApiService {

  constructor(http: HttpClient, env: Env) {
    super(http, env);
  }

  public subjectsForTopicAndType<TQResponse, TCResponse>(
    topic: number, typeId: number
  ): Promise<SubjectTypeTopicResponse<TQResponse, TCResponse>> {
    return this.get<SubjectTypeTopicResponse<TQResponse, TCResponse>>('/subjects', {
      params: {
        topicId: topic.toString(),
        typeId: typeId.toString()
      }
    });
  }
}
