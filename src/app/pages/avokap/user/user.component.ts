import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../@core/mock/common/user.service';
import {Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {DeleteUserComponent} from '../delete-user/delete-user.component';
import {CreateUserComponent} from '../create-user/create-user.component';
import {ChangeStatusComponent} from '../change-status/change-status.component';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']})
export class UserComponent implements OnInit {
Users: any[];
Users_const: any[];
Customer_Category: any[];
category_selected;
first_date_empty = true;
loading: boolean = true;
selected_status: string;
colorClass: string ;
  constructor(private service: UserService ,
              private router: Router ,
              private Dialogue: NbDialogService ,
              private sr: SmartTableData ,
              private Custemer_Categories: BundlesCustCategoryService ) {
    this.Custemer_Categories.get_cust_category().then((cust_cat) => {
        this.Customer_Category = cust_cat ;
    }).catch((error) => {});
    this.service.get_users()
        .then((users) => {
          this.loading = false;
          this.Users = users;
          this.Users_const = users;
        })
        .catch((error) => {});
  }
  ngOnInit(): void {}
    active(): void {
        const first_date = (<HTMLInputElement>document.getElementById('first_date')).value ;
        if (first_date !== '') {
            this.first_date_empty = false;
        } else {
            this.first_date_empty = true;
            (<HTMLInputElement>document.getElementById('second_date')).value = null ;
        }
    }
    format_date(date: string): string {
        const date_format = new Date(date);
        return  (date_format.getFullYear() + '-' + date_format.getMonth() + '-' + date_format.getDate()) ;
    }
    reset_password(user_id: string): void {
      this.Dialogue.open(ResetPasswordComponent , {
          context: {
              'user_id' : user_id,
          },
      });
    }
    go_to_lawyer(id: string): void {
        this.sr.get_cabinet_of_lawyer(id)
            .then((cabinet) => {
                this.router.navigate(['/pages/avokap/lawyer-details/' + cabinet[0].lawyer.id ]);
            })
            .catch((error) => {});
    }
    filter(value, type: string): void {
      let info ;
      if (type === 'Category' || type === 'Roles' || type === 'Membership' ) {
           info = this.category_selected ;
      } else {
           info = (<HTMLInputElement> value.target).value;
      }
      const re = new RegExp(info , 'i');
        if ( info === '') {
            this.Users = this.Users_const ;
        } else {
            this.Users = [];
            switch (type) {
                case ('Avokap Reference') : {
                    this.Users = this.Users_const.filter(user => {
                        if ( user.lawyer ) {
                           return  user.lawyer.avokap_ref.match(re) ;
                        }
                    }  );
                    break;
                }
                case ('First Name') : {
                    this.Users = this.Users_const.filter(user =>
                        user.first_name.match(re));
                    break;
                }
                case ('First Name Local') : {
                    this.Users = this.Users_const.filter(user =>
                        user.first_name_local.match(re));
                    break;
                }
                case ('Roles') : {
                    this.Users = this.Users_const.filter(  user => {
                         return  user.roles[0].match(re)  ;
                    } );
                    break;
                }
                case ('Category') : {
                    this.Users = this.Users_const.filter(user => {
                        if (user.lawyer) {
                           return  user.lawyer.category.match(re);
                        }
                    });
                    break;
                }
                case ('Last Name') : {
                    this.Users = this.Users_const.filter(user =>
                        user.last_name.match(re));
                    break;
                }
                case ('Last Name Local') : {
                    this.Users = this.Users_const.filter(user =>
                        user.last_name_local.match(re));
                    break;
                }
                case ('Membership') : {
                    this.Users = this.Users_const.filter(user => {
                        if (user.userStatuses) {
                            return   user.userStatuses[0].status.match(re);
                        }});
                    break;
                }
                case ('Joint Date') : {
                    const first_date = (<HTMLInputElement>document.getElementById('first_date')).value;
                    const second_date = (<HTMLInputElement>document.getElementById('second_date')).value;
                    if ( first_date !== '' && second_date !== '' ) {
                        this.Users = this.Users_const.filter(user => {
                            if ( user.memberships) {
                                const endDate = new Date(user.memberships[0].plan_edate);
                                if (
                                    endDate
                                    >= new Date(first_date) &&
                                    new Date(endDate.getFullYear(), endDate.getMonth()  , endDate.getDate())
                                    <=  new Date(second_date)
                                ) {
                                    return user ;
                                }
                            }
                        } );
                        break;
                    } else {
                        this.Users = this.Users_const;
                    }
                }
            }
        }
    }
    delete_user(user_id: number): void {
      this.Dialogue.open(DeleteUserComponent , {
          context :  {
              userId : this.Users[user_id].id,
              first_name : this.Users[user_id].first_name,
              last_name : this.Users[user_id].last_name,
              email : this.Users[user_id].email,
              role : this.Users[user_id].roles[0],
          },
      });
  }
  rest(): void {
        this.Users = this.Users_const ;
        this.category_selected = '';
  }
    create_user(): void {
      this.Dialogue.open(CreateUserComponent , {
          context : {} ,
      } ).onClose.subscribe(user => user && this.Users_const.push(user));
    }
    change_status(i: number): void {
      this.Dialogue.open(ChangeStatusComponent , {
          context : {
              UserId : this.Users[i].id,
              status : this.Users[i].userStatuses[this.Users[i].userStatuses.length - 1].status,
          },
      }).onClose.subscribe(status => status && this.Users[i].userStatuses.push(status) );
    }

    membershipEnDate(date: string): string {
        const currentDate = new Date( );
        const endDate = new Date(date);
        // @ts-ignore
        let difference: number | string = endDate - currentDate ;
        const days =  difference / 86400000  ;
        const month  = days / 30 ;
        const year = month / 12 ;
        difference =  Math.floor(days).toString() + ' day' ;
        this.colorClass = 'text-warning border-warning';

        if ( -30 < days && days <= 0) {
            difference = Math.trunc(days).toString() + ' day';
            this.colorClass = 'text-danger border-danger';
        }


        if (- days > 30) {
            difference = Math.trunc(month).toString() + ' month' ;
            this.colorClass = 'text-danger border-danger';
        }

        if (- month >= 12) {
            difference = Math.trunc(year).toString() + ' year' ;
            this.colorClass = 'text-danger border-danger';
        }

        if (0 < days  && days < 7) {
            difference = Math.floor(days).toString() + ' day' ;
            this.colorClass = 'text-warning border-warning';
        }

        if (days > 7) {
            difference = Math.floor(days).toString() + ' day' ;
            this.colorClass = 'text-primary border-primary';
        }

        if (days > 30) {
            difference = Math.floor(month).toString() + ' month' ;
            this.colorClass = 'text-primary border-primary';
        }

        if (month >= 12) {
            difference = Math.floor(year).toString() + ' year' ;
            this.colorClass = 'text-success border-success';
        }

        return difference.toString() ;
    }


    pagesNumber(): number {
        const pageNumber =   this.Users.length / 10 ;
        if ( (pageNumber - Math.trunc(pageNumber)) === 0 ) {
            return  Math.trunc(pageNumber) ;
        } else {
            return  Math.ceil(pageNumber) ;
        }
    }


}
