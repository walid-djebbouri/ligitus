import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {Router} from '@angular/router';
import {ValidationService} from '../../../@core/mock/common/validation.service';

@Component({
  selector: 'ngx-update-customer-category',
  templateUrl: './update-customer-category.component.html',
  styleUrls: ['./update-customer-category.component.scss'],
})
export class UpdateCustomerCategoryComponent implements OnInit {
  @Input() custcat_Ref:  string ;
  @Input() category:  string ;
  @Input() discount:  string ;
  @Input() grace_period:  string ;
  @Input() remark: string;
  @Input() custcat_id: string;
  donne;
  Errors: string[];

  constructor(private ref: NbDialogRef<UpdateCustomerCategoryComponent> ,
              private service: BundlesCustCategoryService ,
              private router: Router,
              private Validation: ValidationService) { }

  ngOnInit(): void {
  }
  update_customer_category(custcat_id: string): void {
    this.donne = {
      'custcat_ref' : (<HTMLInputElement>document.getElementById('custcat_ref_2')).value ,
      'category' : (<HTMLInputElement>document.getElementById('category_2')).value ,
      'discount' : (<HTMLInputElement>document.getElementById('discount_2')).value ,
      'grace_period' : (<HTMLInputElement>document.getElementById('grace_period_2')).value ,
      'remark' : (<HTMLInputElement>document.getElementById('remark_2')).value ,
    };
    this.Errors = [];
    this.Errors = this.Validation.validationCreateCategory(this.donne);
    if (this.Errors.length === 0) {
      this.service.update_customer_category(this.donne , custcat_id)
          .then((category) => {
            this.ref.close(category);
          })
          .catch((error) => {});
    }

  }
  cancel(): void {
    this.ref.close();
  }
}
