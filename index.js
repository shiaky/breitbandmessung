const puppeteer = require("puppeteer");
const conf = require("./config");

//base url
const base_url = "https://breitbandmessung.de";

// selectors
const accept_button_selector = "#dsvooverlay-close > span";
const start_test_selector = "#start";
const skip_gps_dialog_selector = "#overlay-close > span.title";
const lan_yes_selector =
  "#q2 > div > div.answer.answer-lan.has-pretty-child > div.clearfix.prettyradio.labelright.lable-right.blue > a";
const lan_continue_selector =
  "#q2 > div > div.menu > a.forward.button-blue-big.button-blue-big-forward.ani-bg";
const hints_yes_selector =
  "#q2 > div > div.answer.answer-optimal.has-pretty-child > div.clearfix.prettyradio.labelright.lable-right.blue > a";
const hints_continue_selector =
  "#q2 > div > div.menu > a.forward.button-blue-big.button-blue-big-forward.ani-bg";
const zipcode_selector = "#plz";
const zipcode_continue_selector =
  "#q3 > div > div.menu > a.forward.button-blue-big.button-blue-big-forward.ani-bg";

const provider_container_selector = "#select2-provider-container";
const provider_search_input_selector =
  "#mbody > span > span > span.select2-search.select2-search--dropdown > input";
const provider_continue_selector =
  "#q4 > div > div.menu > a.forward.button-blue-big.button-blue-big-forward.ani-bg";

const service_container_selector = "#select2-tarifselect-container";
const service_search_input_selector = "#select2-tarifselect-container";
const service_continue_selector =
  "#q24 > div > div.menu > a.forward.button-blue-big.button-blue-big-forward.ani-bg";

const throttling_no_selector =
  "#q13 > div > div.answer.answer-limit.has-pretty-child > div.clearfix.prettyradio.labelright.lable-right.blue > a";
const throttling_continue_selector =
  "#q13 > div > div.menu > a.forward.button-blue-big.button-blue-big-forward.ani-bg";

const unhappy_selector =
  "#q7 > div > div.answer.answer-customer > ul > li.last > a";
const start_test_2_selector =
  "#q7 > div > div.menu > a.forward.button-blue-big.button-blue-big-forward.ani-bg";

const download_results_selector = "#result-export";

const download_speed_selector =
  "#test > div.test-results-total-wrap > div > div > div.test-results-outer-wrap > div > div > div.test-results > div.results-sec.results-download > div.title > span > span";
const upload_speed_selector =
  "#test > div.test-results-total-wrap > div > div > div.test-results-outer-wrap > div > div > div.test-results > div.results-sec.results-upload > div.title > span > span";

// misc functions
const click_button = async (page, selector, timeout = 30, visible = false) => {
  try {
    await page.waitForSelector(selector, {
      timeout: timeout * 10 ** 3,
      visible: visible
    });
    await page.click(selector);
    // console.log(`clicked ${selector}`);
  } catch (err) {
    console.log(`could not click: ${err}`);
    await page.screenshot({ path: `error-screenshot.png` });
    await browser.close();
  }
};

(async () => {
  puppeteer
    .launch({
      executablePath: conf.browser_path,
      headless: conf.start_headless,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    .then(async browser => {
      const page = await browser.newPage();
      await page.setViewport({
        width: 1024,
        height: 1024,
        deviceScaleFactor: 1
      });

      await page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: conf.export_path
      });

      try {
        await page.goto(`${base_url}/test`);
        console.log("PREPARING SPEEDTEST");

        // accept privacy policy
        await click_button(page, accept_button_selector);

        // click start test
        await page.waitFor(1000);
        await click_button(page, start_test_selector);

        // click skip gps dialog
        await page.waitFor(1000);
        await click_button(page, skip_gps_dialog_selector);

        // mark lan used with yes
        await page.waitFor(1000);
        await click_button(page, lan_yes_selector);

        await page.waitFor(1000);
        await click_button(page, lan_continue_selector);

        // mark additional hints read with yes
        await page.waitFor(1000);
        await click_button(page, hints_yes_selector);

        await page.waitFor(1000);
        await click_button(page, hints_continue_selector);

        // enter zip code
        await page.waitFor(1000);
        await page.type(zipcode_selector, conf.zip_code);
        await click_button(page, zipcode_continue_selector);

        // enter provider
        await page.waitFor(1000);
        await click_button(page, provider_container_selector);

        await page.waitFor(1000);
        await page.type(provider_search_input_selector, conf.provider);
        await page.keyboard.press("Enter");

        await page.waitFor(1000);
        await click_button(page, provider_continue_selector);

        //enter service booked from provider
        await page.waitFor(1000);
        await click_button(page, service_container_selector);

        await page.waitFor(1000);
        await page.type(service_search_input_selector, conf.service);
        await page.keyboard.press("Enter");

        await page.waitFor(1000);
        await click_button(page, service_continue_selector);

        //mark no throttling
        await page.waitFor(1000);
        await click_button(page, throttling_no_selector);

        await page.waitFor(1000);
        await click_button(page, throttling_continue_selector);

        // mark to be verry unhappy with provider
        await page.waitFor(10000);
        await click_button(page, unhappy_selector);

        // click start test
        await page.waitFor(1000);
        await click_button(page, start_test_2_selector);

        console.log("RUNNING SPEEDTEST");

        // wait for test to be done
        try {
          await page.waitForSelector(download_results_selector, {
            timeout: 300 * 10 ** 3,
            visible: true
          });

          console.log("SPEEDTEST DONE");
        } catch (err) {
          console.log("could not find download ready");
          console.log(err);
          await browser.close();
        }

        // download results
        await page.waitFor(3000);
        await click_button(page, download_results_selector);

        await page.waitFor(3000);
        console.log(`saved results to ${conf.export_path}`);

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
      } catch (err) {
        console.log("fatal error");
        console.log(err);
        await browser.close();
      }
    });
})();
