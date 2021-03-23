import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { ErrorService } from "./error.service";
// import { Subscription } from "rxjs";

// import { ErrorService } from "./error.service";

@Component({
  templateUrl: "./error.component.html",
  selector: "app-error",
  // styleUrls: ["./error.component.css"]
})
export class ErrorComponent {
  // data: { message: string };
  // private errorSub: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },
              private router: Router,
              private errorService: ErrorService) {}
  // constructor(private errorService: ErrorService) {}

  // onStateLoad(){
  //  this.errorService.changeState(false);
  // }

  // ngOnInit() {
  //   this.errorSub = this.errorService.getErrorListener().subscribe(message => {
  //     this.data = { message: message };
  //   });
  // }

  // onHandleError() {
  //   this.errorService.handleError();
  // }

  // ngOnDestroy() {
  //   this.errorSub.unsubscribe();
  // }
}
