import { AdvertisementPage } from './app.po';

describe('advertisement App', () => {
  let page: AdvertisementPage;

  beforeEach(() => {
    page = new AdvertisementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
