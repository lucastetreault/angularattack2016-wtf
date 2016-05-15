
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';


@Injectable()
export class GithubService {

  private accessTokenObserable;
  private accessToken;

  constructor(private http: Http) {

    if (!window['gitHubAuthCode']) {
      return;
    }

    console.log(window['gitHubAuthCode']);

    this.accessTokenObserable = this.http.get('http://ec2-52-37-59-24.us-west-2.compute.amazonaws.com:8080/getAuthToken/' + window['gitHubAuthCode']).map(res => res.json());

    this.accessTokenObserable.subscribe(res => {
      this.accessToken = res.access_token;
    });

  }

  getRepos() {
    return this.http.get('https://api.github.com/user/repos?access_token=' + this.accessToken)
      .map(res => res.json());
  }

  isLoggedIn() {
    return this.accessToken;
  }

  setCode(code) {
    if (!code) {
      return;
    }

    this.accessTokenObserable = this.http.get('http://ec2-52-37-59-24.us-west-2.compute.amazonaws.com:8080/getAuthToken/' + code).map(res => res.json());

    this.accessTokenObserable.subscribe(res => {
      this.accessToken = res.access_token;
    });
  }

}
