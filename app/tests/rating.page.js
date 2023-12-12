import { Selector } from 'testcafe';

class RatingPage {
  constructor() {
    this.pageId = '#rating-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const ratingPage = new RatingPage();
