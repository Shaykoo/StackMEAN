import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductPageService {

  private productInfo = new BehaviorSubject('');
  InfoObs = this.productInfo.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.productInfo.next(message);
  }

}
