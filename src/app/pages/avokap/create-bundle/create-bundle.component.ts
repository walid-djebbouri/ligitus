import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {Router} from '@angular/router';
import {ValidationService} from '../../../@core/mock/common/validation.service';

@Component({
  selector: 'ngx-create-bundle',
  templateUrl: './create-bundle.component.html',
  styleUrls: ['./create-bundle.component.scss']})
export class CreateBundleComponent implements OnInit {
 donnee;
 @Input() bundle_reference: number;
 Errors: string[];
  constructor(private ref: NbDialogRef<CreateBundleComponent> ,
              private service: BundlesCustCategoryService ,
              private  router: Router ,
              private Validation: ValidationService) { }

  ngOnInit(): void {
  }

  create_bundle(): void {
      this.donnee = {
      bundle_ref: (<HTMLInputElement>document.getElementById('bundle_ref_1')).value,
      bundle_name: ((<HTMLInputElement>document.getElementById('bundle_name_1')).value).trim().replace(/ /g, '_'),
      plan_price: (<HTMLInputElement>document.getElementById('plan_price_1')).value,
      currency: (<HTMLInputElement>document.getElementById('currency_1')).value,
      nbmonths: (<HTMLInputElement>document.getElementById('nbmonths_1')).value,
      bundle_sdate: (<HTMLInputElement>document.getElementById('bundle_sdate_1')).value + 'T00:00:00.000Z' ,
      bundle_edate: (<HTMLInputElement>document.getElementById('bundle_edate_1')).value + 'T00:00:00.000Z' ,
      description: (<HTMLInputElement>document.getElementById('description_1')).value,
      quantity_max: (<HTMLInputElement>document.getElementById('quantity_max_1')).value,
    };
    this.Errors = [];
    this.Errors = this.Validation.validationCreateBundle(this.donnee);
    if (this.Errors.length === 0) {
        this.service.create_bundle(this.donnee)
            .then(() => {
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['pages/avokap/bundles-cust-category']);
                this.ref.close();
              });
            })
            .catch((error) => {
                  this.Errors = this.Validation.validationForm(error) ;
            });
    }
  }
  cancel(): void {
    this.ref.close();
  }

}
