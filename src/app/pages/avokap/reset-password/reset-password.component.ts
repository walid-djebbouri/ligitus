import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {UserService} from '../../../@core/mock/common/user.service';
@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']})
export class ResetPasswordComponent implements OnInit {
  @Input()user_id: string;
  data;
  valid_1: boolean  = false ;
  valid_2: boolean  = false ;
  error: string;
  constructor(private ref: NbDialogRef<ResetPasswordComponent> ,
              private service: UserService) { }
  ngOnInit(): void {
  }
  verify_password(type: string): void {
    const first_password = (<HTMLInputElement>document.getElementById('new_password')).value;
    switch (type) {
      case ('first') : {
        if (first_password.length < 8) {
          this.valid_1 = false;
          this.error = 'The password must be at least 8 characters long';
        } else {
          this.valid_1 = true;
          this.error = '';
          const confirm_password = (<HTMLInputElement>document.getElementById('confirm_new_password')).value;
          if (first_password !== confirm_password) {
            this.valid_2 = false;
            if ( confirm_password.length > 0 ) {
              this.error = 'The passwords do not match ';
            }
          } else {
            this.valid_2 = true ;
            this.error = '';
          }
        }
        break;
      }
      case ('second') : {
        const confirm_password = (<HTMLInputElement>document.getElementById('confirm_new_password')).value;
          if (first_password !== confirm_password) {
            this.valid_2 = false;
            this.error = 'The passwords do not match ';
          } else {
            this.valid_2 = true ;
            this.error = '';
          }
      }
        break;
      }
  }

  reset_password(): void {
   this.data = {
     'user_id' : this.user_id,
     'newpassword' : (<HTMLInputElement>document.getElementById('confirm_new_password')).value,
   };
   this.service.reset_password(this.data)
       .then(() => {
         this.ref.close();
       })
       .catch((error) => {});
  }
  cancel(): void {
    this.ref.close();
  }
}
