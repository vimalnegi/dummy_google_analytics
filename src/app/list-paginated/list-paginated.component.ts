import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-paginated',
  templateUrl: './list-paginated.component.html',
  styleUrls: ['./list-paginated.component.css']
})
export class ListPaginatedComponent implements OnInit {
  @Input() count: number;
  constructor() { }

  ngOnInit() {
  }

}
