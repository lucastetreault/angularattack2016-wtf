import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

@Injectable()
export class GithubService {
  private code;

  private accessTokenObserable;
  private accessToken;

  private clientId = '9b4410e16f2ebd31a513';
  private clientSecret = '49f3f5adb5df06b46e27e65ecd6076b72df61aea';

  private repos = '/user/repos';
  private url = 'https://api.github.com';

  constructor(private http: Http) { }

  getRepos() {
    return this.http.get('https://api.github.com/repos/angular/angular/pulls')
      .map(res => res.json());
  }

  isLoggedIn() {
    return this.code;
  }

  setCode(code) {
    this.code = code;
    let body = JSON.stringify({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: this.code
    });

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.accessTokenObserable = this.http.post(this.url, body, options).map(res => res.json());

    this.accessTokenObserable.subscribe(res => {
      this.accessToken = res.access_token;
    });

  }

  getCode(code) {
    return this.code;
  }

}
