import {Component, Input, OnInit} from '@angular/core';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {ActivatedRoute} from '@angular/router';
import {UpdateLawyerComponent} from '../update-lawyer/update-lawyer.component';
import {NbDialogService} from '@nebular/theme';
import {CreateLawyerComponent} from '../create-lawyer/create-lawyer.component';
import {ChangeCabinetComponent} from '../change-cabinet/change-cabinet.component';

@Component({
  selector: 'ngx-lawyer-details',
  templateUrl: './lawyer-details.component.html',
  styleUrls: ['./lawyer-details.component.scss']})
export class LawyerDetailsComponent implements OnInit {
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
  @Input() id_lawyer: string;
  @Input() role_cabinet_hist: any[];
  userStatus: string = null;
  license_and_date: string;

  constructor(private service: SmartTableData , private router: ActivatedRoute ,
              private dialogService: NbDialogService ) {
      const id = this.router.snapshot.params['id'];
      const cabinet  = this.service.cabinet  ;
     const lawye = (cabinet[0].lawyers).find(lawyer => lawyer.id === id);
     this.id_lawyer = id ;
     this.cabinet_ref = cabinet[0].cabinet_ref ;
     this.legal_name = cabinet[0].legal_name ;
     this.commercial_name = cabinet[0].commercial_name;
     this.id_cabinet = cabinet[0].id;
     this.project_ref = lawye.user.project_ref;
     this.email = lawye.user.email;
     this.first_name = lawye.user.first_name;
     this.last_name = lawye.user.last_name;
     this.first_name_local = lawye.user.first_name_local;
     this.last_name_local = lawye.user.last_name_local;
     this.roles = lawye.user.roles;
     this.join_date = lawye.user.join_date;
     this.avokap_ref = lawye.avokap_ref;
     this.address = lawye.address;
     this.mobile = lawye.mobile;
     this.phone = lawye.phone;
     this.license_num = lawye.license_num;
     this.license_end_date = lawye.license_end_date;
     this.predilection_domains = lawye.predilection_domains;
     this.category = lawye.category;
     this.category_hist = lawye.category_hist;
     this.bar_name = lawye.bar_name;
     this.bar_role = lawye.bar_role;
     this.bar_role_hist = lawye.bar_role_hist;
     this.role_cabinet = lawye.role_cabinet;
     this.short_desc = lawye.short_desc;
     this.long_desc = lawye.long_desc;
     this.avg_rating = lawye.avg_rating;
     this.special_discount = lawye.special_discount;
     this.cabinetId = lawye.cabinetId;
     this.userId = lawye.userId;
     this.custcatId = lawye.custcatId;
     this.role_cabinet_hist = lawye.role_cabinet_hist ;
     if (lawye.user.userStatuses ) {
         lawye.user.userStatuses.sort(function compare(a , b) {
             if (a.status_date > b.status_date)
                 return -1;
             if (a.status_date < b.status_date )
                 return 1;
             return 0;
         } );
         this.userStatus = lawye.user.userStatuses[0].status;
     }
  }

  ngOnInit(): void {}

    update_lawyer(): void {
      this.dialogService.open(UpdateLawyerComponent, {
            context: {
                id_lawyer: this.id_lawyer,
                id_cabinet: this.id_cabinet,
                cabinet_ref: this.cabinet_ref,
                legal_name: this.legal_name,
                commercial_name: this.commercial_name,
                project_ref: this.project_ref,
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                first_name_local: this.first_name_local,
                last_name_local: this.last_name_local,
                roles: this.roles,
                join_date: this.join_date,
                avokap_ref: this.avokap_ref,
                address: this.address,
                mobile: this.mobile,
                phone: this.phone,
                license_num: this.license_num,
                license_end_date: this.license_end_date,
                predilection_domains: this.predilection_domains,
                category: this.category,
                category_hist: this.category_hist,
                bar_name: this.bar_name,
                bar_role: this.bar_role,
                bar_role_hist: this.bar_role_hist,
                role_cabinet: this.role_cabinet,
                date_joined: this.date_joined,
                short_desc: this.short_desc,
                long_desc: this.long_desc,
                avg_rating: this.avg_rating,
                special_discount: this.special_discount,
                cabinetId: this.cabinetId,
                userId: this.userId,
                custcatId: this.custcatId,
                cabinet_role_hist : this.role_cabinet_hist,
                user_status_selected:  this.userStatus,

            },
        });
    }

    change_cabinet(): void {
      this.dialogService.open(ChangeCabinetComponent , {
          context: {
              id_lawyer: this.id_lawyer,
              id_cabinet: this.id_cabinet,
              cabinet_ref: this.cabinet_ref,
              role_cabinet: this.role_cabinet,
              cabinetId: this.cabinetId,
              userId: this.userId,
              cabinet_role_hist : this.role_cabinet_hist,
              commercial_name: this.commercial_name,

          },
      });
    }


}
