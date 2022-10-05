import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-delete-bundle',
  templateUrl: './delete-bundle.component.html',
  styleUrls: ['./delete-bundle.component.scss'],
})
export class DeleteBundleComponent implements OnInit {
  @Input() bundle_ref: string;
  @Input() bundle_name: string;
  @Input() plan_price: string;
  @Input() currency: string;
  @Input() nbmonths: string;
  @Input() bundle_sdate: string;
  @Input() bundle_edate: string;
  @Input() description: string;
  @Input() id: string;

  constructor(private ref: NbDialogRef<DeleteBundleComponent> ,
              private service: BundlesCustCategoryService ,
              private router: Router) { }

  ngOnInit(): void {
  }
  update_bundle(): void {
    this.service.delete_bundle(this.id)
        .then(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['pages/avokap/bundles-cust-category']);
            this.ref.close();
          });
        })
        .catch((error) => {});
  }
  cancel(): void {
    this.ref.close();
  }

}
