import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {Router} from '@angular/router';
import {ValidationService} from '../../../@core/mock/common/validation.service';

@Component({
  selector: 'ngx-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  @Input() costumer_category_reference: number;
  donne ;
  Errors: string[];
  constructor(protected create_category_dialogue: NbDialogRef<CreateCategoryComponent> ,
              private service: BundlesCustCategoryService ,
              private router: Router ,
              private Validation: ValidationService) { }

  ngOnInit(): void {
  }

  create_category(): void {
    this.donne = {
      'custcat_ref' : (<HTMLInputElement>document.getElementById('custcat_ref_1')).value ,
      'category' : (<HTMLInputElement>document.getElementById('category_1')).value.trim().replace(/ /g, '_') ,
      'discount' : (<HTMLInputElement>document.getElementById('discount_1')).value ,
      'grace_period' : (<HTMLInputElement>document.getElementById('grace_period_1')).value ,
      'remark' : (<HTMLInputElement>document.getElementById('remark_1')).value ,
    };
    this.Errors = [];
    this.Errors = this.Validation.validationCreateCategory(this.donne);
    if (this.Errors.length === 0) {
      this.service.create_category(this.donne).then((category) => {
      this.create_category_dialogue.close(category);
    }).catch((error) => {
           this.Errors = this.Validation.validationForm(error);
        });
    }
  }
  cancel(): void {
    this.create_category_dialogue.close();
  }

}
