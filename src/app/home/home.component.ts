import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() deviceXs: boolean;

  // public mode = new FormControl('side');
  constructor() { }

  ngOnInit(): void {
  }

}
