import {Component, Input, OnInit} from '@angular/core';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {ShowcaseDialogComponent} from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import {UpdateCabinetComponent} from '../update-cabinet/update-cabinet.component';
import {NbDialogService} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateLawyerComponent} from '../create-lawyer/create-lawyer.component';
import {DeleteLawyerComponent} from '../delete-lawyer/delete-lawyer.component';

@Component({
  selector: 'ngx-cabinet-details',
  templateUrl: './cabinet-details.component.html',
  styleUrls: ['./cabinet-details.component.scss'],
})
export class CabinetDetailsComponent implements OnInit {
  @Input() title: string ;
  @Input() id: string ;
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
  @Input() tel: [];
  @Input() fax: string ;
  @Input() nif: string ;
  @Input() rib: string ;
  @Input() cabinet_predilection_domains: any[] ;
  @Input() lawyers: any[] ;
  wilaya: string;
  constructor(private service: SmartTableData , private dialogService: NbDialogService ,
              private route: ActivatedRoute , private router: Router) {
      const id = this.route.snapshot.params['id'] ;
      this.service.cabinet_details(id ).then((cabinet) => {
          this.title = 'Cabinet Details ' ;
          this.id = cabinet[0].id ;
          this.cabinet_ref = cabinet[0].cabinet_ref ,
          this.join_date = cabinet[0].join_date ;
          this.legal_name = cabinet[0].legal_name;
          this.commercial_name = cabinet[0].commercial_name ;
          this.cabinet_short_desc = cabinet[0].cabinet_short_desc ;
          this.cabinet_long_desc = cabinet[0].cabinet_long_desc ;
          this.membership_status = cabinet[0].membership_status ;
          this.domiciliation = cabinet[0].domiciliation ;
          this.email = cabinet[0].email ;
          this.tel = cabinet[0].tel ;
          this.fax = cabinet[0].fax ;
          this.nif = cabinet[0].nif ;
          this.rib = cabinet[0].rib ;
          this.wilaya = cabinet[0].wilaya ;
          this.membership_status = cabinet[0].membership_status;
          this.cabinet_predilection_domains = cabinet[0].cabinet_predilection_domains ;
          this.lawyers = cabinet[0].lawyers ;
    }).catch( (error) => {
    }) ;
  }

  ngOnInit(): void {
  }

    update() {
      this.dialogService.open(UpdateCabinetComponent, {
            context: {
                title: 'Cabinet Details ',
                id:  this.id ,
                cabinet_ref: this.cabinet_ref ,
                join_date:  this.join_date ,
                legal_name:  this.legal_name ,
                commercial_name:  this.commercial_name ,
                cabinet_short_desc: this.cabinet_short_desc ,
                cabinet_long_desc:  this.cabinet_long_desc ,
                logo_pic:  this.logo_pic ,
                membership_status: this.membership_status ,
                domiciliation: this.domiciliation ,
                email:  this.email ,
                tel:  this.tel ,
                fax:  this.fax ,
                nif:  this.nif ,
                rib:  this.rib ,
                wilaya_code: this.wilaya,
            },
        });

  }

    laywer_detail(laywer_id): void {
        this.router.navigate(['/pages/avokap/lawyer-details/' + laywer_id]);
   }
    delete_lawyer(i: number): void {
        this.dialogService.open(DeleteLawyerComponent  , {
            context : {
                avk_ref: this.lawyers[i].avokap_ref ,
                role_cabinet: this.lawyers[i].role_cabinet ,
                first_name: this.lawyers[i].user.first_name ,
                last_name: this.lawyers[i].user.last_name ,
                cabinetId: this.id,
                lawyerId: this.lawyers[i].id,
                },
        });
  }
    create(): void {
        this.dialogService.open(CreateLawyerComponent, {
        context : {
          cabinet_ref: this.cabinet_ref,
          commercial_name: this.commercial_name,
          legal_name: this.legal_name,
          id_cabinet: this.id,
        },
        });
    }

}
