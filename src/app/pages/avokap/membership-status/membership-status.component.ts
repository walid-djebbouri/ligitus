import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MembershipStatusService} from '../../../@core/mock/common/membership-status.service';
import {NbDialogService} from '@nebular/theme';
import {CreateMembershipComponent} from '../create-membership/create-membership.component';
import {DeleteMembershipComponent} from '../delete-membership/delete-membership.component';
import {UpdateMembershipComponent} from '../update-membership/update-membership.component';
import {BundlesCustCategoryService} from '../../../@core/mock/common/bundles-cust-category.service';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';

@Component({
  selector: 'ngx-membership-status',
  templateUrl: './membership-status.component.html',
  styleUrls: ['./membership-status.component.scss'],
})
export class MembershipStatusComponent implements OnInit {
  id_lawyer;
  membership_status: any[];
  membership_status_const: any[];
  bundles: any[];
  customer_category: any[];
  lawyer;
  cabinet_reference: string;
  commercial_name: string;
  full_name: string;
  lawyer_ref: string ;
  bare_name: string;
  licence_number: string ;
  cabinet_id: string;
  display_start_date: boolean;
  display_end_date: boolean;
  selected_start_date;
  selected_end_date;
  legal_name;
  tel;
  email;
  @Input() e_date: Date;
  constructor(private router: ActivatedRoute ,
              private service: MembershipStatusService ,
              private BoiteDialogue: NbDialogService ,
              private Bundle_service: BundlesCustCategoryService ,
              private cabinet_service: SmartTableData) {
     this.Bundle_service.get_bundle().then((bundles) => {
       bundles.sort(function compare ( a , b ) {
         if (a.bundle_ref < b.bundle_ref)
           return -1;
         if (a.bundle_ref > b.bundle_ref )
           return 1;
         return 0;
       });
       this.bundles =  bundles;
     }).catch();
     this.Bundle_service.get_cust_category()
         .then((customer_category) => {
           this.customer_category = customer_category;
         })
         .catch((error) => {});
     this.id_lawyer = this.router.snapshot.params['id'] ;
     this.service.get_membership_status(this.id_lawyer).then((membership_status) => {
       membership_status.sort(function compare(a, b) {
         if (a.plan_edate > b.plan_edate)
           return -1;
         if (a.plan_edate < b.plan_edate )
           return 1;
         return 0;
       });
       this.membership_status_const = membership_status ;
       this.membership_status = this.membership_status_const ;
     }).catch((error) => {});
     this.lawyer = this.cabinet_service.cabinet[0].lawyers.find(lawyer => lawyer.id === this.id_lawyer );
     this.cabinet_reference = this.cabinet_service.cabinet[0].cabinet_ref;
    this.commercial_name = this.cabinet_service.cabinet[0].commercial_name;
    this.legal_name = this.cabinet_service.cabinet[0].legal_name;
    this.tel = this.cabinet_service.cabinet[0].tel;
    this.email = this.cabinet_service.cabinet[0].email;
    this.cabinet_id = this.cabinet_service.cabinet[0].id;
    this.lawyer_ref = this.lawyer.avokap_ref;
    this.bare_name = this.lawyer.bar_name;
    this.licence_number = this.lawyer.license_num;
    this.full_name =  this.lawyer.user.last_name + ' , ' + this.lawyer.user.first_name  ;
  }

  ngOnInit(): void {}
   format_date(date: string): string {
      const date_format = new Date(date);
      return  (date_format.getFullYear() + '-' + date_format.getMonth() + '-' + date_format.getDate()) ;
    }
    filter(value , type: string): void {
      const info = (<HTMLInputElement> value.target).value;
      const re = new RegExp(info , 'i') ;
      if ( info === '') {
        this.membership_status = this.membership_status_const ;
      } else {
        this.membership_status = [];
      switch (type) {
        case ('Reference') : {
          this.membership_status = this.membership_status_const.filter(membership =>
              membership.membership_ref.match(re));
              break;
        }
        case ('Name') : {
          this.membership_status = this.membership_status_const.filter(membership =>
              membership.bundle.bundle_name.match(re));
              break;
        }
      }
      }
  }
  filter_3( type: string): void {
    const fsd = (<HTMLInputElement>document.getElementById('s_first_date')).value ;
    const fed = (<HTMLInputElement>document.getElementById('e_first_date')).value ;
    const ssd = this.selected_start_date ;
    const sed = this.selected_end_date ;
    if ( ssd === 'Between' && type === 'Start_Date' ) {
      this.display_start_date = true;
    }
    if ( ssd !== 'Between' && type === 'Start_Date' ) {
      this.display_start_date = false;
    }
    if ( sed === 'Between' && type === 'End_Date' ) {
      this.display_end_date = true ;
    }
    if ( sed !== 'Between' && type === 'End_Date' ) {
      this.display_end_date = false ;
    }
    switch (type) {
      case ('Start_Date') : {
        if (fsd !== '' ) {
          switch (ssd) {
            case ('=') : {
              this.membership_status = this.membership_status_const.filter(membership =>
                    (this.format_date(membership.plan_sdate)  ===  this.format_date(fsd))   );
              break;
            }
            case ('<') : {
              this.membership_status = this.membership_status_const.filter(membership =>
                  membership.plan_sdate  < fsd );
              break;
            }
            case ('>') : {
              this.membership_status = this.membership_status_const.filter(membership =>
                   (this.format_date(membership.plan_sdate) >  this.format_date(fsd)  ) );
              break;
            }
            case ('Between') : {
              const lsd = (<HTMLInputElement>document.getElementById('s_last_date')).value ;
              if (lsd !== '') {
                this.membership_status = this.membership_status_const.filter(membership =>
                    (membership.plan_sdate > fsd && membership.plan_sdate < lsd)  );
                break;
              }
            }
          }

        } else {
          this.membership_status = this.membership_status_const ;
        }
        break;
      }
      case ('End_Date') : {
        if (fed !== '') {
          switch (sed)  {
            case ('=') : {
              this.membership_status = this.membership_status_const.filter(membership =>
                  ( this.format_date(membership.plan_edate) === this.format_date(fed) ) );
              break;
            }
            case ('<') : {
              this.membership_status = this.membership_status_const.filter(membership =>
                  membership.plan_edate < fed );
              break;
            }
            case ('>') : {
              this.membership_status = this.membership_status_const.filter(membership =>
                  membership.plan_edate > fed );
              break;
            }
            case ('Between') : {
              const led = (<HTMLInputElement>document.getElementById('e_last_date')).value ;
              if ( led !== '') {
                this.membership_status = this.membership_status_const.filter(membership =>
                    (membership.plan_edate > fed && membership.plan_edate < led)  );
                break;
              }
            }
          }

        } else {
          this.membership_status = this.membership_status_const ;
        }
        break;
      }
    }


  }


    create_membership(): void {
    let special_discount: number = 0 ;
    const date_format = new Date();
    if (this.lawyer.special_discount[0]) {
      if ( this.format_date(this.lawyer.special_discount[0].end_date)  <
          date_format.getFullYear() + '-' + date_format.getMonth() + '-' + date_format.getDate()
      ) {
        special_discount = 0;
      } else {
        special_discount = this.lawyer.special_discount[0].discount ;
      }
    }
    this.BoiteDialogue.open(CreateMembershipComponent , {
        context : {
          avokap_ref: this.lawyer.avokap_ref,
          lawyerId : this.id_lawyer,
          lawyer_special_discount: special_discount ,
          Bundles: this.bundles,
          Customer_Category: this.customer_category,
          Category: this.lawyer.category,
          membership_status_const: this.membership_status_const ,

        } ,
      });
    }

    update_membership_status(index: number): void {
      this.BoiteDialogue.open(UpdateMembershipComponent , {
        context : {
          membership_ref: this.membership_status[index].membership_ref ,
          plan_price: this.membership_status[index].plan_price ,
          CustCat_discount: this.membership_status[index].CustCat_discount ,
          special_discount: this.membership_status[index].special_discount ,
          final_discount: this.membership_status[index].final_discount ,
          billed_amount: this.membership_status[index].billed_amount ,
          payment_date: this.membership_status[index].payment_date ,
          payment_type: this.membership_status[index].payment_type ,
          plan_sdate: this.membership_status[index].plan_sdate ,
          plan_edate: this.membership_status[index].plan_edate ,
          remark: this.membership_status[index].remark ,
          lawyerId : this.id_lawyer,
          // lawyerId: this.membership_status[index].lawyerId ,
          payer_name:  this.membership_status[index].payer_name ,
          national_identity_n:  this.membership_status[index].national_identity_n ,
          designation_ref:  this.membership_status[index].designation_ref ,
          payment_ref:  this.membership_status[index].payment_ref ,
          membership_id: this.membership_status[index].id,
          Bundles: this.bundles,
          bundle_id: this.membership_status[index].bundleId,
          bundle_name: this.membership_status[index].bundle.bundle_name,
        } ,
      }) ;
    }
    delete_membership_status(index: number): void {
    this.BoiteDialogue.open(DeleteMembershipComponent , {
      context : {
        membership_ref: this.membership_status[index].membership_ref ,
        plan_price: this.membership_status[index].plan_price ,
        payment_date: this.membership_status[index].payment_date ,
        bundle_name: this.membership_status[index].bundle_name,
        plan_edate: this.membership_status[index].plan_edate ,
        id: this.membership_status[index].id ,
        lawyer_id: this.id_lawyer,
      } ,
    }) ;
  }

}
