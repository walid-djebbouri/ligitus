import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-update-bundle',
  templateUrl: './update-bundle.component.html',
  styleUrls: ['./update-bundle.component.scss'],
})
export class UpdateBundleComponent implements OnInit {
  donnee;
  @Input() bundle_ref: string;
  @Input() bundle_name: string;
  @Input() plan_price: string;
  @Input() currency: string;
  @Input() nbmonths: string;
  @Input() bundle_sdate: string;
  @Input() bundle_edate: string;
  @Input() description: string;
  @Input() id: string;
  @Input() quantity_max: string;
  @Input() max_nb_case_creation_month: number;
  @Input() max_nb_audience_case: number;
  @Input() max_nb_case_enrolled: number;

  constructor(private ref: NbDialogRef<UpdateBundleComponent> ,
              private service: BundlesCustCategoryService ,
              private router: Router) { }

  ngOnInit(): void {
  }
  update_bundle(): void {
    this.donnee = {
      'bundle_ref': (<HTMLInputElement>document.getElementById('bundle_ref_2')).value,
      'bundle_name': (<HTMLInputElement>document.getElementById('bundle_name_2')).value,
      'plan_price': (<HTMLInputElement>document.getElementById('plan_price_2')).value,
      'currency': (<HTMLInputElement>document.getElementById('currency_2')).value,
      'nbmonths': (<HTMLInputElement>document.getElementById('nbmonths_2')).value,
      'bundle_sdate': (<HTMLInputElement>document.getElementById('bundle_sdate_2')).value + 'T00:00:00.000Z' ,
      'bundle_edate': (<HTMLInputElement>document.getElementById('bundle_edate_2')).value + 'T00:00:00.000Z' ,
      'description': (<HTMLInputElement>document.getElementById('description_2')).value,
      'quantity_max': (<HTMLInputElement>document.getElementById('quantity_max_2')).value,
    };
    this.service.update_bundle( this.id , this.donnee)
        .then(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['pages/avokap/bundles-cust-category']);
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
