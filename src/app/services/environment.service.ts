import { environment } from '../../environments/environment';
import { CurveballEnvironment } from '../models/curveball-env';

export class Env implements CurveballEnvironment {
  private _internalToken: string;

  constructor() { }

  public get production(): boolean {
    return environment.production;
  }

  public get internalToken(): string {
    return this._internalToken;
  }

  public get realtimeEndpoint(): string {
    return environment.realtimeEndpoint;
  }

  public get quizEndpoint(): string {
    return environment.quizEndpoint;
  }

  public set internalToken(token: string) {
    this._internalToken = token;
  }
}
