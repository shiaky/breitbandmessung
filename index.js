const puppeteer = require("puppeteer");
const fs = require("fs");

//config
const START_HEADLESS = process.env.START_HEADLESS || true;
const EXPORT_PATH = process.env.EXPORT_PATH || "/export/";

//base url
const base_url = "https://breitbandmessung.de";

// selectors
const start_test_selector = "#root > div > div > div > div > div > button";
const accept_policy_selector =
  "#root > div > div.fade.modal-md.modal.show > div > div > div.justify-content-between.modal-footer > button:nth-child(2)";
const download_results_selector =
  "#root > div > div > div > div > div.messung-options.col.col-12.text-md-right > button.px-0.px-sm-4.btn.btn-link";
const download_speed_selector =
  "#root > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div > div.progressIndicatorSingle > div.progress-info > div.fromto > span";
const upload_speed_selector =
  "#root > div > div > div > div > div:nth-child(1) > div > div > div.col.col-12.col-md-12.col-xl-4 > div > div.progressIndicatorSingle > div.progress-info > div.fromto > span";

// misc functions
const click_button = async (
  browser,
  page,
  selector,
  timeout = 30,
  visible = false
) => {
  try {
    await page.waitForSelector(selector, {
      timeout: timeout * 10 ** 3,
      visible: visible,
    });
    await page.click(selector);
  } catch (err) {
    console.log(`could not click element\nError: ${err}`);
    await page.screenshot({ path: `${EXPORT_PATH}/error-screenshot.png` });
    await browser.close();
    process.exit(1);
  }
};

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: START_HEADLESS,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(base_url, []);
    const page = await browser.newPage();
    await page.setViewport({
      width: 2024,
      height: 2024,
      deviceScaleFactor: 1,
    });

    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: EXPORT_PATH,
    });

    try {
      await page.goto(`${base_url}/test`);
      console.log("PREPARING SPEEDTEST");

      // click start test
      await click_button(browser, page, start_test_selector);

      //click accept policy
      await click_button(browser, page, accept_policy_selector);

      console.log("RUNNING SPEEDTEST");

      // wait for test to be done
      try {
        await page.waitForSelector(download_results_selector, {
          timeout: 300 * 10 ** 3,
          visible: true,
        });

        console.log("SPEEDTEST DONE");
      } catch (err) {
        console.log("could not find results for download");
        console.log(err);
        await browser.close();
        return;
      }

      // download results
      await click_button(browser, page, download_results_selector);

      console.log(`saved results to ${EXPORT_PATH}`);

      // get measured speeds to show it in stdout
      let download_speed = await page.$$(download_speed_selector);
      download_speed = download_speed.pop();
      download_speed = await download_speed.getProperty("innerText");
      download_speed = await download_speed.jsonValue();
      let upload_speed = await page.$$(upload_speed_selector);
      upload_speed = upload_speed.pop();
      upload_speed = await upload_speed.getProperty("innerText");
      upload_speed = await upload_speed.jsonValue();

      console.log(`RESULTS >>> \nD:[${download_speed}]\nU:[${upload_speed}]`);

      //exit browser
      await browser.close();

      //set rights for all in the download path
      await fs.promises.chmod(EXPORT_PATH, "777");
    } catch (err) {
      console.log("fatal error");
      console.log(err);
      await browser.close();
      return;
    }
  } catch (error) {
    console.log("Error starting puppeteer");
    console.log(error);
    return;
  }
})();
