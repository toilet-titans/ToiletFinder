import { Selector } from 'testcafe';

class DirectoryPage {
  constructor() {
    this.pageId = '#directory-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const directoryPage = new DirectoryPage();
