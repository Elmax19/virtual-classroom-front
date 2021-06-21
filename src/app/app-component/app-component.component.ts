import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-component',
  templateUrl: './app-component.component.html',
  styleUrls: ['./app-component.component.css']
})
export class AppComponentComponent implements OnInit {

  title : string = '';

  constructor() {

  }

  ngOnInit(): void {
  }

  setTitle(title : string){
    this.title=title;
  }

}
