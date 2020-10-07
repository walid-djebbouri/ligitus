import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbIconLibraries} from '@nebular/theme';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ngx-create-cabinet',
  templateUrl: './create-cabinet.component.html',
  styleUrls: ['./create-cabinet.component.scss'],
})
export class CreateCabinetComponent implements OnInit {
  @Input() title: string ;
  tel ;
  tels = [] ;
  nb_tel = 0 ;
  cpd;
  cdps = [] ;
  nb_cpd = 0 ;
  donne ;

  constructor(protected ref: NbDialogRef<CreateCabinetComponent> , private service: SmartTableData ,
              iconsLibrary: NbIconLibraries) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
  }
  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }

  create_cabinet(form: NgForm): void {
    while (this.nb_tel >= 0 ) {
      this.tels.push((<HTMLInputElement>document.getElementById('tele' + this.nb_tel)).value );
      this.nb_tel-- ;
    }
    while (this.nb_cpd >= 0 ) {
      this.cpd = {
        'law_cat' : (<HTMLInputElement>document.getElementById('lawcat' + this.nb_cpd)).value ,
        'jur_domain' : (<HTMLInputElement>document.getElementById('jurdomain' + this.nb_cpd)).value,
      } ;
      this.cdps.push(this.cpd);
      this.nb_cpd-- ;
    }
    this.donne = {
      'cabinet_ref' : form.value['cabinet_refe'],
      'legal_name': form.value['legal_namee'] ,
      'commercial_name': form.value['commercial_namee'] ,
      'cabinet_short_desc': form.value['cabinet_short_desce'],
      'cabinet_long_desc': form.value['cabinet_long_desce'] ,
      'membership_status': form.value['membership_statuse'] ,
      'domiciliation': form.value['domiciliatione'] ,
      'email': form.value['emaile'] ,
      'fax': form.value['faxe'] ,
      'nif' : form.value['nife'] ,
      'rib' : form.value['ribe'] ,
      'tel' : this.tels,
      'cabinet_predilection_domains' : this.cdps} ;
     this.service.create_cabinet(this.donne).then(() => {
     }).catch( (error) => {
     });
  }
  ajouter_tel(): void {
    this.nb_tel++ ;
    this.tel = document.getElementById('tel');
    this.tel.insertAdjacentHTML('beforeend' , '<div class="form-group row">\n' +
        '                            <label for="tele" class="label col-sm-6 col-form-label">tel :</label>\n' +
        '                            <div class="col-sm-6">\n' +
        '                                <input  type="text" class="form-control" id="tele' + this.nb_tel + '" name="tele0"  >\n' +
        '                            </div>\n' +
        '                        </div>') ;
  }
  supprimer_tel(): void {
    if (this.nb_tel > 0) {
      this.nb_tel-- ;
      this.tel = document.getElementById('tel');
      this.tel.removeChild(this.tel.lastChild) ;
    }
  }

  ajouter_cpd(): void {
    this.nb_cpd++ ;
    document.getElementById('CPD').insertAdjacentHTML('beforeend', '<div class="form-group row">\n' +
        '                            <div class="col-6">\n' +
        '                            <label for="lawcat0" class="label col-sm-6 col-form-label">Law Cat :</label>\n' +
        '                                <input  type="text" class="form-control" id="lawcat' + this.nb_cpd + '"  ngModel  >\n' +
        '                            </div>\n' +
        '                            <div class="col-6">\n' +
        '                                <label for="jurdomain0" class="label col-sm-6 col-form-label">Jur Domain :</label>\n' +
        '                                <input  type="text" class="form-control" id="jurdomain' + this.nb_cpd + '"  ngModel  >\n' +
        '                            </div>\n' +
        '                        </div>');
  }
  supprimer_cpd(): void {
    if ( this.nb_cpd >= 0 ) {
      this.nb_cpd-- ;
      document.getElementById('CPD').removeChild(document.getElementById('CPD').lastChild) ;
    }
  }
}
