import {Component, Input, OnInit} from '@angular/core';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {NbDialogRef} from '@nebular/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-delete-lawyer',
  templateUrl: './delete-lawyer.component.html',
  styleUrls: ['./delete-lawyer.component.scss']})
export class DeleteLawyerComponent implements OnInit {
  @Input() first_name: string;
  @Input() last_name: string;
  @Input() avk_ref: string;
  @Input() role_cabinet: string;
  @Input() cabinetId: string;
  @Input() lawyerId: string;
  constructor(private service: SmartTableData , protected ref: NbDialogRef<DeleteLawyerComponent>,
  private router: Router) { }

  ngOnInit(): void {
  }
  delete_lawyer(): void {
    this.service.delete_lawyer(this.lawyerId).then(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['/pages/avokap/cabinet-details/' + this.cabinetId ]  );
        this.ref.close();
      });
    }).catch((error) => {
    });
  }
  dismiss(): void {
    this.ref.close();
  }
}
