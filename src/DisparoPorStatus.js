async function DisparoPorStatus(contextPage) {
  try {
    const page = await contextPage;
    // navega ate disparo por status
    const iframe = await page.waitForSelector("#tableauViz > iframe");
    const iframeCt = await iframe.contentFrame();

    await iframeCt.click('[id="tableauTabbedNavigation_tab_6"]');
    console.log("navegou ate disparo por status");

    // clica no botão de filtro
    await new Promise((r) => setTimeout(r, 10000));
    await iframeCt.click("#tabZoneId6 > div > div > div > div > div");
    await new Promise((r) => setTimeout(r, 5000));
    console.log("filtro ");

    // clica no dropdown e selceciona a opção "ontem e fecha o filtro"
    await iframeCt.click("#dijit_form_DropDownButton_2");
    await iframeCt.click('[class="column1"]');
    await new Promise((r) => setTimeout(r, 8000));
    await iframeCt.click("#dijit_form_DropDownButton_2");
    await new Promise((r) => setTimeout(r, 5000));
    await iframeCt.click("#tabZoneId6 > div > div > div > div > div");
    await new Promise((r) => setTimeout(r, 3000));
    console.log("dropdown");

    // clica em dowload
    await iframeCt.click('[id="tabZoneId134"]');
    await new Promise((r) => setTimeout(r, 3000));
    await iframeCt.click(
      "#export-crosstab-options-dialog-Dialog-BodyWrapper-Dialog-Body-Id > div > div.fdr6v0d > button"
    );
    console.log("dowload");
    await new Promise((r) => setTimeout(r, 5000));

    await page.close();

    return { data: "", message: "OK" };
  } catch (error) {
    return { data: error, message: "ERROR" };
  }
}

module.exports = DisparoPorStatus;
