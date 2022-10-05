import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {MembershipStatusService} from '../../../@core/mock/common/membership-status.service';
import {Router} from '@angular/router';
import {ValidationService} from '../../../@core/mock/common/validation.service';

@Component({
  selector: 'ngx-create-membership',
  templateUrl: './create-membership.component.html',
  styleUrls: ['./create-membership.component.scss'],
})
export class CreateMembershipComponent implements OnInit {
  data ;
  selected ;
  selected_payment_cash = 'CASH';
  @Input()payment_ref:  string;
  @Input()lawyerId: string;
  @Input()avokap_ref: string;
  @Input()lawyer_special_discount: number;
  @Input()Category: string;
  @Input()Bundles: any[];
  @Input()Customer_Category: any[];
  @Input() membership_status_const: any[];
  Max_Quantity: number;
  membership_ref: string;
  plan_price: number;
  final_discount: number;
  Quantity: number;
  NbMonths_Of_Bundle: number ;
  plan_end_date: Date;
  start_Date: Date;
  selected_payer_type: string;
  selected_designation_ref: string;
  category_discount: number;
  billed_amount: number;
  index: number;
  Errors: string[];
  constructor(private ref: NbDialogRef<CreateMembershipComponent>,
              private service: MembershipStatusService ,
              private router: Router,
              private Validation: ValidationService,
              ) {}

  ngOnInit(): void {
    this.category_discount =  this.Customer_Category.find(category =>
        category.category.toLowerCase() === this.Category.toLowerCase()).discount;
    this.final_discount = parseFloat( ( (1 -  ( 1 - this.lawyer_special_discount / 100)
        * ( 1 - this.category_discount / 100)) * 100).toFixed(2)) ;
    this.final_discount = Math.round(this.final_discount);
  }
  membershipReference(event): void {
    const date = <HTMLInputElement>event.target.value.replace('-', '');
    const date1 =  String(date).replace('-', '');
    const index =  this.membership_status_const.filter(membership =>
         membership.plan_sdate === (<HTMLInputElement>event.target.value) + 'T00:00:00.000Z' ).length ;
    this.membership_ref = 'MEM' + date1 +  this.avokap_ref ;
    if ( index > 0 ) {
      this.membership_ref = this.membership_ref + '_' + String(index) ;
    }
    this.start_Date = new Date( String(<HTMLInputElement>event.target.value));

  }
  Bundle_Details(bundle_id: string): void {
    this.Max_Quantity = this.Bundles.find(bundle => bundle.id === bundle_id).quantity_max ;
    this.NbMonths_Of_Bundle = this.Bundles.find(bundle => bundle.id === bundle_id ).nbmonths;
    this.plan_price = this.Bundles.find(bundle => bundle.id === bundle_id ).plan_price;

  }
  max_quantity(quantity): void {
    if ( parseInt((<HTMLInputElement> quantity.target).value, 0) > this.Max_Quantity ) {
      (<HTMLInputElement>document.getElementById('quantity_1')).value = String(this.Max_Quantity)  ;
    }
    this.Quantity =  parseInt((<HTMLInputElement>document.getElementById('quantity_1')).value , 0) ;
    this.billed_amount = parseFloat(((1 - this.final_discount / 100 )  * this.Quantity * this.plan_price)
        .toFixed(2));
  }
  create_membership(): void {
    if (this.start_Date != null) {
      this.plan_end_date = new Date();
      this.plan_end_date.setFullYear(this.start_Date.getFullYear()
          + Math.trunc((this.Quantity * this.NbMonths_Of_Bundle) / 12));
      this.plan_end_date.setMonth(this.start_Date.getMonth() + ( (this.Quantity * this.NbMonths_Of_Bundle) % 12 ) );
      this.plan_end_date.setDate(this.start_Date.getDate());
    }
    this.data = {
      'quantity': this.Quantity,
      'payer_type': this.selected_payer_type,
      'lawyerId' : this.lawyerId ,
      'membership_ref' : (<HTMLInputElement>document.getElementById('membership_ref_1')).value,
      'bundle_id' : this.selected ,
      'plan_price': this.plan_price,
      'CustCat_discount': this.category_discount ,
      'special_discount': (<HTMLInputElement>document.getElementById('special_discount_1')).value,
      'final_discount':  this.final_discount,
      'billed_amount':   this.billed_amount ,
      'payment_date': (<HTMLInputElement>document.getElementById('payment_date_1')).value + 'T00:00:00.000Z' ,
      'payment_type': this.selected_payment_cash,
      'plan_sdate': this.start_Date,
      'plan_edate': this.plan_end_date,
      'remark': (<HTMLInputElement>document.getElementById('remark_1')).value,
      'payer_name':  (<HTMLInputElement>document.getElementById('payer_name_1')).value,
      'national_identity_n':  (<HTMLInputElement>document.getElementById('national_identity_n_1')).value,
      'designation_ref':  this.selected_designation_ref,
      'payment_ref':  (<HTMLInputElement>document.getElementById('payment_ref_1')).value,
    };
    this.Errors = [];
    this.Errors =  this.Validation.validationCreateMembership(this.data);
    if (this.Errors.length === 0) {
      this.service.create_membership_status(this.data)
          .then(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['pages/avokap/membership-status/' + this.lawyerId]);
              this.ref.close();
            });
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
