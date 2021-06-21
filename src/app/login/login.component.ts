import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentServiceService} from "../student-service.service";
import {AppComponentComponent} from "../app-component/app-component.component";
import {Student} from "../student";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  errorMsg: string;
  student: Student = new Student('', false);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentServiceService,
              private appComponentComponent: AppComponentComponent) {
    appComponentComponent.setTitle('Classroom - Login');
    this.form = new FormGroup({
      "login": new FormControl("", Validators.required)
    });
    this.errorMsg = '';
  }

  onSubmit(): void {
    this.student = new Student('', false);
    this.studentService.getUser(this.form.value.login.toString()).subscribe((data: Student) => {
      this.student = data;
      console.log(this.student);
      if (this.student==null) {
        this.studentService.save(this.form.value.login.toString()).subscribe(result => this.gotoStudentsList());
        sessionStorage.setItem("user", this.form.value.login.toString());
      } else {
        this.errorMsg = 'This student is already exist';
      }
    });

  }

  gotoStudentsList() {
    this.router.navigate(['/members']);
  }
}
