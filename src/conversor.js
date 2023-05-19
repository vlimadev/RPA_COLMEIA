const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

try {
  if (req.file?.filename == null || req.file.filename == "undefined") {
    res.status(400).json("Nenhum arquivo");
  } else {
    const filePath = "uploads/" + req.file.filename;

    const excelData = excelToJson({
      sourceFile: filePath,
      header: {
        rows: 1,
      },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
    });

    res.status(200).json(excelData);
    fs.unlinkSync(filePath);
  }
} catch (error) {
  res.status(500);
}
