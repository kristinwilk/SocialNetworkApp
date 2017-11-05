import { SocialNetworkAppPage } from './app.po';

describe('social-network-app App', function() {
  let page: SocialNetworkAppPage;

  beforeEach(() => {
    page = new SocialNetworkAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
