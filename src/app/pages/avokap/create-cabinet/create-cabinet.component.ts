import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbIconLibraries} from '@nebular/theme';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
// import data from '../law_domain.json';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LigitusOrganisationService} from "../../../@core/backend/common/services/ligitus-organisation.service";
@Component({
  selector: 'ngx-create-cabinet',
  templateUrl: './create-cabinet.component.html',
  styleUrls: ['./create-cabinet.component.scss'],
})
export class CreateCabinetComponent implements OnInit {
  @Input() title: string ;
  organisationForm: FormGroup;

  constructor(protected ref: NbDialogRef<CreateCabinetComponent> ,
              private organisationService: LigitusOrganisationService,
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
      organisation_ref:  [null,  [Validators.required] ],
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
      email: [null, [Validators.required, Validators.email , Validators.pattern('/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]],
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
    const Organisation = {
      organisation_ref: this.organisationForm.controls.organisation_ref.value ,
      join_date:  new Date(this.organisationForm.controls.join_date.value),
      legal_name: this.organisationForm.controls.legal_name.value ,
      commercial_name: this.organisationForm.controls.commercial_name.value ,
      organisation_type: this.organisationForm.controls.organisation_type.value,
      org_short_desc: this.organisationForm.controls.org_short_desc.value,
      org_long_desc: this.organisationForm.controls.org_long_desc.value,
      nb_customers: this.organisationForm.controls.nb_customers.value ,
      domiciliation: this.organisationForm.controls.domiciliation.value ,
      wilaya: this.organisationForm.controls.wilaya.value,
      wilaya_code: this.organisationForm.controls.wilaya.value,
      email: this.organisationForm.controls.email.value,
      tel: this.objectToStringTab(this.organisationForm.controls.tel.value),
      fax: this.organisationForm.controls.fax.value.toString(),
      nif: this.organisationForm.controls.nif.value,
      rib: this.organisationForm.controls.rib.value,
      // customers: this.organisationForm.controls.customers.value,

    } ;
   // console.log(this.organisationForm.controls.tel.value);
    this.organisationService.createOrganisation(Organisation).subscribe(
        (newOrganisation) => console.log(newOrganisation) ,
        (error) => console.log(error) );
  }

  public dismiss() {
    this.ref.close();
  }

  private objectToStringTab(phones: any[]): string[] {
    const tel = [];
    for ( let i = 0; i < phones.length ; i++) {
      tel.push(phones[i].phone.toString());
    }
    return tel;
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


