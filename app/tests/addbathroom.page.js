import { Selector } from 'testcafe';

class AddBathroomPage {
  constructor() {
    this.pageId = '#addbathroom-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const addbathroomPage = new AddBathroomPage();
