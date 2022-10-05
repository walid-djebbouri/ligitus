import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import data from '../law_domain.json';
import matricule from '../matricule.json';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {Router} from '@angular/router';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {ValidationService} from '../../../@core/mock/common/validation.service';

@Component({
  selector: 'ngx-create-lawyer',
  templateUrl: './create-lawyer.component.html',
  styleUrls: ['./create-lawyer.component.scss']})
export class CreateLawyerComponent implements OnInit {

  @Input() cabinet_ref;
  @Input() commercial_name;
  @Input() legal_name;
  @Input() id_cabinet;
  Errors: string[];
  selected: string[];
  Customer_Category: any[];
  nb_cpd = 0 ;
  cpd;
  cdps = [] ;
  category_historical = [];
  Bar_Role_Historical = [];
  Special_Discount = [];
  donne;
  avokap_ref: string;
  cabinet_role = [];
  a1 = '';
  a2 = '';
  a3 = '';
  a4 = '';
  form_template = [
    {
      'type' : 'select_cat',
      'label' : 'predilection',
      'options' : [ 'Right Of Persons',
        'Criminal Law',
        'Real Estate Property Law',
        'Rural Law',
        'Environmental Law',
        'Public Law',
        'Intellectual Property Law',
        'Trade Law',
        'Corporate Law',
        'Tax Law',
        'Social Law',
        'Economic Law',
        'Enforcement Proceedings',
        'Community Law',
        'International Law',
        'Personal Data Protection',
        'Human Rights'],
      'id' : 0,
    },
  ];
  myFormGroup: FormGroup;
  formTemplate = this.form_template;
  constructor(protected ref: NbDialogRef<CreateLawyerComponent> ,
              private service: SmartTableData ,
              private router: Router ,
              private Customer_Categories: BundlesCustCategoryService ,
              private Validation: ValidationService)  {
  }

  ngOnInit(): void {
    this.Customer_Categories.get_cust_category()
        .then((customer_category) => {
          this.Customer_Category = customer_category.sort(function compare(a, b) {
            if (a.custcat_Ref < b.custcat_Ref)
              return -1;
            if (a.custcat_Ref > b.custcat_Ref )
              return 1;
            return 0;
          });
        })
        .catch(() => {});
    const group = {} ;
    this.form_template.forEach(input_template => {
      group[input_template.label] = new FormControl('');
    });
    this.myFormGroup = new FormGroup(group);
  }


  changeTheme(cat: string) {
    const predilection = [];
    const i = ((document.getElementsByName('law_cat')).length);
    for ( let j = 0 ; j < i ; j++ ) {
      predilection.push(( (<HTMLInputElement>document.getElementsByName('jur_domain')[j]).innerText) ) ;
    }
    const categor = (cat.toLowerCase()).replace(/ /g, '');
    let prd = data[categor] ;
    predilection.forEach(ele => {
      prd = prd.filter( pr =>  pr !== ele  ) ;
    });
    this.selected = prd;
  }

  ajouter_cpd(): void {
    this.nb_cpd++ ;
    const ls = {
      'type' : 'select_cat',
      'label' : null,
      'options' : null,
      'id' :  null,
    } ;
    ls.options = data['category'];
    ls.id = this.nb_cpd ;
    this.form_template.push(ls);
  }

  supprimer_cpd(index: number): void {
    this.form_template.splice(index, 1);
    this.nb_cpd-- ;
  }

  supprimer_input(i: number): void {
    (document.getElementById('pere')).removeChild(document.getElementById('div' + i ));

  }

  ajouter_category_historical(): void {
    const ls = {
      'type' : 'category_historical',
      'label' : null,
      'options' : null,
      'id' : null,
    } ;
    this.form_template.push(ls);
  }
  ajouter_bar_role_historical() {
    const ls = {
      'type' : 'bar_role_historical',
      'label' : 'dredilection',
      'options' : null,
      'id' : null,
    } ;
    this.form_template.push(ls);
  }
  ajouter_special_discount(): void {
    const ls = {
      'type' : 'special_discount',
      'label' : 'dredilection',
      'options' : null,
      'id' : null,
    } ;
    this.form_template.push(ls);
  }
  supprimer_type(type: string) {
    let stop = false ;
    let i = this.form_template.length - 1 ;
    while (!stop) {
      if ( this.form_template[i].type === type ) {
        stop = true;
        this.form_template.splice(i, 1);
      }
      i-- ;
    }
  }

  /* **************** */
  affiche (va: Event , index: number) {
    switch (index) {
      case 1 :
        this.a1 =  matricule[String(va)] ;
        break ;
      case 2 :
        this.a2 = (<HTMLInputElement> va.target).value.charAt(0).toUpperCase() ;
        break ;
      case 3 :
        this.a3 = (<HTMLInputElement> va.target).value.charAt(0).toUpperCase() ;
        break ;
      case 4 :
        this.a4 = (<HTMLInputElement> va.target).value ;
        break ;
    }
    this.avokap_ref  = 'AVK' + this.a1 + this.a2 + this.a3 + this.a4;
  }

  /******************************************************************************************************/
  create_confirmed(): void {
    const  cabinet_role = [] ;
    const category_historical = [];
    const Bar_Role_Historical = [];
    const Special_Discount = [];
    let first_name: string = null;
    let last_name: string = null;
    first_name =  ((<HTMLInputElement>document.getElementById('first_namec')).value).charAt(0).toUpperCase()
                             + ( (<HTMLInputElement>document.getElementById('first_namec')).value ).slice(1);
    last_name =    ((<HTMLInputElement>document.getElementById('last_namec')).value).charAt(0).toUpperCase()
                                + ((<HTMLInputElement>document.getElementById('last_namec')).value).slice(1) ;
    const cdps = [] ;
      cabinet_role.push({
        'role' : (<HTMLInputElement>document.getElementById('role_cabinetc')).innerText ,
        'cabinet_ref' : (<HTMLInputElement>document.getElementById('role_cab_raf')).value ,
        'from_cab_ref' : (<HTMLInputElement>document.getElementById('from_cabinet')).value ,
        'role_date' : (<HTMLInputElement>document.getElementById('role_date')).value  ,
        'remark' : (<HTMLInputElement>document.getElementById('role_remark')).value ,

      });
      cabinet_role.sort(function compare(a, b) {
        if (a.role_date > b.role_date)
          return -1;
        if (a.role_date < b.role_date )
          return 1;
        return 0;
      });
      /**        category_historical   **/
      category_historical.push({
          'category' : ( (<HTMLInputElement>document.getElementsByName('category_h')[0]).innerText) ,
          'cat_date' : (<HTMLInputElement>document.getElementsByName('cat_date')[0]).value ,
          'remark' : ( (<HTMLInputElement>document.getElementsByName('cat_remark')[0]).value),
        });
      category_historical.sort(function compare(a, b) {
        if (a.cat_date > b.cat_date)
          return -1;
        if (a.cat_date < b.cat_date )
          return 1;
        return 0;
      });
      /** Bar_Role_Historical **/
      Bar_Role_Historical.push({
        'bar_name' : ( (<HTMLInputElement>document.getElementsByName('bar_nameh')[0]).innerText) ,
        'bar_role' : (<HTMLInputElement>document.getElementsByName('bar_roleh')[0]).innerText ,
        'role_date' : ( (<HTMLInputElement>document.getElementsByName('role_date')[0]).value),
        'remark' : ( (<HTMLInputElement>document.getElementsByName('remarkb')[0]).value),
      });
      Bar_Role_Historical.sort(function compare(a, b) {
        if (a.role_date > b.role_date)
          return -1;
        if (a.role_date < b.role_date )
          return 1;
        return 0;
      });
      /** Special Discount **/
    if ( (<HTMLInputElement>document.getElementsByName('discount')[0]).value !== '') {
      Special_Discount.push({
          'discount' : ( (<HTMLInputElement>document.getElementsByName('discount')[0]).value) ,
          'start_date' : (<HTMLInputElement>document.getElementsByName('start_date')[0]).value ,
          'end_date' : ( (<HTMLInputElement>document.getElementsByName('end_date')[0]).value),
          'remark' : ( (<HTMLInputElement>document.getElementsByName('remark_discount')[0]).value),


        });
    }

    /** Predilection Domains   **/
    //  (<HTMLInputElement>document.getElementById('dom0')).innerText !== 'Jur Domain'
    if (document.getElementsByName('law_cat').length > 0 ) {
      for (let i = 0 ; i < document.getElementsByName('law_cat').length ; i++  ) {
        const ladate = new Date() ;
        this.cpd = {
          'law_cat' : (<HTMLInputElement>document.getElementsByName('law_cat')[i]).innerText ,
          'jur_domain' : (<HTMLInputElement>document.getElementsByName('jur_domain')[i]).innerText,
          'add_date' : ladate.getDate() + '/' + (ladate.getMonth() + 1) + '/' + ladate.getFullYear(),
        } ;
        cdps.push(this.cpd);
      }
    }
    this.donne = {
      'avokap_ref': this.avokap_ref,
      'roles' : ['Customer'],
      'email': (<HTMLInputElement>document.getElementById('emailc')).value,
      'password' : (<HTMLInputElement>document.getElementById('passwordc')).value,
      'first_name': first_name ,
      'last_name': last_name ,
      'first_name_local': (<HTMLInputElement>document.getElementById('first_name_localc')).value,
      'last_name_local': (<HTMLInputElement>document.getElementById('last_name_localc')).value,
      'join_date': (<HTMLInputElement>document.getElementById('join_datec')).value + 'T00:00:00.000Z',
      'address': (<HTMLInputElement>document.getElementById('addressc')).value,
      'mobile': (<HTMLInputElement>document.getElementById('mobilec')).value,
      'phone': (<HTMLInputElement>document.getElementById('phonec')).value,
      'license_num': (<HTMLInputElement>document.getElementById('license_numc')).value,
      'license_end_date': (<HTMLInputElement>document.getElementById('license_end_datec')).value + 'T00:00:00.000Z',
      'category_hist': category_historical,
      'bar_role_hist': Bar_Role_Historical,
      'cabinet_role_hist' : cabinet_role,
      'short_desc': (<HTMLInputElement>document.getElementById('short_descc')).value,
      'long_desc': (<HTMLInputElement>document.getElementById('long_descc')).value,
      'special_discount': Special_Discount,
      'cabinetId': this.id_cabinet,
      'lawyer_predilection_domains' : cdps,
    };
    this.Errors = [];
    this.Errors =  this.Validation.validationCreateLawyer(this.donne);
    if ( this.Errors.length === 0 ) {
       this.service.create_lawyer(this.donne).then( () => {
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
         this.router.navigate(['/pages/avokap/cabinet-details/' + this.id_cabinet ]);
        this.ref.close();
      });
    } ).catch( (error) => {
      this.Errors = this.Validation.validationForm(error)  ;
    } );
    }
  }

  dismiss() {
    this.ref.close();
  }


}
