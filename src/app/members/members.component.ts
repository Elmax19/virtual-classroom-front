import {Component, NgIterable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../student";
import {Observable} from "rxjs";
import {StudentServiceService} from "../student-service.service";
import {AppComponentComponent} from "../app-component/app-component.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  students: Student[] = [];
  user: Student = new Student('', false);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentServiceService,
              private appComponentComponent: AppComponentComponent) {
    appComponentComponent.setTitle('Classroom - Members');
  }

  ngOnInit() {
    this.updateValues();
    if (this.user == null) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.studentService.logout(this.user.login).subscribe(rez => console.log("Logout"));
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private updateValues(){
    this.studentService.findAll().subscribe(data => {
      this.students = data;
    });
    this.studentService.getUser(sessionStorage.getItem("user")).subscribe((data: Student) => this.user = data);
  }

  raiseHand() {
    this.studentService.raiseHand(this.user.login).subscribe(rez => console.log("Rising hand status: " + rez));
    this.updateValues();
  }

}
