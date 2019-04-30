import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Report } from './report.model';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private report: Report[] = [];

  dataChanged = new Subject<Report[]>();
  constructor() { }

  getdata() {
    return this.report.slice();
  }
  setReports(report: Report[]) {
  this.report = report;
  this.dataChanged.next(this.report.slice());
  }
  removeReport(index: number) {
  this.report.splice(index, 1);
  this.dataChanged.next(this.report.slice());
  }
  addReport(ob: Report) {
  this.report.unshift(ob);
  this.dataChanged.next(this.report.slice());
  }
}
