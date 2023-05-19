async function RespostaPorTarget(contextPage) {
  try {
    const page = await contextPage;
    // // navega ate resposta por target
    const iframe = await page.waitForSelector("#tableauViz > iframe");
    const iframeCt = await iframe.contentFrame();
    await new Promise((r) => setTimeout(r, 5000));
    await iframeCt.click('[id="tableauTabbedNavigation_tab_1"]');
    console.log("navegou ate resposta por target");

    // clica no botão de filtro
    await iframeCt.waitForNavigation('[id="tabZoneId6"]', { timeout: 8000 });
    await new Promise((r) => setTimeout(r, 5000));
    await iframeCt.click('[id="tabZoneId6"]');
    await new Promise((r) => setTimeout(r, 5000));
    console.log("filtro");

    //clica no dropdown e selceciona a opção "ontem e fecha o filtro"
    await iframeCt.click('[id="dijit_form_DropDownButton_0"]');
    await iframeCt.click('[class="column1"]');
    await new Promise((r) => setTimeout(r, 5000));
    await iframeCt.click('[id="dijit_form_DropDownButton_0"]');
    await new Promise((r) => setTimeout(r, 5000));
    await iframeCt.click(' [id="tableau_base_widget_QuickFilterPanel_1"]');
    await new Promise((r) => setTimeout(r, 3000));
    await iframeCt.click(' [id="dijit_form_Button_3"]');
    await new Promise((r) => setTimeout(r, 3000));
    await iframeCt.click('[id="tabZoneId6"]');
    await new Promise((r) => setTimeout(r, 5000));
    console.log("dropdown");

    // clica em dowload
    await iframeCt.click('[id="tabZoneId134"]');
    await new Promise((r) => setTimeout(r, 5000));

    await iframeCt.click(
      "#export-crosstab-options-dialog-Dialog-BodyWrapper-Dialog-Body-Id > div > div:nth-child(1) > div.f1lp596a > div > div > div:nth-child(2)"
    );
    await iframeCt.click(
      "#export-crosstab-options-dialog-Dialog-BodyWrapper-Dialog-Body-Id > div > div.fdr6v0d > button"
    );
    await new Promise((r) => setTimeout(r, 10000));
    console.log("dowload");

    return { data: "", message: "OK" };
  } catch (error) {
    return { data: error, message: "ERROR" };
  }
}

module.exports = RespostaPorTarget;
