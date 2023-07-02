#!/bin/sh

# Caminho para o arquivo JavaScript de destino
JS_FILE=assets/js/config.js

# Gera o conteúdo do arquivo JavaScript com as variáveis de ambiente
cat <<EOT > $JS_FILE
// Arquivo gerado automaticamente pelo script init.sh para configuração da api no front
const APT_PROTOCOL =  "${API_PROTOCOL}",
const API_URL = "${API_URL}",
const API_PORT ="${API_PORT}"

EOT
echo "Arquivo $JS_FILE gerado com sucesso!"
# Permite que o Nginx leia o arquivo JavaScript gerado
chmod 644 $JS_FILE
