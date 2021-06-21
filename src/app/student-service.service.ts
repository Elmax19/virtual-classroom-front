import {Injectable} from '@angular/core';
import {Student} from "./student";
import {HttpClient, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  private studentsUrl: string;
  private userUrl: string;
  private saveUrl: string;
  private logoutUrl: string;
  private handUrl: string;

  constructor(private http: HttpClient) {
    this.studentsUrl = 'http://localhost:8080/studentsList';
    this.userUrl = 'http://localhost:8080/user';
    this.saveUrl = 'http://localhost:8080/login';
    this.logoutUrl = 'http://localhost:8080/logout';
    this.handUrl = 'http://localhost:8080/raiseHand';
  }

  public findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  public getUser(login: string | null): Observable<Student> {
    return this.http.post<Student>(this.userUrl, login);
  }

  public save(login: string) {
    return this.http.post<Student>(this.saveUrl, login);
  }

  public logout(login: string) {
    return this.http.delete(this.logoutUrl + '/' + login);
  }

  public raiseHand(login: string) : Observable<HttpStatusCode> {
    return this.http.put<HttpStatusCode>(this.handUrl + '/' + login, {});
  }
}
