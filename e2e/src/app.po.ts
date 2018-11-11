import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHomeTitle() {
    return element(
      by.css('#app > app-main-page > app-main-container > main > app-hero > app-hero-container > article > div > h2')
    ).getText();
  }
}
