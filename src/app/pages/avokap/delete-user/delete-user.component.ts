import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {UserService} from '../../../@core/mock/common/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  @Input() userId: string;
  @Input() last_name: string;
  @Input() first_name: string;
  @Input() email: string;
  @Input() role: string;
  constructor(private ref: NbDialogRef<DeleteUserComponent> ,
              private user_service: UserService ,
              private router: Router) { }

  ngOnInit(): void {
  }

  delete_user(): void {
    this.user_service.delete_user(this.userId).
    then(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/pages/avokap/user' ]  );
        this.ref.close();
      });


    }).
    catch((error) => {});
  }
  dismiss(): void {
    this.ref.close();
  }
}
