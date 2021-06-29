import {Component, OnInit} from '@angular/core';
import {Student} from "../student";
import {StudentServiceService} from "../student-service.service";
import {AppComponentComponent} from "../app-component/app-component.component";
import {ActivatedRoute, Router} from "@angular/router";
import {WebsocketService} from "../webSocket/websocket.service";

/**
 * Members page component
 * @author Elmax19
 * @version 1.0
 */
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [WebsocketService]
})
export class MembersComponent implements OnInit {
  /**
   * array of logged in students
   */
  students: Student[] = [];
  /**
   * current student variable
   */
  user: Student = new Student('', false);

  /**
   * class constructor which initialise {@link AppComponentComponent.title}
   * @param route {@link ActivatedRoute} value
   * @param router {@link Router} value
   * @param studentService {@link StudentServiceService} variable to call
   * @param appComponentComponent {@link AppComponentComponent} variable to call
   * @param websocketService {@link WebsocketService} variable to call
   */
  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentServiceService,
              private appComponentComponent: AppComponentComponent,
              private websocketService: WebsocketService) {
    appComponentComponent.setTitle('Classroom - Members');
  }

  /**
   * {@link OnInit} class method. Here is processed the case when student is not logged in
   * @see updateValues
   */
  ngOnInit() {
    if (sessionStorage.getItem("user") == null) {
      this.router.navigate(['/login']);
    }
    this.updateValues();
    this.websocketService.listen("test event").subscribe((data) => {
      console.log(data);
    })
  }

  /**
   * method that processed student logout and navigate to login page
   * @see StudentServiceService.logout
   */
  logout() {
    this.studentService.logout(this.user.login).subscribe(rez => console.log("Logout"));
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  /**
   * method that update {@link students} and {@link user} values when hand status changes
   * @see StudentServiceService.getUser
   * @see StudentServiceService.findAll
   */
  private updateValues() {
    this.studentService.findAll().subscribe(data => {
      this.students = data;
    });
    this.studentService.getUser(sessionStorage.getItem("user")).subscribe((data: Student) => this.user = data);
  }

  /**
   * method that change hand status and call {@link updateValues}
   * @see StudentServiceService.raiseHand
   */
  raiseHand() {
    this.studentService.raiseHand(this.user.login).subscribe(rez => console.log("Rising hand status: " + rez));
    this.updateValues();
  }

}
