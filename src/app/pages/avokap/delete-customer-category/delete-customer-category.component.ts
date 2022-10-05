import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-delete-customer-category',
  templateUrl: './delete-customer-category.component.html',
  styleUrls: ['./delete-customer-category.component.scss'],
})
export class DeleteCustomerCategoryComponent implements OnInit {
  @Input() custcat_id:  string ;
  @Input() category:  string ;
  @Input() discount:  string ;
  @Input() grace_period:  string ;
  @Input() remark: string;
  constructor(private ref: NbDialogRef<DeleteCustomerCategoryComponent>,
              private service: BundlesCustCategoryService ,
              private router: Router) { }

  ngOnInit(): void {
  }
  delete_customer_category(custId: string): void {
    this.service.delete_category(custId)
        .then(() => {
          this.ref.close();
          /* this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
             this.router.navigate(['pages/avokap/bundles-cust-category' ]);
             this.ref.close();
           });*/
        })
        .catch((error) => {});
  }
  cancel(): void {
    this.ref.close();
  }
}
