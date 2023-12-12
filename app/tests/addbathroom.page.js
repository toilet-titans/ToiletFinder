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

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async testData(testController, floor, review) {
    const dropdown1 = Selector('#addbathroom-name');
    const option1 = dropdown1.find('option').withText('Administration Services Building 1');
    const dropdown2 = Selector('#addbathroom-gender');
    const option2 = dropdown2.find('option').withText('Male');
    const dropdown3 = Selector('#addbathroom-direction');
    const option3 = dropdown3.find('option').withText('North');
    const dropdown4 = Selector('#addbathroom-rating');
    const option4 = dropdown4.find('option').withText('3');
    await this.isDisplayed(testController);
    await testController.click(dropdown1);
    await testController.click(option1);
    await testController.typeText('#addbathroom-floor', floor);
    await testController.click(dropdown2);
    await testController.click(option2);
    await testController.click(dropdown3);
    await testController.click(option3);
    await testController.click(dropdown4);
    await testController.click(option4);
    await testController.typeText('#addbathroom-review', review);
  }
}

export const addbathroomPage = new AddBathroomPage();
