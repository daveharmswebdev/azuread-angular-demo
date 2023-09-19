import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile.model';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PHOTO = 'https://graph.microsoft.com/v1.0/me/photo/$value';
const REPORTS_API_BASE_URI = 'http://localhost:5263/api/Report';

@Injectable({
  providedIn: 'root',
})
export class AzureDemoService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get<Profile>(GRAPH_ENDPOINT);
  }
  getProfilePic() {
    return this.http.get(GRAPH_ENDPOINT_PHOTO, { responseType: 'blob' });
  }

  getReportNoAuth() {
    return this.http.get<{ message: string }>(
      REPORTS_API_BASE_URI + '/GetReportNoAuth'
    );
  }

  getReportAuth() {
    return this.http.get<{ message: string }>(
      REPORTS_API_BASE_URI + '/GetReportAuth'
    );
  }

  getReportManager() {
    return this.http.get<{ message: string }>(
      REPORTS_API_BASE_URI + '/GetReportManager'
    );
  }
}
