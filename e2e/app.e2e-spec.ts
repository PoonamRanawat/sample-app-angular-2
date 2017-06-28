import { RecipebookPage } from './app.po';

describe('recipebook App', function() {
  let page: RecipebookPage;

  beforeEach(() => {
    page = new RecipebookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
