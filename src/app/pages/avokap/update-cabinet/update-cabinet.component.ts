import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import { NgForm} from '@angular/forms';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {Router} from '@angular/router';
import {ValidationService} from '../../../@core/mock/common/validation.service';

@Component({
  selector: 'ngx-update-cabinet',
  templateUrl: './update-cabinet.component.html',
  styleUrls: ['./update-cabinet.component.scss'],
})
export class UpdateCabinetComponent  {
    donne  ;
    @Input() id: string;
  @Input() title: string ;
  @Input() cabinet_ref: string ;
  @Input() join_date: string ;
  @Input() legal_name: string ;
  @Input() commercial_name: string ;
  @Input() cabinet_short_desc: string ;
  @Input() cabinet_long_desc: string ;
  @Input() logo_pic: string ;
  @Input() membership_status: string ;
  @Input() domiciliation: string ;
  @Input() email: string ;
  @Input() tel: any[] ;
  @Input() fax: string ;
  @Input() nif: string ;
  @Input() rib: string ;
  @Input() cabinet_predilection_domains: [] ;
  @Input() lawyers: [] ;
  @Input() wilaya_code: string;
  Errors: string[];


    constructor(protected ref: NbDialogRef<UpdateCabinetComponent> ,
                private service: SmartTableData ,
                private router: Router,
                private Validation: ValidationService) {}

  dismiss() {
    this.ref.close();
  }

  up_date(form: NgForm) {
      const id = form.value['id'];
      const tele = [];
      tele.push( (<HTMLInputElement>document.getElementById('tele')).value) ;
    this.donne = {
        cabinet_ref : form.value['cabinet_refe'],
        legal_name: form.value['legal_namee'] ,
        commercial_name: form.value['commercial_namee'] ,
        cabinet_short_desc: form.value['cabinet_short_desce'],
        cabinet_long_desc: form.value['cabinet_long_desce'] ,
        membership_status: form.value['membership_statuse'] ,
        domiciliation: form.value['domiciliatione'] ,
        email: form.value['emaile'] ,
        fax: form.value['faxe'] ,
        nif : form.value['nife'] ,
        rib : form.value['ribe'],
        tel : tele,
        join_date : form.value['join_datee'] + 'T00:00:00.000Z',
        wilaya : document.getElementById('wilya').innerText ,
        wilaya_code: this.wilaya_code,
    } ;
    this.Errors = [];
    this.Errors = this.Validation.validationCreateCabinet(this.donne);
    if ( this.Errors.length === 0 ) {
        this.service.totale_up_date_cabinet(this.donne , id).then(() => {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['pages/avokap/cabinet-details/' + id]);
                this.ref.close();
            });
        }).catch( (error) => {
            this.Errors = this.Validation.validationForm(error);
        } ) ;
    }
  }

}
