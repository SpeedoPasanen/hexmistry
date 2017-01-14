import { HexmistryPage } from './app.po';

describe('hexmistry App', function() {
  let page: HexmistryPage;

  beforeEach(() => {
    page = new HexmistryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
