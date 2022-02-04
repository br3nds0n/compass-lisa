# CompassoLisa Dealership <img align="right" src="https://img.shields.io/static/v1?label=project&message=Compass&color=F0FD71&style=for-the-badge&logo=ghost"/>
<p align="center">
<img height="250" width="850" src="https://user-images.githubusercontent.com/82064724/150918098-41ff1343-8996-429c-92e3-9f13eedbc632.gif">
</p>


Bem-vindo(a). Ao desafio Final!

Opa dev tudo bem?! Meu nome é Brendson sou o [autor](#-Autor) desse projeto, que espelha todo meu conhecimento adquirido ao decorrer do programa de bolsas. Venho através desse repositório entregar a primeira parte do desafio. Espero que goste!!

Vamos ao projeto! `#dreamBigger🚀💛`

<br>

> <b>Status code:</b>  Finalizada!! ✔

 ## <img height="18" width="18" src="https://user-images.githubusercontent.com/82064724/151113975-e8ff6813-b253-4670-b626-80e842363ab2.png">Indice
<!--ts-->
   * [🧠 Contexto](#-Contexto)
     * [Rotas](#-car)
   * [📥 Baixar e executar o projeto](#-Baixar-e-executar-o-projeto)
     * [Setup da aplicação](#-setup-da-aplicação)
     * [Iniciando a aplicação](#-iniciando-a-aplicação)
   * [🧪 Testando rotas](#-testando-rotas)
      * [Car](#-car-1) 
      * [People](#-people-1)
      * [Authenticate](#-authenticate-1)
   * [🛠 Tecnologias](#-tecnologias)
   * [🏆 Agradecimentos](#-Agradecimentos)
   * [✍🏼 Autor](#-Autor)
   * [📝 Licença](#-licença)
   * [🎁 Bonus](#-Bonus)
<!--te-->

 ---

 ## 🧠 Contexto
> **Característica do Desafio:** 🚧  *API REST FULL*  🚧

Nesta parte 01 do [desafio](https://github.com/br3nds0n/reademefinal/files/7939240/Desafio_Final-_Part._1.pdf) final do programa de bolsas, será a criação de um seguimento carros para alugar de luxo e semi luxo. Nesta API terá os fluxos de:

 * Interação de métodos http. (criar, buscar, editar e remover);
 * Busca por query params;
 * Paginação;
 * Autenticação de cadastro;


 ### 🚐 Car
> Rota: `http://localhost:<PORT>/api/v1/car`

| Id        | Request                                        | Endpoint                 |
|-----------| -----------------------------------------------| -------------------------|
|1          |  [POST](#post-httplocalhost3000apiv1car)       | cadastrar um carro       |
|2          |  [GET](#get-httplocalhost3000apiv1car)         | listar todos carros      |
|3          |  [DELETE](#delete-httplocalhost3000apiv1carid) | remover um carro         |
|4          |  [PUT](#put-httplocalhost3000apiv1carid)       | atualiza carro cadastrado|
|5          |  [GET/:id](#getid--httplocalhost3000apiv1carid)| buscar um carro          |

#

### 👤 People
> Rota: `http://localhost:<PORT>/api/v1/people`
 
| Id        | Request                                          | Endpoint                 |
|---------- | -------------------------------------------------| -------------------------|
|1          | [POST](#post-httplocalhost3000apiv1people)       | cadastrar uma pessoa     |
|2          | [GET](#get-httplocalhost3000apiv1people)         | listar todas as pessoas  |
|3          | [DELETE](#delete-httplocalhost3000apiv1peopleid) | remover uma pessoa       |
|4          | [PUT](#put-httplocalhost3000apiv1peopleid)       | atualiza uma pessoa      |
|5          | [GET/:id](#getid--httplocalhost3000apiv1peopleid)| buscar uma pessoa        |

#

### 🔐 Authenticate
> Rota: `http://localhost:<PORT>/api/v1/authenticate`

| Id             | Request                                          | Endpoint                          |
|--------------- | ------------------------------------------------ | ----------------------------------|
|1               | [POST](#post-httplocalhost3000apiv1authenticate) | Atutenticar Cadastro de people    |

<br>

[<Back](#indice)

---

## 📥 Baixar e executar o projeto

###  Pré-requisitos


Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Postman](https://www.postman.com/downloads/) e [MongoDB](https://www.mongodb.com/pt-br).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).


### 💻 Setup da aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/br3nds0n/compass-lisa.git>

# Acesse a pasta do projeto no terminal
$ cd compass-lisa

# Instale as dependências
$ npm install
```

#

### ⚙ Configurar as variáveis de ambiente
> Será necessário criar na raiz do projeto um arquivo `.env` configurar as variáveis. Exemplo:

```bash
# Porta que o servidor irá rodar.
PORT=3000

# Endereço para conectar com o Mongo.
# Exemplo:
DB_HOST=mongodb://localhost:27017/<name>
```

#

### ▶ Iniciando a aplicação
> Após configurar as variáveis ambientes no `.env`. Iremos executar o seguinte comando para rodar a aplicação:
```bash
# Rodando em modo de produção
$ npm start


# Rodando em modo de produção
$ npm run dev

# O projeto inciará na porta:<PORT> - acesse <http://localhost:<PORT>/api/v1/> no postman
```
<br>

[<Back](#indice)

---

## 🧪 Testando rotas
> Para testar as rotas abra um novo terminal:
```bash
# Use o script de tests
$ npm run test
```
> Resultado esperado:
<img src="https://user-images.githubusercontent.com/82064724/152529117-792e3610-7824-4904-aacd-bd1f165fcfdf.png">

<br>

 ### 🚐 Car
> <h4><b>POST:</b> <code>http://localhost:3000/api/v1/car</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152077188-f4a4a458-a783-451c-971d-a8d4e7e351f8.gif">

> <h4>🚧 Possíveis erros -> status: 400 <i>Bad Request</i> 🚧</h4>

```json
{
    "message": "Bad Request",
    "details": [
        "\"modelo\" is not allowed to be empty",
        "\"cor\" is not allowed to be empty",
        "\"ano\" must be in YYYY format",
        "\"acessorios[0].descricao\" is not allowed to be empty",
        "\"quantidadePassageiros\" must be a number"
    ]
}
```

<br>

[<Back](#-car)

<br>

> <h4><b>GET:</b> <code>http://localhost:3000/api/v1/car</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152077409-dae2aad8-5295-4ba7-8d1a-4ca68fc8222e.gif">

> <h4>🚧 Possíveis erros -> status: 400 <i>Bad Request</i> 🚧</h4>

```json
{
   "message": "Bad Request"
}
```

<br>

[<Back](#-car)

<br>

> <h4><b>DELETE:</b> <code>http://localhost:3000/api/v1/car/:id</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152078508-a53b2bf1-4a47-4f12-90a7-dfbe3c4f28d4.gif">

> <h4>🚧 Possíveis erros -> status: 404 <i>Not Found</i>🚧</h4>

```json
{
    {
    "message": "Not Found",
    "details": [
        "Cannot find vehicle with ID = '' "
    ]
}
}
```
<br>

[<Back](#-car)

<br>

> <h4><b>PUT:</b> <code>http://localhost:3000/api/v1/car/:id</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152077724-7a54a0aa-e15b-45d1-9ded-cf113419db03.gif">

> <h4>🚧 Possíveis erros -> status: 400 <i>Bad Request</i> or 404 <i>Not Found</i>🚧</h4>

```json
{   
    {
    "message": "Bad Request",
    "details": [
        "\"modelo\" is not allowed to be empty",
        "\"cor\" is not allowed to be empty",
        "\"ano\" must be in YYYY format",
        "\"acessorios[0].descricao\" is not allowed to be empty",
        "\"quantidadePassageiros\" must be a number"
    ]
}

    {
    "message": "Not Found",
    "details": [
        "Cannot find vehicle with ID = '' "
    ]
}
}
```
<br>

[<Back](#-car)

<br>

> <h4><b>GET/:id :</b> <code>http://localhost:3000/api/v1/car/:id</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152078027-e18c4db4-18db-4e06-9117-6ab9c6e76d6e.gif">

> <h4>🚧 Possíveis erros -> status: 404 <i>Not Found</i> 🚧</h4>

```json
{
    {
    "message": "Not Found",
    "details": [
        "Cannot find vehicle with ID = '' "
    ]
}
}
```

<br>

[<Back](#-car)

#

### 👤 People
> <h4><b>POST:</b> <code>http://localhost:3000/api/v1/people</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152034260-91b7b2a0-baad-4f3d-b05f-8a959cecbcf5.gif">

> <h4>🚧 Possíveis erros -> status: 400 <i>Bad Request</i> 🚧</h4>

```json
{
    "message": "Bad Request",
    "details": [
        "\"nome\" is not allowed to be empty",
        "\"cpf\" is not allowed to be empty",
        "\"data_nascimento\" must be in DD/MM/YYYY format",
        "\"email\" is not allowed to be empty",
        "\"senha\" is not allowed to be empty",
        "\"habilitado\" must be one of [não, sim]",
        "\"habilitado\" is not allowed to be empty"
    ]
}
```
<br>

[<Back](#-people)

<br>

> <h4><b>GET:</b> <code>http://localhost:3000/api/v1/people</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152060833-57d74ec2-4642-41f5-ab2e-ab7034e46760.gif">


> <h4>🚧 Possíveis erros -> status: 400 <i>Bad Request</i> 🚧</h4>

```json
{
   "message": "Bad Request"
}
```

<br>

[<Back](#-people)

<br>

> <h4><b>DELETE:</b> <code>http://localhost:3000/api/v1/people/:id</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152075784-8afea29c-dcc6-49db-9eab-10fc3abd5e47.gif">


> <h4>🚧 Possíveis erros -> status: 404 <i>Not Found</i> 🚧</h4>

```json
{
    {
    "message": "Not Found",
    "details": [
        "Cannot find customer with ID = '' "
    ]
}
}
```

<br>

[<Back](#-people)

<br>

> <h4><b>PUT:</b> <code>http://localhost:3000/api/v1/people/:id</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152074814-0d360db6-d9d9-433b-b91d-0bd9a3e6e75e.gif">

> <h4>🚧 Possíveis erros -> status: 400 <i>Bad Request</i> or 404 <i>Not Found</i>🚧</h4>

```json
{   
    {
    "message": "Bad Request",
    "details": [
        "\"nome\" is not allowed to be empty",
        "\"cpf\" is not allowed to be empty",
        "\"data_nascimento\" must be in DD/MM/YYYY format",
        "\"email\" is not allowed to be empty",
        "\"senha\" is not allowed to be empty",
        "\"habilitado\" must be one of [não, sim]",
        "\"habilitado\" is not allowed to be empty"
    ]
}

    {
    "message": "Not Found",
    "details": [
        "Cannot find customer with ID = '' "
    ]
}
}
```

<br>

[<Back](#-people)

<br>

> <h4><b>GET/:id :</b> <code>http://localhost:3000/api/v1/people/:id</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152062445-f766f114-9994-4cc6-bdb7-0b2cc684a425.gif">

> <h4>🚧 Possíveis erros -> status: 404 <i>Not Found</i> 🚧</h4>

```json
{
    {
    "message": "Not Found",
    "details": [
        "Cannot find customer with ID = '' "
    ]
}
}
```

<br>

[<Back](#-people)

#

### 🔐 Authenticate
> <h4><b>POST:</b> <code>http://localhost:3000/api/v1/authenticate</code></h4> 

<img height="420" width="850" src="https://user-images.githubusercontent.com/82064724/152051256-1a5cc4ab-09b9-4c82-be5d-3680e72103f1.gif">

> <h4>🚧 Possíveis erros -> status: 400 <i>Bad Request</i> 🚧</h4>

```json
{
    "message": "Bad Request",
    "details": [
        "\"email\" must be a valid email",
        "\"senha\" length must be at least 6 characters long",
        "\"senha\" Invalid password"
    ]
}
```
<br>

[<Back](#indice)

---
## 🛠 Tecnologias

As seguintes ferramentas/tecnologias foram usadas na construção e testagem do projeto. Clicando no icone da tecnologia, você será redirecionado para o site oficial para instalação: <br>

| logo               | Framework                  | Version      |
| :----------------- | :------------------------- | :----------: |
| <a href="https://nodejs.org/pt-br/download/" target="_blank"><img align="center" alt="nodeJs" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/nodejs/nodejs-original.svg"></a>                   | NodeJs                     |  `16.13.1`      |
| <a href="https://www.mongodb.com/try/download/community" target="_blank"><img align="center" alt="mongo" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original.svg"></a>            | MongoDB                      |  `5.0.5`       |
| <a href="https://www.postman.com/downloads/" target="_blank"><img align="center" alt="postman" height="30" width="30" src="https://user-images.githubusercontent.com/82064724/147416090-89b4e7a3-2b78-417a-a154-f47940d23e38.png">            | Postman                    |  `9.6.2`       |
| <a href="https://code.visualstudio.com/download" target="_blank"><img align="center" alt="VsCode" height="25" width="35" src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original.svg"></a> | VsCode | `1.63.2` |

---

## **🏆 Agradecimentos**

<div align=left style="width:100%">
<table>
  <tr align=center>
    <th>CompassUol</th>
    <th>Felipe</th>
    <th>Thais </th>
    <th>Diego</th>
    <th>Bruna</th>
    <th>Gabriel</th>
    <th>Giovanni</th>
  </tr>
  <td>
      <a href="https://compass.uol/">
        <img width="100" height="100" src="https://user-images.githubusercontent.com/82064724/147250813-a8ffeeaa-d1e0-464d-b157-5b1832419962.jpg">
      </a>
    </td>
    <td>
      <a href="https://www.linkedin.com/in/felps03/">
        <img width="138" height="120" src="https://user-images.githubusercontent.com/82064724/147247938-ad746eb0-6acb-493d-a5a1-f18ced1f79ea.jpeg">
      </a>
    </td>
    <td>
      <a href="https://www.linkedin.com/in/thaisnicodemus/">
        <img width="138" height="120" src="https://user-images.githubusercontent.com/82064724/147248193-cb95b8e0-9b86-4788-9c99-1f7d81a67c5c.jpeg">
      </a>
    </td>
    <td>
      <a href="https://www.linkedin.com/in/diego-scacinate-13b790b5/">
        <img width="138" height="120" src="https://user-images.githubusercontent.com/82064724/147248671-1433631f-d30e-43ef-8a90-11f1eb0dad6e.jpeg">
      </a>
    </td>
    <td>
      <a href="https://www.linkedin.com/in/brunasantos14/">
        <img width="138" height="120" src="https://user-images.githubusercontent.com/82064724/147249013-2461e045-8883-45b3-8aaa-54f25b0039a2.jpeg">
      </a>
    </td>
      <td>
      <a href="https://www.linkedin.com/in/gabriel-missio-5a423b192/">
        <img width="138" height="120" src="https://user-images.githubusercontent.com/82064724/148302349-1139200d-fda8-4c27-900a-3f6a71a7da1c.jpeg">
      </a>
    </td>
 <td>
      <a href="https://www.linkedin.com/in/giovanni-hoffmann-rodrigues-9253266a/">
        <img width="138" height="120" src="https://user-images.githubusercontent.com/82064724/147251080-3157eb74-fce3-4467-982b-8f04a33a62df.jpeg">
      </a>
    </td>
  </tr>
</table>

</div>

<br>

## ✍🏼 Autor

Esse é meu último projeto do programa de bolsas da compasso, fico muito feliz em perceber minha evolução ao decorrer do programa. Lembro de quando recebi a ligação me convidando para fazer parte do programa, só Deus e a recrutadora sabe o quanto eu comemorei(hehehe). E agora está no final do programa e só tenho a agradecer a todos que estavam a frente dessa turma. 

Obrigado [Felipe](https://www.linkedin.com/in/felps03/), [Bruna](https://www.linkedin.com/in/brunasantos14/) e [Gabriel](https://www.linkedin.com/in/gabriel-missio-5a423b192/) por tirarem minhas dúvidas e me ajudar sempre que eu precisei(e os puxões de orelha de orelha foram os melhores hehe), [Thais](https://www.linkedin.com/in/thaisnicodemus/) nossa scrum master sempre atenciosa com todos, não posso esquecer do nosso querio amigo do bigboss [Diego](https://www.linkedin.com/in/diego-scacinate-13b790b5/) (um dia vou dar uma volta na sua ferrari kkk), também ao [Giovanni](https://www.linkedin.com/in/giovanni-hoffmann-rodrigues-9253266a/) que sempre está ali para nos ajudar e dar apoio. 

Esse é o projeto final mas não é o fim. Apenas o começo, vamos nos ver na [compasso](https://compass.uol/)!!`#dreamBigger🚀💛`<br>


<div align=left>

- <table>
 <p>  Desenvolvido por:</p>
  <tr align=center>
    <th><strong> 🎖 Brendson Victor  </strong></th>
  </tr>
   <td>
      <a href="https://github.com/br3nds0n">
        <img width="168" height="140" src="https://media-exp1.licdn.com/dms/image/C4D03AQEEcv8U2Gtelg/profile-displayphoto-shrink_200_200/0/1639870971995?e=1648684800&v=beta&t=C5q0hXTUQDtBbMAJd1zIle008VvKvnzulFoS6BSschs" > <p align="left">
</p></a>
    </td>
  </tr>
</table>
</div>

<div align=left>

---
 
## 📝 LICENÇA

Esse repositório está licenciado pela **MIT LICENSE**. Para mais informações detalhadas, leia o arquivo [LICENSE](./LICENSE) contido nesse repositório.

 [<Back](#compassolisa-dealership-)
 
 <br>

## 🎁 Bonus

 #### [Felipe](https://www.linkedin.com/in/felps03/), [Bruna](https://www.linkedin.com/in/brunasantos14/) e [Giovanni](https://www.linkedin.com/in/giovanni-hoffmann-rodrigues-9253266a/) depois desse projeto: 
 
  <img width="900" height="300" src="https://pm1.narvii.com/6359/1ec89eddc009439df6ac56cd7890f1e08e680fb6_hq.jpg">
