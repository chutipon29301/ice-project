import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SelectedGroupService } from './selected-group.service';

@Component({
  selector: 'app-grouping',
  templateUrl: './grouping.component.html',
  styleUrls: ['./grouping.component.css']
})
export class GroupingComponent implements OnInit {

  constructor(private selectedGroupService: SelectedGroupService) { }
  selected_id: number;
  subID: Subscription;
  ngOnInit() {
    this.subID = this.selectedGroupService.dataChanged.subscribe(
      (id: number) => {
      this.selected_id = id;
   } );
  }

}
