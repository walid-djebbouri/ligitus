import {Component, Input, OnInit, Output} from '@angular/core';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {NbDialogService} from '@nebular/theme';
import {CreateCategoryComponent} from '../create-category/create-category.component';
import {DeleteCustomerCategoryComponent} from '../delete-customer-category/delete-customer-category.component';
import {UpdateCustomerCategoryComponent} from '../update-customer-category/update-customer-category.component';
import {CreateBundleComponent} from '../create-bundle/create-bundle.component';
import {UpdateBundleComponent} from '../update-bundle/update-bundle.component';
import {DeleteBundleComponent} from '../delete-bundle/delete-bundle.component';

@Component({
  selector: 'ngx-bundles-cust-category',
  templateUrl: './bundles-cust-category.component.html',
  styleUrls: ['./bundles-cust-category.component.scss']})
export class BundlesCustCategoryComponent implements OnInit {

  bundles: any[];
  costumer_categories: any[];
  constructor(private service: BundlesCustCategoryService ,
              protected Dialogue: NbDialogService) {
    this.service.get_bundle().then((bundles) => {
      this.bundles = bundles;
      this.bundles.sort(function compare(a , b) {
        if (a.bundle_ref < b.bundle_ref)
          return -1;
        if (a.bundle_ref > b.bundle_ref )
          return 1;
        return 0;
      });
    });
    this.service.get_cust_category().then((cust) => {
      this.costumer_categories = cust;
      this.costumer_categories.sort(function compare(a , b) {
        if (a.custcat_Ref < b.custcat_Ref)
          return -1;
        if (a.custcat_Ref > b.custcat_Ref )
          return 1;
        return 0;
      });
    });
  }

  ngOnInit(): void {
  }
  walid(): void {
  }
  create_category(): void {
    this.Dialogue.open(CreateCategoryComponent , {
      context: {
        'costumer_category_reference' :  this.costumer_categories.length + 1 ,
      },
    }).onClose.subscribe(costumer_category => costumer_category && this.costumer_categories.push(costumer_category));
  }
  update_category(id: number): void {
    this.Dialogue.open(UpdateCustomerCategoryComponent , {
      context : {
        'custcat_id': this.costumer_categories[id].id,
        'custcat_Ref':  this.costumer_categories[id].custcat_Ref ,
        'category': this.costumer_categories[id].category,
        'discount': this.costumer_categories[id].discount,
        'grace_period': this.costumer_categories[id].grace_period,
        'remark': this.costumer_categories[id].remark,
      } ,
    }).onClose.subscribe(costumer_category => costumer_category && this.costumer_categories.
                  splice( id , 1 , costumer_category));
  }
  delete_category(id: number): void {
    this.Dialogue.open(DeleteCustomerCategoryComponent , {
      context : {
        'custcat_id':  this.costumer_categories[id].id ,
        'category': this.costumer_categories[id].category,
        'discount': this.costumer_categories[id].discount,
        'grace_period': this.costumer_categories[id].grace_period,
        'remark': this.costumer_categories[id].remark,
      } ,
    }).onClose.subscribe( this.costumer_categories.pop());
  }
  create_bundle(): void {
    this.Dialogue.open(CreateBundleComponent , {
      context : {
        'bundle_reference':  this.bundles.length + 1,
      },
    });
  }
  update_bundle(index: number): void {
    this.Dialogue.open(UpdateBundleComponent , {
      context : {
        'id': this.bundles[index].id,
        'bundle_ref': this.bundles[index].bundle_ref,
        'bundle_name': this.bundles[index].bundle_name,
        'plan_price': this.bundles[index].plan_price,
        'currency': this.bundles[index].currency,
        'nbmonths': this.bundles[index].nbmonths,
        'bundle_sdate': this.bundles[index].bundle_sdate,
        'bundle_edate': this.bundles[index].bundle_edate,
        'description': this.bundles[index].description,
        'quantity_max': this.bundles[index].quantity_max,
      },
    });
  }
  delete_bundle(index: number): void {
    this.Dialogue.open(DeleteBundleComponent , {
      context : {
        'id': this.bundles[index].id,
        'bundle_ref': this.bundles[index].bundle_ref,
        'bundle_name': this.bundles[index].bundle_name,
        'plan_price': this.bundles[index].plan_price,
        'currency': this.bundles[index].currency,
        'nbmonths': this.bundles[index].nbmonths,
        'bundle_sdate': this.bundles[index].bundle_sdate,
        'bundle_edate': this.bundles[index].bundle_edate,
        'description': this.bundles[index].description,
      },
    });
  }
}
