import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Report } from './../../../shared/report.model';
import { ReportServerService } from './../../../shared/report.server.service';
import { ReportService } from './../../../shared/report.service';

@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.component.html',
  styleUrls: ['./reportlist.component.css']
})
export class ReportlistComponent implements OnInit {

  constructor(private reportService: ReportService, private reportServerService: ReportServerService) { }
  private confirmmodalResolved: HTMLElement;
  // private confirmmodalDelete: HTMLElement;
  private deleteId: number;
  // private message: string;
  // private lockerID: number;
  // private report: number;
  private subscription: Subscription;
  reports: Report[];
  ngOnInit() {
    this.confirmmodalResolved = document.getElementById('confirmModalResolved');
    // this.confirmmodalDelete = document.getElementById('confirmModalDelete');
    this.reportServerService.getreports();
    this.subscription = this.reportService.dataChanged
    .subscribe(
      (reports: Report[]) => {
      this.reports = reports; }
       );
  }
  onConfirm(id: number) {
    this.deleteId = id;
    // this.message = message;
    // this.lockerID = lockerID;
    this.confirmmodalResolved.style.display = 'block';
  }

  cConfirm() {
    this.reportServerService.deletereport(this.deleteId);
   // this.reportServerService.patchresolved(this.message, this.lockerID, this.deleteId);
    this.deleteId = undefined;
    // this.message = undefined;
    // this.lockerID = undefined;
    this.confirmmodalResolved.style.display = 'none';
  }
  cCancel() {
    this.deleteId = undefined;
    // this.message = undefined;
    // this.lockerID = undefined;
    this.confirmmodalResolved.style.display = 'none';
  }
  // onDeConfirm(id: number) {
  //   this.deleteId = id;
  //   this.confirmmodalDelete.style.display = 'block';
  // }

  // cDeConfirm() {
  //   this.reportServerService.deletereport(this.deleteId);
  //   this.deleteId = undefined;
  //   this.confirmmodalDelete.style.display = 'none';
  // }
  // cDeCancel() {
  //   this.deleteId = undefined;
  //   this.confirmmodalDelete.style.display = 'none';
  // }

  OnDestroy() {
    this.subscription.unsubscribe();
    }

}
