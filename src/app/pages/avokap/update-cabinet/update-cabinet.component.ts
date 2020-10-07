import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import { NgForm} from '@angular/forms';
import {SmartTableService} from '../../../@core/mock/common/smart-table.service';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';

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
  @Input() tel: [] ;
  @Input() fax: string ;
  @Input() nif: string ;
  @Input() rib: string ;
  @Input() cabinet_predilection_domains: [] ;
  @Input() lawyers: [] ;

  constructor(protected ref: NbDialogRef<UpdateCabinetComponent> , private service: SmartTableData) {}

  dismiss() {
    this.ref.close();
  }

  up_date(form: NgForm) {
      const id = form.value['id'];
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
        'rib' : form.value['ribe'] } ;
    this.service.totale_up_date_cabinet(this.donne , id).then(() => {
    }).catch( (error) => {
    } ) ;
      this.ref.close();
  }

}
