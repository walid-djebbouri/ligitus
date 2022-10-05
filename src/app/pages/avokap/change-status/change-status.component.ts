import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {UserService} from '../../../@core/mock/common/user.service';

@Component({
  selector: 'ngx-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss'],
})
export class ChangeStatusComponent implements OnInit {
  @Input() UserId: string;
  @Input() status: string;
  Data;
  listOfStatus = ['ACTIVE' , 'ONHOLD' , 'TERMINATED'];
  selected_status: string;
  constructor(private ref: NbDialogRef<ChangeStatusComponent> ,
              private userService: UserService) {}
  ngOnInit(): void {
    this.listOfStatus = this.listOfStatus.filter(status => status !== this.status);
  }
   padLeadingZeros(num, size) {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

  confirm_change(): void {
    const  date = new Date();
    this.Data = {
      'userId': this.UserId ,
      'status': this.selected_status,
      'status_date':
          date.getFullYear() + '-' +
          this.padLeadingZeros((date.getMonth() + 1) , 2) + '-' +
          this.padLeadingZeros( date.getDate() , 2)     + 'T' +
          this.padLeadingZeros(date.getHours() , 2)     + ':' +
          this.padLeadingZeros(date.getMinutes() , 2)   + ':' +
          this.padLeadingZeros(date.getSeconds() , 2)   + '.' +
          this.padLeadingZeros(date.getMinutes() , 3)   + 'Z' ,
      'status_remark': (<HTMLInputElement>document.getElementById('remark-status')).value ,
    } ;
    this.userService.change_status(this.Data).
    then((status) => {
      this.ref.close(status);
    }).
    catch((error) => {});
  }
  cancel(): void {
    this.ref.close();
  }
}
