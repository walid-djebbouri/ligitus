import {Component, Input, OnInit} from '@angular/core';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {NbDialogRef} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-change-cabinet',
  templateUrl: './change-cabinet.component.html',
  styleUrls: ['./change-cabinet.component.scss'],
})
export class ChangeCabinetComponent implements OnInit {
    @Input() id_lawyer: string;
    @Input() title: string;
    @Input() id_cabinet: string;
    @Input() cabinet_ref: string;
    @Input() role_cabinet: string;
    @Input() cabinetId: string;
    @Input() userId: string;
    @Input() cabinet_role_hist = [];
    @Input() commercial_name: string;
    Cabinets:  any[];
 List: any[];
 Confirmed: boolean = false ;
 Disabled: boolean = true ;
 selected_category: string;
 donne;
 Errors: string = null ;

    constructor(private service: SmartTableData ,
                private ref: NbDialogRef<ChangeCabinetComponent> ,
                private router: Router) {
      this.Cabinets = this.service.Cabinets  ;
  }

  ngOnInit(): void {
  }
  adaptation(value: string): string {
        if (value.length === 1) {
            return '0' + value ;
        } else {
            return value;
        }
  }

  recherche(event , type: string): void {
    const info = (<HTMLInputElement>event.target).value ;
    const Re = new RegExp(info , 'i');
    switch (type) {
        case ('Commercial Name'): {
            this.List = this.Cabinets.filter(cabinet => cabinet.commercial_name.match(Re) ) ;
            break;
        }
        case ('Legal Name'): {
            this.List = this.Cabinets.filter(cabinet => cabinet.legal_name.match(Re) ) ;
            break;
        }
        case ('Cabinet Reference'): {
            this.List = this.Cabinets.filter(cabinet => cabinet.cabinet_ref.match(Re) ) ;
            break;
        }
    }
  }
  check(): void {
      (<HTMLInputElement>document.getElementById('commercial_name_bro')).value = this.List[0].commercial_name ;
      (<HTMLInputElement>document.getElementById('cab_ref_bro')).value = this.List[0].cabinet_ref ;
      (<HTMLInputElement>document.getElementById('legal_name_bro')).value = this.List[0].legal_name ;
  }
    change(): void {
        this.Confirmed = true ;
        this.Errors = null;
            setTimeout(
                () => {
                    this.Disabled = false ;
                }, 2000);
    }
    check_category(): void {
        this.Errors = '! Error : The Category is Required';
    }
    confirm(): void {
        const cabinet_role_historical = this.cabinet_role_hist ;
        const toDay = new Date();
        cabinet_role_historical.push({
            'role' : this.selected_category,
            'cabinet_ref' : this.List[0].cabinet_ref ,
            'from_cab_ref' : this.cabinet_ref  ,
            'role_date' :  toDay.getFullYear()
                + '-'
                +  this.adaptation(String((toDay.getMonth() + 1 )))
                + '-'
                +  this.adaptation(String(toDay.getDate()))       ,
            'remark' : 'Change Cabinet From ' + this.commercial_name ,
        });
        cabinet_role_historical.sort(function compare(a, b) {
            if (a.role_date > b.role_date)
                return -1;
            if (a.role_date < b.role_date )
                return 1;
            return 0;
        });
        this.donne = {
            'cabinetId': this.List[0].id,
            'userId': this.userId,
            'role_cabinet_hist' : cabinet_role_historical,
            'role_cabinet': this.selected_category,
        };
        this.service.change_Cabinet(this.donne)
            .then((str) => {
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate(['pages/avokap/cabinet-details/' + this.List[0].id]);
                    this.ref.close();
                });            })
            .catch( (error) => {} );
    }

    cancel(): void {
      this.ref.close();
    }
}
