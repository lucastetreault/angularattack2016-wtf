
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class GithubService {

  private accessTokenObservable;
  private accessToken = null;

  constructor(private http: Http) {
    if (!window['gitHubAuthCode']) {
      return;
    }

    let that = this;

    this.accessTokenObservable = this.http.get('http://ec2-52-37-59-24.us-west-2.compute.amazonaws.com:8080/getAuthToken/' + window['gitHubAuthCode']).map(res => res.json());

    this.accessTokenObservable.subscribe(res => {
      that.accessToken = res.access_token;
    });

  }

  getRepos() {
    let that = this;

    return new Observable(observer => {
      that.accessTokenObservable.subscribe(res => {
        this.http.get('https://api.github.com/user/repos?access_token=' + res.access_token)
          .map(repos => repos.json())
          .subscribe(repos => {
            observer.next(repos);
          });
      });
    });
  }

  isLoggedIn() {
    return this.accessToken !== null;
  }

}
