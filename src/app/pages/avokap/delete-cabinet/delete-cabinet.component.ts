import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-delete-cabinet',
  templateUrl: './delete-cabinet.component.html',
  styleUrls: ['./delete-cabinet.component.scss']})
export class DeleteCabinetComponent implements OnInit {
  @Input() IdCabinet: string;
  @Input() Commercial_nme: string;
  @Input() Legal_Name: string;
  @Input() Cabinet_Ref: string;
  constructor(private Ref: NbDialogRef<DeleteCabinetComponent> ,
              private Service: SmartTableData ,
              private router: Router) { }

  ngOnInit(): void {
  }
  delete_cabinet(): void {
    this.Service.delete_cabinet(this.IdCabinet)
        .then(() => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/pages/avokap/cabinet-smart-table']);
            this.Ref.close();
          });
        })
        .catch((error) => {}) ;
  }
  cancel(): void {
    this.Ref.close();
  }

}
