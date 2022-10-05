import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import data from '../law_domain.json';
import matricule from '../matricule.json';
import {Router} from '@angular/router';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';

@Component({
  selector: 'ngx-update-lawyer',
  templateUrl: './update-lawyer.component.html',
  styleUrls: ['./update-lawyer.component.scss']})
export class UpdateLawyerComponent implements OnInit {
  @Input() id_lawyer: string;
  @Input() title: string;
  @Input() id_cabinet: string;
  @Input() cabinet_ref: string;
  @Input() legal_name: string;
  @Input() commercial_name: string;
  @Input() project_ref: string[];
  @Input() email: string;
  @Input() first_name: string;
  @Input() last_name: string;
  @Input() first_name_local: string;
  @Input() last_name_local: string;
  @Input() roles: string[];
  @Input() join_date: string;
  @Input() avokap_ref: string;
  @Input() address: string;
  @Input() mobile: string;
  @Input() phone: string;
  @Input() license_num: string;
  @Input() license_end_date: string;
  @Input() predilection_domains: any[];
  @Input() category: string;
  @Input() category_hist: any[];
  @Input() bar_name: string;
  @Input() bar_role: string;
  @Input() bar_role_hist: any[];
  @Input() role_cabinet: string;
  @Input() date_joined: string;
  @Input() short_desc: string;
  @Input() long_desc: string;
  @Input() avg_rating: string;
  @Input() special_discount: any[];
  @Input() membership_status: string;
  @Input() cabinetId: string;
  @Input() userId: string;
  @Input() custcatId: string;
  @Input() cabinet_role_hist = [];
  @Input() user_status_selected: string;
  Customer_Category: any[];
  /***********************/
  a1 ; a2 ; a3 ; a4 ;
  selected: string[];
  nb_cpd = 0 ;
  cpd;
  donne;
  Roles = [];
  Project_ref = [];
  form_template = [];
  myFormGroup: FormGroup;
  formTemplate = this.form_template;
  constructor(protected ref: NbDialogRef<UpdateLawyerComponent>,
              private service: SmartTableData,
              private router: Router,
              private Customer_Categories: BundlesCustCategoryService)  {}

  ngOnInit(): void {
    this.Customer_Categories.get_cust_category().
    then((customer_categories) => {
      this.Customer_Category = customer_categories.sort(function compare(a, b) {
        if (a.custcat_Ref < b.custcat_Ref)
          return -1;
        if (a.custcat_Ref > b.custcat_Ref )
          return 1;
        return 0;
      });
    }).catch((error) => {});
    const group = {} ;
    this.form_template.forEach(input_template => {
      group[input_template.label] = new FormControl('');
    });
    this.myFormGroup = new FormGroup(group);
  }


  changeTheme(cat: string) {
    const  predilection = [];
    if (this.predilection_domains == null) {
      this.predilection_domains = [];
    }
    this.predilection_domains.forEach(ele => {
      predilection.push(ele.jur_domain);
    }) ;
    const i = ((document.getElementsByName('law_cat_')).length);
    for ( let j = 0 ; j < i ; j++ ) {
      predilection.push((<HTMLInputElement>document.getElementsByName('jur_domain_')[j]).innerText) ;
    }
    const categor = (cat.toLowerCase()).replace(/ /g,'');
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
      'label' : 'dredilection',
      'options' : null,
      'id' :  null,
    } ;
    ls.options = data['category'];
    ls.id = this.nb_cpd ;
    this.form_template.push(ls);
  }


  supprimer_cpd(): void {
    if ( this.nb_cpd > 0 ) {
      this.nb_cpd-- ;
      this.form_template.pop();
    }
  }
  supprimer_input(i: number): void {
    (document.getElementById('pere')).removeChild(document.getElementById('div' + i ));

  }

  supprimer_sd(i: number): void {
    (document.getElementById('pere_sd')).removeChild(document.getElementById('div_sd' + i ));

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

  affiche(va: Event , index: number) {
    this.a1 = matricule[(<HTMLInputElement>document.getElementsByName('bar_namehh')[0]).value];
    this.a2 = (<HTMLInputElement>document.getElementsByName('first_name')[0]).value.charAt(0);
    this.a3 = (<HTMLInputElement>document.getElementsByName('last_name')[0]).value.charAt(0);
    this.a4 = (<HTMLInputElement>document.getElementsByName('license_num')[0]).value ;
    switch (index) {
      case 1 :
        this.a1 =  matricule[String(va)] ;
        break ;
    }
    this.avokap_ref  = 'AVK' + this.a1 + this.a2 + this.a3 + this.a4;

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
  ajouter_bar_role_historical(): void {
    const ls = {
      'type' : 'bar_role_historical',
      'label' : 'dredilection',
      'options' : null,
      'id' : null,
    } ;
    this.form_template.push(ls);
  }
  ajouter_cabinet_role(): void {
    const ls = {
    'type' : 'cabinet_roel_hist',
    'label' : 'dredilection',
    'options' : null,
    'id' : null,
  } ;
  this.form_template.push(ls);
  }
  update_lawyer(): void {
    /**        category_historical   **/
    const cdps = this.predilection_domains ;
    const category_historical = this.category_hist;
    const Bar_Role_Historical = this.bar_role_hist;
    const Special_Discount = this.special_discount ;
    const cabinet_role_historical = this.cabinet_role_hist ;
    let i = ((document.getElementsByName('role_cab_raf')).length);
    for (let j = 0 ; j < i ; j++) {
      cabinet_role_historical.push({
        'role' : (<HTMLInputElement>document.getElementsByName('role_cabinetc')[j]).innerText ,
        'cabinet_ref' : (<HTMLInputElement>document.getElementsByName('role_cab_raf')[j]).value ,
        'from_cab_ref' : (<HTMLInputElement>document.getElementsByName('from_cabinet')[j]).value ,
        'role_date' : (<HTMLInputElement>document.getElementsByName('rol_date')[j]).value  ,
        'remark' : (<HTMLInputElement>document.getElementsByName('role_remark')[j]).value ,

      });
    }
    cabinet_role_historical.sort(function compare(a, b) {
      if (a.role_date > b.role_date)
        return -1;
      if (a.role_date < b.role_date )
        return 1;
      return 0;
    });
    i = ((document.getElementsByName('category_h')).length);
    for ( let j = 0 ; j < i ; j++) {
      category_historical.push({
         'category' : ( (<HTMLInputElement>document.getElementsByName('category_h')[j]).innerText) ,
         'cat_date' : (<HTMLInputElement>document.getElementsByName('cat_date')[j]).value ,
         'remark' : ( (<HTMLInputElement>document.getElementsByName('cat_remark')[j]).value),
       });
    }
    category_historical.sort(function compare(a, b) {
      if (a.cat_date > b.cat_date)
        return -1;
      if (a.cat_date < b.cat_date )
        return 1;
      return 0;
    });
    /** Bar_Role_Historical **/
     i = ((document.getElementsByName('bar_nameh')).length);
    for ( let j = 0 ; j < i ; j++) {
      Bar_Role_Historical.push({
        'bar_name' : ( (<HTMLInputElement>document.getElementsByName('bar_nameh')[j]).innerText) ,
        'bar_role' : (<HTMLInputElement>document.getElementsByName('bar_roleh')[j]).innerText ,
        'role_date' : ( (<HTMLInputElement>document.getElementsByName('role_date')[j]).value),
        'remark' : ( (<HTMLInputElement>document.getElementsByName('remarkh')[j]).value),

      });
    }
    Bar_Role_Historical.sort(function compare(a, b) {
      if (a.role_date > b.role_date)
        return -1;
      if (a.role_date < b.role_date )
        return 1;
      return 0;
    });
    /** Special Discount **/
    i = ((document.getElementsByName('remarkd')).length);
    for ( let j = 0 ; j < i ; j++) {
      Special_Discount.push({
        'discount' : ( (<HTMLInputElement>document.getElementsByName('discount')[j]).value) ,
        'start_date' : (<HTMLInputElement>document.getElementsByName('start_date')[j]).value ,
        'end_date' : ( (<HTMLInputElement>document.getElementsByName('end_date')[j]).value)  ,
        'remark' : ( (<HTMLInputElement>document.getElementsByName('remarkd')[j]).value),
      });
    }

    Special_Discount.sort(function compare(a, b) {
      if (a.start_date > b.start_date)
        return -1;
      if (a.start_date < b.start_date )
        return 1;
      return 0;
    });
    /** Predilection Domains   **/
    while (this.nb_cpd > 0 ) {
      const ladate = new Date() ;
      this.cpd = {
        'law_cat' : (<HTMLInputElement>document.getElementById('cat' + this.nb_cpd)).innerText ,
        'jur_domain' : (<HTMLInputElement>document.getElementById('dom' + this.nb_cpd)).innerText,
        'add_date' : ladate.getDate() + '/' + (ladate.getMonth() + 1) + '/' + ladate.getFullYear(),
      } ;
      cdps.push(this.cpd);
      this.nb_cpd-- ;
    }
    this.donne = {
      'status' : this.user_status_selected ,
      'status_remark' : (<HTMLInputElement>document.getElementsByName('user-status-remark')[0]).value ,
      'roles' : ['Costumer'],
      'cabinet_ref' : (<HTMLInputElement>document.getElementsByName('cabinet_ref')[0]).value,
      'legal_name': (<HTMLInputElement>document.getElementsByName('legal_name')[0]).value,
      'commercial_name': (<HTMLInputElement>document.getElementsByName('commercial_name')[0]).value,
      'project_ref' : this.Project_ref,
      'email': (<HTMLInputElement>document.getElementsByName('email')[0]).value,
      'first_name': (<HTMLInputElement>document.getElementsByName('first_name')[0]).value,
      'last_name': (<HTMLInputElement>document.getElementsByName('last_name')[0]).value,
      'first_name_local': (<HTMLInputElement>document.getElementsByName('first_name_local')[0]).value,
      'last_name_local': (<HTMLInputElement>document.getElementsByName('last_name_local')[0]).value,
      'avokap_ref': (<HTMLInputElement>document.getElementsByName('avokap_ref')[0]).value +
          (<HTMLInputElement>document.getElementById('avokap_ref_2')).innerText ,
      'address': (<HTMLInputElement>document.getElementsByName('address')[0]).value,
      'mobile': (<HTMLInputElement>document.getElementsByName('mobile')[0]).value,
      'phone': (<HTMLInputElement>document.getElementsByName('phone')[0]).value,
      'license_num': (<HTMLInputElement>document.getElementsByName('license_num')[0]).value,
      'license_end_date': (<HTMLInputElement>document.getElementsByName('license_end_date')[0]).value
          + 'T00:00:00.000Z',
      'category_hist': category_historical,
      'category': category_historical[0].category ,
      'bar_role_hist': Bar_Role_Historical,
      'bar_role': Bar_Role_Historical[0].bar_role,
      'bar_name': Bar_Role_Historical[0].bar_name,
      'cabinet_role_hist' : cabinet_role_historical,
      'role_cabinet': cabinet_role_historical[0].role,
      'short_desc': (<HTMLInputElement>document.getElementsByName('short_desc')[0]).value,
      'long_desc': (<HTMLInputElement>document.getElementsByName('long_desc')[0]).value,
      //  'avg_rating': (<HTMLInputElement>document.getElementsByName('avg_rating')[0]).value,
      'special_discount': Special_Discount,
      'cabinetId': this.cabinetId,
      'userId': (<HTMLInputElement>document.getElementsByName('userId')[0]).value,
      'lawyer_predilection_domains' : cdps};
    this.service.up_date_lawyer(this.donne).then(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['pages/avokap/lawyer-details/' + this.id_lawyer]);
        this.ref.close();
      });
    } ).catch( (error) => {} );
  }

  dismiss() {
    this.ref.close();
  }



}
