import { environment } from '../../environments/environment';
import { CurveballEnvironment } from '../models/curveball-env';

export class Env implements CurveballEnvironment {
  constructor() { }

  public get production(): boolean {
    return environment.production;
  }

  public get internalToken(): string {
    return environment.internalToken;
  }

  public get realtimeEndpoint(): string {
    return environment.realtimeEndpoint;
  }

  public get quizEndpoint(): string {
    return environment.quizEndpoint;
  }
}
