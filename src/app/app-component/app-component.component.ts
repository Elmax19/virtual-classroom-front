import {Component, OnInit} from '@angular/core';

/**
 * Main component
 * @author Elmax19
 * @version 1.0
 */
@Component({
  selector: 'app-app-component',
  templateUrl: './app-component.component.html',
  styleUrls: ['./app-component.component.css'],

})
export class AppComponentComponent implements OnInit {
  /**
   * page title value
   */
  title: string;

  /**
   * default constructor which initialize {@link title}
   */
  constructor() {
    this.title = "Virtual Classroom";
  }

  /**
   * {@link OnInit} class method
   */
  ngOnInit(): void {
  }

  /**
   * {@link title} setter
   * @param title new title value
   */
  setTitle(title: string) {
    this.title = title;
  }

}
