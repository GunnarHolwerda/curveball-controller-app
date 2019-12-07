import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Env } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { SubjectTypeTopicResponse } from '../models/subject-type-topic-response';
import { AccountStoreService } from '../stores/account-store.service';

export interface SubjectOptions {
  startDate?: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends ApiService {

  constructor(http: HttpClient, env: Env, accountStore: AccountStoreService) {
    super(http, env, accountStore);
  }

  public subjectsForTopicAndType<TQResponse, TCResponse>(
    topic: number, typeId: number, options: SubjectOptions = {}
  ): Promise<SubjectTypeTopicResponse<TQResponse, TCResponse>> {
    const requestOptions = { ...options };
    if (requestOptions.startDate === undefined) {
      requestOptions.startDate = this.dateAtMidnight().toISOString();
    }
    if (requestOptions.endDate === undefined) {
      const tomorrow = new Date(new Date().setDate((new Date().getDate()) + 1));
      requestOptions.endDate = this.dateAtMidnight(tomorrow).toISOString();
    }

    return this.get<SubjectTypeTopicResponse<TQResponse, TCResponse>>('/subjects', {
      params: {
        topicId: topic.toString(),
        typeId: typeId.toString(),
        ...requestOptions
      }
    });
  }

  private dateAtMidnight(date: Date = new Date()): Date {
    return new Date(date.setHours(0, 0, 0, 0));
  }
}
