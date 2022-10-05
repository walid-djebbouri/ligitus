import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {UserService} from '../../../@core/mock/common/user.service';
import {ValidationService} from '../../../@core/mock/common/validation.service';

@Component({
  selector: 'ngx-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']})
export class CreateUserComponent implements OnInit {
  selected_role: string;
  data ;
  Errors: any[];
  constructor(private ref: NbDialogRef<CreateUserComponent>,
              private user: UserService ,
              private Validation: ValidationService) { }


  ngOnInit(): void {
  }

  create_user(): void {
    let roles: string[];
    if (  this.selected_role === 'admin' ) {
      roles = ['admin' , 'support' , 'customer'];
    }
    if (  this.selected_role === 'support' ) {
      roles = ['support' , 'customer'];
    }
    if (  this.selected_role === 'customer' ) {
      roles = ['customer'];
    }
    this.data = {
      'project_ref': ['avokap'],
      'email': (<HTMLInputElement>document.getElementById('email')).value  ,
      'password': (<HTMLInputElement>document.getElementById('password')).value  ,
      'first_name': (<HTMLInputElement>document.getElementById('first_name')).value  ,
      'last_name': (<HTMLInputElement>document.getElementById('last_name')).value  ,
      'first_name_local': (<HTMLInputElement>document.getElementById('local_first_name')).value  ,
      'last_name_local': (<HTMLInputElement>document.getElementById('local_last_name')).value  ,
      'roles': roles,
      'join_date': (<HTMLInputElement>document.getElementById('joint_date')).value + 'T00:00:00.000Z' ,
    };
    this.Errors = this.Validation.validationCreateUser(this.data);
    if (this.Errors.length === 0 ) {
      this.user.create_user(this.data)
          .then((user) => {
            this.ref.close(user);
            // console.log(user);
          })
          .catch((error) => {
            this.Errors = this.Validation.validationForm(error);
          });
    }
  }
  cancel(): void {
    this.ref.close();
  }

}
