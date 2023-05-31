#!/bin/sh

node ./rpa/src/index.js
exit_code=$?

if [ $exit_code -eq 0 ]; then
  echo "Relatórios extraídos com sucesso."
else
  echo "Houve um problema ao extrair os relatórios. Código de saída: $exit_code"
  exit $exit_code
fi

downloadsFolder="./rpa/uploads"

for spreadsheet in "$downloadsFolder"/*; do
  if [ -f "$spreadsheet" ]; then
    curl -X POST -F "file=@$spreadsheet" http://localhost:4000/postFile
  fi
done

echo "Relatórios enviados com sucesso."