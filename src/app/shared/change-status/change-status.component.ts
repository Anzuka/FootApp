import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrl: './change-status.component.scss'
})
export class ChangeStatusComponent implements OnInit, OnChanges{

  // Send the new status
  @Output()
  newStatusEvent = new EventEmitter<string>();

  // List Status the component have to follow
  @Input({required:true})
  statusList!: string[];

  // CurrentStatus
  @Input({required:true})
  currentStatus!: string;

  nextStatus: string | undefined;
  
  ngOnInit(): void {
    this.refreshStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshStatus();
  }

  refreshStatus(): void{
    this.nextStatus = this.getNextStatus(this.currentStatus);
  }

  // Get the next Status from a string
  getNextStatus(status: string): string | undefined{
    let index =  this.statusList.indexOf(status);
    if (index < 0)
      return undefined;
    
    return this.statusList.at( this.statusList.indexOf(status) + 1 );
  }

  // Emit the new status
  changeStatus() {
      if(this.nextStatus){
        this.newStatusEvent.emit(this.nextStatus);
      }
  }
}