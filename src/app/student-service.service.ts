import {Injectable} from '@angular/core';
import {Student} from "./student";
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {Observable} from "rxjs";

/**
 * Service for communication with Java API
 * @author Elmax19
 * @version 1.0
 */
@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  /**
   * API urls variables
   */
  private studentsUrl: string;
  private userUrl: string;
  private saveUrl: string;
  private logoutUrl: string;
  private handUrl: string;

  /**
   * class constructor with initialise all urls
   * @param http
   */
  constructor(private http: HttpClient) {
    this.studentsUrl = 'http://localhost:8080/studentsList';
    this.userUrl = 'http://localhost:8080/user';
    this.saveUrl = 'http://localhost:8080/login';
    this.logoutUrl = 'http://localhost:8080/logout';
    this.handUrl = 'http://localhost:8080/raiseHand';
  }

  /**
   * method to get all students
   */
  public findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  /**
   * method to get student info
   * @param login required student login
   */
  public getUser(login: string | null): Observable<Student> {
    return this.http.post<Student>(this.userUrl, login);
  }

  /**
   * method to create new student
   * @param login new student login
   */
  public save(login: string) {
    return this.http.post<Student>(this.saveUrl, login);
  }

  /**
   * method to delete student information
   * @param login required student login
   */
  public logout(login: string) {
    return this.http.delete(this.logoutUrl + '/' + login);
  }

  /**
   * method to change student hand status
   * @param login required student login
   */
  public raiseHand(login: string): Observable<HttpStatusCode> {
    return this.http.put<HttpStatusCode>(this.handUrl + '/' + login, {});
  }
}
