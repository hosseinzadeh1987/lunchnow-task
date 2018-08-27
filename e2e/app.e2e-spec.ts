import { ResturentAppPage } from './app.po';

describe('resturent-app App', () => {
  let page: ResturentAppPage;

  beforeEach(() => {
    page = new ResturentAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
