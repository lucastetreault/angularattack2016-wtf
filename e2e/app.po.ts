export class Angularattack2016WtfPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('angularattack2016-wtf-app h1')).getText();
  }
}
