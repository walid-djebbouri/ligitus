import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbIconLibraries} from '@nebular/theme';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
// import data from '../law_domain.json';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'ngx-create-cabinet',
  templateUrl: './create-cabinet.component.html',
  styleUrls: ['./create-cabinet.component.scss'],
})
export class CreateCabinetComponent implements OnInit {
  @Input() title: string ;
  organisationForm: FormGroup;

  constructor(protected ref: NbDialogRef<CreateCabinetComponent> ,
              private service: SmartTableData ,
              private form: FormBuilder ,
              iconsLibrary: NbIconLibraries ,
              private router: Router) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' } )
;
  }
  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.organisationForm = this.form.group({
      organisation_ref: [null,  [Validators.required] ],
      join_date: [null, [Validators.required]],
      legal_name: [ null, [Validators.required]] ,
      commercial_name: [null, [Validators.required]] ,
      organisation_type: [null, [Validators.required]],
      org_short_desc: [null],
      org_long_desc: [null],
      nb_customers: [null, [Validators.required]] ,
      domiciliation: [null, [Validators.required]] ,
      wilaya: [null, [Validators.required]],
      wilaya_code: [null, [Validators.required]],
      email: [null, [Validators.required]],
      tel: this.form.array([]),
      fax: [null] ,
      nif: [null, [Validators.required]],
      rib: [null, [Validators.required]],
      customers: [null, [Validators.required]],


    });
  }

  get tel() {
    return this.organisationForm.controls.tel as FormArray;
  }

  public addPhone(): void {
    const phone = this.form.group({
      phone: [null, [Validators.required, Validators.pattern('^0(5|6|7)[0-9]{8,8}')]]
    });
    this.tel.push(phone);
  }

  public deletePhone(index: number): void {
    this.tel.removeAt(index);
  }

  public createOrganisation(): void {
    console.log(
        this.organisationForm.controls,
        this.organisationForm.get('organisation_ref').value ,
        this.organisationForm.get('join_date').value,
        this.organisationForm.controls.tel.value,
    );
  }

  public dismiss() {
    this.ref.close();
  }

  Cabinet_ref (va: Event , index: number) {}

  create_cabinet(): void {}

  changeTheme(cat: string) {}

  addPredilection(): void {}


  deletePredilection(index: number): void {}


  addTel(): void {}

  deleteTel(index: number): void {}

  onSubmit(): void {}



}


