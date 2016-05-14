import { Angularattack2016WtfPage } from './app.po';

describe('angularattack2016-wtf App', function() {
  let page: Angularattack2016WtfPage;

  beforeEach(() => {
    page = new Angularattack2016WtfPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('angularattack2016-wtf works!');
  });
});
