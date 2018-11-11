import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display home message', () => {
    page.navigateTo();
    expect(page.getHomeTitle()).toEqual('All your media now lives in one place');
  });
});
