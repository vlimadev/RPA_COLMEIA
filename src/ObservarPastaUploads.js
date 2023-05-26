const fs = require("fs");
const path = require("path");
const convertExcelToJson = require("convert-excel-to-json");

// Diretório da pasta "uploads"
const diretorioUploads = "../uploads";

// Função para converter arquivo XLSX para JSON
function converterXlsxParaJson(arquivoXlsx) {
  const resultado = convertExcelToJson({
    sourceFile: arquivoXlsx,
    header: {
      rows: 1,
    },
    sheets: [
      {
        name: "Sheet 1",
      },
    ],
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });

  // Manipule o resultado da conversão conforme necessário
  // ...

  return resultado;
}

// Função para apagar o arquivo
function apagarArquivo(caminhoArquivo) {
  fs.unlink(caminhoArquivo, (err) => {
    if (err) {
      console.error("Erro ao apagar o arquivo:", err);
    } else {
      console.log("Arquivo apagado com sucesso:", caminhoArquivo);
    }
  });
}

// Função para observar a pasta "uploads"
function ObservarPastaUploads() {
  fs.readdir(diretorioUploads, (err, arquivos) => {
    if (err) {
      console.error('Erro ao ler a pasta "uploads":', err);
      return;
    }

    arquivos.forEach((arquivo) => {
      const caminhoArquivo = path.join(diretorioUploads, arquivo);

      // Verifica se o arquivo é "x" ou "y"
      if (arquivo === "Planilha 54.xlsx" || arquivo === "y.xlsx") {
        // Realiza a conversão de XLSX para JSON
        const resultado = converterXlsxParaJson(caminhoArquivo);

        console.log(resultado);

        // Manipule o resultado da conversão conforme necessário
        // ...

        // Apaga o arquivo
        // apagarArquivo(caminhoArquivo);
      }
    });
  });
}

// Inicia a observação da pasta "uploads"
module.exports = ObservarPastaUploads;
