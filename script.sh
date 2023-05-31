#!/bin/sh

node ./rpa/src/index.js
exit_code=$?

if [ $exit_code -eq 0 ]; then
  echo "Relatórios extraídos com sucesso."
else
  echo "Houve um problema ao extrair os relatórios. Código de saída: $exit_code"
  exit $exit_code
fi

diretorio="./rpa/uploads"

for arquivo in "$diretorio"/*; do
  if [ -f "$arquivo" ]; then
    curl -X POST -d "@$arquivo" http://exemplo.com/endpoint
  fi
done

echo "Relatórios enviados com sucesso."