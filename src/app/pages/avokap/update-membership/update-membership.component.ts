import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {MembershipStatusService} from '../../../@core/mock/common/membership-status.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-update-membership',
  templateUrl: './update-membership.component.html',
  styleUrls: ['./update-membership.component.scss']})
export class UpdateMembershipComponent implements OnInit {
  data ;
  selected  ;
  @Input()membership_ref: string;
  @Input()plan_price: number;
  @Input()CustCat_discount: number ;
  @Input()special_discount: number;
  @Input()final_discount: number;
  @Input()billed_amount: string;
  @Input()payment_date: string;
  @Input()payment_type: string;
  @Input()plan_sdate: string;
  @Input()plan_edate: string;
  @Input()remark: string;
  @Input()lawyerId: string;
  @Input()payer_name:  string;
  @Input()national_identity_n:  string;
  @Input()designation_ref:  string;
  @Input()payment_ref:  string;
  @Input()membership_id: string;
  @Input()Bundles: any[];
  @Input()bundle_name: string;
  @Input()bundle_id: string;
  selected_payment_cash ;

  constructor(private ref: NbDialogRef<UpdateMembershipComponent> ,
              private service: MembershipStatusService ,
              private router: Router) {}

  ngOnInit(): void {
   this.selected_payment_cash = this.payment_type ;
   this.selected = this.bundle_id;
  }
  update_membership(): void {
    this.data = {
      'membership_id': this.membership_id,
      'lawyerId' : this.lawyerId ,
      'membership_ref' : (<HTMLInputElement>document.getElementById('membership_ref_2')).value,
      'plan_price': (<HTMLInputElement>document.getElementById('plan_price_2')).value,
      'CustCat_discount': (<HTMLInputElement>document.getElementById('CustCat_discount_2')).value,
      'special_discount': (<HTMLInputElement>document.getElementById('special_discount_2')).value,
      'final_discount': (<HTMLInputElement>document.getElementById('final_discount_2')).value,
      'billed_amount': (<HTMLInputElement>document.getElementById('billed_amount_2')).value,
      'payment_date': (<HTMLInputElement>document.getElementById('payment_date_2')).value + 'T00:00:00.000Z' ,
      'payment_type': this.selected_payment_cash ,
      'plan_sdate': (<HTMLInputElement>document.getElementById('plan_sdate_2')).value + 'T00:00:00.000Z',
      'plan_edate': (<HTMLInputElement>document.getElementById('plan_edate_2')).value + 'T00:00:00.000Z',
      'remark': (<HTMLInputElement>document.getElementById('remark_2')).value,
      'bundle_id': this.selected,
      'payer_name':  (<HTMLInputElement>document.getElementById('payer_name_2')).value,
      'national_identity_n':  (<HTMLInputElement>document.getElementById('national_identity_n_2')).value,
      'designation_ref':  (<HTMLInputElement>document.getElementById('designation_ref_2')).value,
      'payment_ref':  (<HTMLInputElement>document.getElementById('payment_ref_2')).value,
    };
    this.service.update_membership(this.data)
        .then(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['pages/avokap/membership-status/' + this.lawyerId]);
            this.ref.close();
          });
        })
        .catch((error) => {
        });
  }
  cancel(): void {
    this.ref.close();
  }
}
