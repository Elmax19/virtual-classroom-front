import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentServiceService} from "../student-service.service";
import {AppComponentComponent} from "../app-component/app-component.component";
import {Student} from "../student";

/**
 * Login page component
 * @author Elmax19
 * @version 1.0
 */
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * {@link FormGroup} variable
   */
  form: FormGroup;
  /**
   * error message variable
   */
  errorMsg: string;
  /**
   * {@link Student} variable (current user)
   */
  student: Student = new Student('', false);

  /**
   * class constructor which initialise {@link AppComponentComponent.title}, {@link errorMsg} and {@link form}
   * @param route {@link ActivatedRoute} value
   * @param router {@link Router} value
   * @param studentService {@link StudentServiceService} variable to call
   * @param appComponentComponent {@link AppComponentComponent} variable to call
   */
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

  /**
   * {@link OnInit} class method. Here is processed the case when student is already logged in
   * @see gotoStudentsList
   */
  ngOnInit() {
    if (sessionStorage.getItem("user") != null) {
      this.gotoStudentsList();
    }
  }

  /**
   * method which is processed button click
   * @see StudentServiceService.getUser
   * @see StudentServiceService.save
   */
  onSubmit(): void {
    this.student = new Student('', false);
    this.studentService.getUser(this.form.value.login.toString()).subscribe((data: Student) => {
      this.student = data;
      console.log(this.student);
      if (this.student == null) {
        this.studentService.save(this.form.value.login.toString()).subscribe(result => this.gotoStudentsList());
        sessionStorage.setItem("user", this.form.value.login.toString());
      } else {
        this.errorMsg = 'This student is already exist';
      }
    });
  }

  /**
   * method which navigate to page with all students info
   */
  gotoStudentsList() {
    this.router.navigate(['/members']);
  }
}
