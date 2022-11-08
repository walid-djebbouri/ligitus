import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbIconLibraries} from '@nebular/theme';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import data from '../law_domain.json';
import {Router} from '@angular/router';
import {ValidationService} from '../../../@core/mock/common/validation.service';
@Component({
  selector: 'ngx-create-cabinet',
  templateUrl: './create-cabinet.component.html',
  styleUrls: ['./create-cabinet.component.scss'],
})
export class CreateCabinetComponent implements OnInit {
  @Input() title: string ;
  cabinet_ref: string;
  Errors: string[];
  tel ;
  tels = [] ;
  nb_tel = 0 ;
  cpd;
  cdps = [] ;
  nb_cpd = 0 ;
  donne ;
  a1 = '';
  a2 = '';
 selected_wilaya: string;
  selected: string[];
  nb = 0;
  form_template = [];
  myFormGroup: FormGroup;
  formTemplate = this.form_template;

  constructor(protected ref: NbDialogRef<CreateCabinetComponent> ,
              private service: SmartTableData ,
              iconsLibrary: NbIconLibraries ,
              private router: Router,
              private Validation: ValidationService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' } )
;
  }
  ngOnInit(): void {
    const group = {} ;
    this.form_template.forEach(input_template => {
      group[input_template.label] = new FormControl('');
    });
    this.myFormGroup = new FormGroup(group);

  }
  dismiss() {
    this.ref.close();
  }

  Cabinet_ref (va: Event , index: number) {
    switch (index) {
      case 1 :
        this.a1 =  String(va) ;
        break ;
      case 2 :
        this.a2 = (<HTMLInputElement> va.target).value ;
        break ;
    }
    this.cabinet_ref  = 'CAB' + this.a1 + '_' + this.a2  ;
  }
  create_cabinet(): void {
    this.cdps = [];
    this.tels = [];

    for ( let i = 0 ; i < document.getElementsByName('tele').length; i++ ) {
      this.tels.push(( <HTMLInputElement> document.getElementsByName('tele')[i] ).value );
    }

    for (let i = 0 ; i < document.getElementsByName('law_catxs').length ; i++  ) {
      const ladate = new Date() ;
      this.cpd = {
        'law_cat' : (<HTMLInputElement>document.getElementsByName('law_catxs')[i]).innerText ,
        'jur_domain' : (<HTMLInputElement>document.getElementsByName('jur_domain')[i]).innerText,
        'add_date' : ladate.getDate() + '/' + (ladate.getMonth() + 1) + '/' + ladate.getFullYear(),
      } ;
      this.cdps.push(this.cpd);
    }

    this.donne = {
       cabinet_ref : (<HTMLInputElement>document.getElementById('cabinet_refe')).value,
      legal_name: (<HTMLInputElement>document.getElementById('legal_namee')).value,
      commercial_name: (<HTMLInputElement>document.getElementById('commercial_namee')).value,
      cabinet_short_desc: (<HTMLInputElement>document.getElementById('cabinet_short_desce')).value,
      cabinet_long_desc: (<HTMLInputElement>document.getElementById('cabinet_long_desce')).value,
      join_date : (<HTMLInputElement>document.getElementById('join_datee')).value  + 'T00:00:00.000Z',
      domiciliation: (<HTMLInputElement>document.getElementById('domiciliatione')).value,
      email: (<HTMLInputElement>document.getElementById('emaile')).value,
      fax: (<HTMLInputElement>document.getElementById('faxe')).value,
      nif : (<HTMLInputElement>document.getElementById('nife')).value,
      rib : (<HTMLInputElement>document.getElementById('ribe')).value,
      tel : this.tels,
      cabinet_predilection_domains : this.cdps ,
      wilaya : document.getElementById('wilya').innerText ,
      wilaya_code: this.selected_wilaya,
    } ;
    this.Errors = [];
    this.Errors = this.Validation.validationCreateCabinet(this.donne);
    if (this.Errors.length === 0 ) {
      this.service.create_cabinet(this.donne).then(() => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/pages/avokap/cabinet-smart-table']);
          this.ref.close();
        });
      }).catch( (error) => {
        this.Errors = this.Validation.validationForm(error);
      });
    }
  }

  changeTheme(cat: string) {
    const predilection = [];
    const i = ((document.getElementsByName('law_catxs')).length);
    for ( let j = 0 ; j < i ; j++ ) {
      if (i > 1 ) {
        predilection.push(( (<HTMLInputElement>document.getElementsByName('jur_domain')[j]).innerText) ) ;
      }
    }
    const categor = (cat.toLowerCase()).replace(/ /g,'');
    let prd = data[categor] ;
    predilection.forEach(ele => {
      prd = prd.filter( pr =>  pr !== ele  ) ;
    });
    this.selected = prd;
  }

  addPredilection(): void {
    this.nb_cpd++ ;
    const ls = {
      'type' : 'select_cat',
      'label' : 'predilection',
      'options' : null,
      'id' :  null,
    } ;
    ls.options = data['category'];
    ls.id = this.nb_cpd ;
    this.form_template.push(ls);
  }


  deletePredilection(index: number): void {
    this.form_template.splice(index, 1);
    this.nb_cpd-- ;
  }


  addTel(): void {
    const ls = {
      'label': 'tel',
    } ;
    this.form_template.push(ls);
  }

  deleteTel(index: number): void {
    this.form_template.splice(index, 1);
  }

  onSubmit(): void {}



}


