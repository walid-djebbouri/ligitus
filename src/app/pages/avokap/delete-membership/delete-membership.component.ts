import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {MembershipStatusService} from '../../../@core/mock/common/membership-status.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-delete-membership',
  templateUrl: './delete-membership.component.html',
  styleUrls: ['./delete-membership.component.scss'],
})
export class DeleteMembershipComponent implements OnInit {
  @Input()membership_ref: string;
  @Input()plan_price: number;
  @Input()payment_date: string;
  @Input()bundle_name: string;
  @Input()plan_edate: string;
  @Input()id: string;
  @Input()lawyer_id: string;

  constructor(private BoiteDialogue: NbDialogRef<DeleteMembershipComponent> ,
              private service: MembershipStatusService ,
              private router: Router) { }

  ngOnInit(): void {
  }
  delete_membership(): void {
    this.service.delete_membership_status(this.id)
        .then(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['pages/avokap/membership-status/' + this.lawyer_id]);
            this.BoiteDialogue.close();
          });
        })
        .catch((error) => {});
  }
  cancel(): void {
    this.BoiteDialogue.close();
  }
}
