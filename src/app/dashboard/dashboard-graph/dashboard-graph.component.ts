import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LeaveRequestService } from 'src/app/core/service';
import { InteractionService } from 'src/app/core/service/interaction.service';
import { ModalService } from 'src/app/shared/service/modal-service';

@Component({
  selector: 'app-dashboard-graph',
  templateUrl: './dashboard-graph.component.html',
  styleUrls: ['./dashboard-graph.component.css']
})
export class DashboardGraphComponent implements OnInit {

  multi: any[];
  view: any[] = [650, 300];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  xAxisLabelBar: string = 'Leave Type';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Leave Request';
  legendTitle: string = 'Leave Type';
  legendTitle1: string = 'Month';
  public modelRef: BsModalRef;
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  colorScheme = {
    domain: [this.getRandomColor(), this.getRandomColor(), this.getRandomColor()]
  };
  constructor(private leaveRequestService: LeaveRequestService,
    private interactionService: InteractionService,
    private modalService: ModalService) {
  }

  onSelect(data): void {
    this.leaveRequestService.getGraphSummary(data).subscribe(resp => {
      this.modelRef = this.modalService.openGraphSummaryPopUp(resp, 'Leave Summary',
      (obj) => { this.okClickEvent(obj); }, "OK")
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    })
   
  }

  okClickEvent(obj) {
    this.modelRef.hide();
    
  }
  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getGraphData() {
    this.leaveRequestService.getDashBoardGraphRequests().subscribe(resp => {
      this.multi = resp.dashBoardGraphDto;
    })
  }


  ngOnInit(): void {
    this.getGraphData();
    this.interactionService.grapph$.subscribe(resp => {
      this.getGraphData();
    })
  }
}
