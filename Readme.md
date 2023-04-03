# MyCrudApp
Este projeto contém uma aplicação web Ext JS que realiza operações CRUD e um servidor Node.js que utiliza o framework Express para fornecer APIs para um banco de dados SQLite.

## Começando
Siga as instruções abaixo para obter uma cópia do projeto em execução em sua máquina local.

### git clone https://github.com/francielleandro/CRUD-EXTJS7.git

Acesse o diretório do projeto:

### cd my-crud-app

## Como utilizar o servidor
O projeto do servidor esta na pasta /server.


## Instalação das dependências
Para instalar as dependências necessárias para executar o servidor, basta executar o seguinte comando na pasta raiz do projeto:


### npm install
Este comando irá instalar as dependências especificadas no arquivo package.json e as salvará no diretório node_modules.

## Criação do banco de dados
Antes de executar o servidor, é necessário criar o banco de dados SQLite. Para isso, execute o seguinte comando:


#### npm run initdb
Este comando irá criar um arquivo database.db no diretório raiz do projeto contendo o banco de dados vazio.

## Executando o servidor
Para executar o servidor em modo de desenvolvimento, utilize o seguinte comando:


### npm run dev
Este comando iniciará o servidor na porta 3000 e automaticamente recarregará o servidor quando houver mudanças no código fonte.

Para executar o servidor em modo de produção, utilize o seguinte comando:


### npm start
Este comando iniciará o servidor na porta 3000.

## Aplicação WEB

A aplicação web esta na raiz do projeto, a pasta src contem os fontes.

## Instale as dependências:

Para utilizar a aplicação foi utilizado a versão 8.11.0 do nodejs, as verões mais novas podem não ser compativeis com o EXTJS7.0 CE

### npm install

Para iniciar o servidor de desenvolvimento, execute:

### npm start
Isso iniciará a aplicação web em sua máquina local na porta 1962: http://localhost:1962/

## Compilando
Para compilar a aplicação web para produção, execute:

### npm run build
Isso criará um diretório de compilação contendo os arquivos da aplicação compilados.

Construído com
Ext JS - O framework web usado
Webpack - O empacotador de módulo usado
### Licença
Este projeto está licenciado sob a Licença ISC
