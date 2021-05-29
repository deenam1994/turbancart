import { TurbancartPage } from './app.po';

describe('turbancart App', () => {
  let page: TurbancartPage;

  beforeEach(() => {
    page = new TurbancartPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
