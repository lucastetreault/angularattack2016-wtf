import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

@Injectable()
export class GithubService {
  private code;

  private accessTokenObserable;
  private accessToken;

  private clientId = '9b4410e16f2ebd31a513';
  private clientSecret = '49f3f5adb5df06b46e27e65ecd6076b72df61aea';

  constructor(private http: Http) { }

  getRepos() {
    return this.http.get('https://api.github.com/user/repos?access_token=' + this.accessToken)
      .map(res => res.json());
  }

  isLoggedIn() {
    return this.accessToken;
  }

  setCode(code) {
    this.code = code;

    // let body = JSON.stringify({
    //   client_id: this.clientId,
    //   client_secret: this.clientSecret,
    //   code: this.code
    // });

    let body = '';

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.accessTokenObserable = this.http.post('https://github.com/login/oauth/access_token?client_id=' + this.clientId + '&client_secret=' + this.clientSecret + '&code=' + this.code, body, options).map(res => res.json());

    this.accessTokenObserable.subscribe(res => {
      this.accessToken = res.access_token;
    });

  }

  getCode(code) {
    return this.code;
  }

}
