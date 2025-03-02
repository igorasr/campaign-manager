
# Gerenciador de Campanhas - Teste Técnico

Este projeto é uma aplicação backend desenvolvida como parte de um teste técnico. O sistema gerencia campanhas, permitindo criar, ler, atualizar e excluir campanhas. A API é construída utilizando **NestJS** e segue a arquitetura RESTful. Além disso, a aplicação inclui validações de data e status das campanhas, bem como testes unitários para garantir o correto funcionamento da aplicação.

## Funcionalidades

- **Criação de campanhas**: Permite criar uma campanha com informações como nome, data de início, data de término, status e categoria.
- **Leitura de campanhas**: Permite consultar todas as campanhas ou uma campanha específica pelo ID.
- **Atualização de campanhas**: Permite atualizar uma campanha existente, com validações de datas.
- **Exclusão de campanhas**: Realiza exclusões suaves (soft delete) de campanhas.

## Tecnologias Utilizadas

- **Node.js** com **NestJS**
- **TypeScript**
- **Jest** para testes unitários
- **Docker** para orquestração de banco de dados
- **Swagger** para documentação da API
- **class-validator** para validações de entrada

## Estrutura do Projeto

- **Controller**: Responsável por lidar com as requisições HTTP.
- **Service**: Contém a lógica de negócios e manipulação de dados.
- **Repository**: Camada de acesso ao banco de dados.
- **DTOs**: Definem a estrutura dos dados de entrada e saída das rotas da API.

## Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/igorasr/campaign-manager.git
cd campaign-manager
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o Docker para o banco de dados

Certifique-se de que o Docker está instalado e em execução. Para subir o banco de dados (no caso, um banco de dados MySQL), execute:

```bash
docker-compose up -d
```

### 4. Execute o projeto

Para iniciar o servidor de desenvolvimento, rode o comando:

```bash
npm run start:dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Como Visualizar a Documentação da API

A documentação da API foi gerada automaticamente utilizando o **Swagger**. Para acessá-la, após iniciar o servidor, basta acessar:

[http://localhost:3000/api](http://localhost:3000/api)

A documentação irá listar todas as rotas da API, seus parâmetros, e exemplos de como utilizá-las.

## Como Rodar os Testes

Os testes unitários e de integração são realizados com **Jest**.

### 1. Para rodar os testes unitários, execute:

```bash
npm run test
```

Isso irá rodar todos os testes definidos nas pastas de teste e verificar se todas as funcionalidades estão funcionando corretamente.

### 2. Para rodar os testes em modo de observação (watch mode), execute:

```bash
npm run test:watch
```

Isso irá rodar os testes sempre que houver alterações nos arquivos de teste.

