import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class ErrorService {
  private errorListener = new Subject<string>();

  // private retainStateSource = new BehaviorSubject(false);
  // currentState = this.retainStateSource.asObservable();

  // changeState(message: boolean) {
  //   this.retainStateSource.next(message)
  // }

  getErrorListener() {
    return this.errorListener.asObservable();
  }

  throwError(message: string) {
    this.errorListener.next(message);
  }

  handleError() {
    this.errorListener.next(null);
  }
}
