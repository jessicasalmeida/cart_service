# Ambiente

## Preparando o ambiente

### Opção - Executando em ambiente Docker Orquestrador Rabbit MQ
- Passo 1: Execute RABBIT MQ docker run -d --hostname my-rabbit --name rabbit13 -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
- Passo 2: Execute POSTGRESS docker run -p 5432:5432 -v /tmp/database:/var/lib/postgresql/data -e POSTGRES_PASSWORD=1234 postgres
- Passo 3: Execute os microserviços cart, payment, order com os seguintes comandos, npm run install, npm run build e npm run dev
- Passo 4: Com o postman importe fiap_restaurante.postman_collection.json
> Aplicação disponivel na porta 8000, 5000 e 3000 e servidor do Rabbit MQ para visualização das filas http://localhost:8080/#/queues

### Opção - Executando na AWS
## Provisionando a Infra AWS
- Passo 1: Clone o repositório com os arquivos do TERRAFORM https://github.com/jessicasalmeida/infraaws-terraform
- Passo 2: Altere as credencias e as roles no arquivo .vars
- Passo 3: Execute os seguintes com comandos, terraform init, terraform plan, terrafom apply -auto-approve infra será provisionada na AWS
## Upload das imagens
- Passo 1: Clone os projetos dos microserviços: https://github.com/jessicasalmeida/cart_service, https://github.com/jessicasalmeida/orderservice e https://github.com/jessicasalmeida/paymentservice
- Execute os seguintes comandos em microserviço, ja clonado: npm run install e npm run build.
- Passo 2: Configure as credencias da AWS em "C:\Users\XX\.aws\credentials"
- Passo 3: Build a imagem dos microserviços para cada um deles. Ex: docker build . -t cart:latest
- Passo 4: Faça upload ads imagens para aws em todos os microserviços com os seguintes comandos:
  - aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin XXX.dkr.ecr.us-east-1.amazonaws.com/payment
  - docker tag payment:latest XXX.dkr.ecr.us-east-1.amazonaws.com/payment:latest
  - docker push XXX.dkr.ecr.us-east-1.amazonaws.com/payment:latest
- Passo 5: Projeto disponivel na AWS
- Passo 6: Copie a URL da API Gateway para ter acesso a aplicação
- Passo 7: Chame a rota de login com os seguintes dados de acesso: {"username": "fiap","password": "Fase!324"}, copie o token no header e ja pode chamar as demais rotas.

### SAGA COREOGRAFADA
- Justificativa: A estratégia utilizada para a saga foi a coreografada, para permitir o desacoplamento entre os serviços, sem uma peça central que pode nos tornar refem da sua disponibilidade. Assim podemos escalar mais facilmente os serviços ja que estamos utilizando serviços em nuvem, temos essa vantagem de não depender de componentes de hardware e escalar a aplicação conforme nossos serviços precisem com a comunicação distribuida. Do ponto de vista de resiliencia Os serviços funcionam mesmo que outro esteja fora. Foi possivel escolher a coreografada neste cenários pois nossos serviços não possuem fluxos de trabalho complexos ao ponto de centralizar

### Links DOCs
- OWASP ZAP HTML: https://github.com/jessicasalmeida/cart_service/blob/master/docs/ZAP%20Scanning%20Report%20-%20https___0gqz34jzk7.execute-api.us-east-1.amazonaws.com.html
- OWASP ZAP files: https://github.com/jessicasalmeida/cart_service/tree/master/docs/ZAP%20Scanning%20Report%20-%20https___0gqz34jzk7.execute-api.us-east-1.amazonaws.com_files
- OWASP ZAP POS CORREÇÕES: https://github.com/jessicasalmeida/cart_service/blob/master/docs/2024-09-10-ZAP-Report-pos-correcoes.html
- OWASP ZAP POS CORREÇÕES FILES: https://github.com/jessicasalmeida/cart_service/tree/master/docs/2024-09-10-ZAP-Report-pos-correcoes
  - Foi adicionado a política de CSP (Content Security Policy), apenas as rotas mapeadas passaram a devolver no header infos sobre a politica, quando eram rotas não mapeadas obtive 404 no relatório e manteve 1 alerta médio, mas para as rotas descritas da entrega foram corrigidas
- RIPD:https://github.com/jessicasalmeida/cart_service/blob/master/docs/RIPD.rtf
- Desenho Arquitetura: https://github.com/jessicasalmeida/cart_service/blob/master/docs/arquitetura.png
- Video: https://youtu.be/K5IB4d1KSpQ

# Dados das APIs

## Gestão de Products

- getAllProducts: 
   - Endpoint: /product
   - ***TIP: para agilidades nos testes do professor este método carrega os produtos no banco de dados***

- createProduct: 
   - Endpoint: /product/
    > Exemplo:
    {
        "name": "Sorvete Misto",
        "options": [],
        "category": "sobremesa",
        "price": 10,
        "timeToPrepare": 2,
        "status": true
    }
    - ***TIP: salve o ID caso queira usar posteriormente***

- getProductById: 
   - Endpoint: /product/:id
   > Exemplo: product/65aeffe53cb25a62bcec76f7

- updateProductById: 
   - Endpoint: /product/:id
   > Exemplo: product/65aeffe53cb25a62bcec76f7
    {
        "name": "Sorvete Misto G",
        "options": [],
        "category": "sobremesa",
        "price": 10,
        "timeToPrepare": 2,
        "status": true
    }
- deleteProductById: 
   - Endpoint: /product/:id
   - Politica: Um produto só pode ser excluido/desativado se não estiver em nenhuma order ativa.
   - Para testar que está em uma order ativa adicione o produto no carrinho e o avance com a API receiveOrder,
neste momento o pedido esta ativo e o produto não poderá ser excluido
   > Exemplo: product/65aeffe53cb25a62bcec76f7

- deactivateProductById: 
   - Endpoint: /product/deactive/:id
  - Politica: Um produto só pode ser excluido/desativado se não estiver em nenhuma order ativa
   > Exemplo: product/65aeffe53cb25a62bcec76f7


- getProductByCategory: 
   - Endpoint: /product/categoria/:categoria
   > Exemplo: product/categoria/combo || product/categoria/lanche || product/categoria/bebida || product/categoria/sobremesa || product/categoria/acompanhamento
   - ***TIP: EndPoint criado para facilitar a consulta da categoria de products para montagem do cart***


## Gestão de Users

- createUser: 
   - Endpoint: /users
   - ***TIP: Copie o ID do createUser para usar nos próximos passos***
   >Exemplo:
    {
        "cpf": "000.000.000-00",
        "name": "Professor",
        "email": "professor@fiap.com"
    }


- getUserById: 
   - Endpoint: /users/:id
   > Exemplo:
    users/65ad86e5c8f936abc7bb2fb3



## Gestão de Cart
- createCart: 
   - Endpoint: /cart/
   - ***TIP: Copie o ID do cart para usar nos próximos passos***

- addUser: 
   - Endpoint: /cart/user/:id
   > Exemplo: /cart/user/65b19e8f5fe107d74bd05ce0?user=65ad86e5c8f936abc7bb2fb3

- addProduct: 
   - Endpoint: /cart/product/:id
   - Policies: Ao adicionar 1 compo e posteriomente adicionar 1 bebida e 1 acompanhamento, este itens terão seu valor zerado no cart, pois são inclusos no combo
   > Exemplo: /cart/product/65b19e8f5fe107d74bd05ce0?product=65b1a124e453756a9567b9c7
   - ***TIP: Ao adicionar use getProductByCategory para verificar quais os produtos da categoria pretendida***

- personalizeItens: 
   - Endpoint: /cart/itens/:id
   > Exemplo: /cart/itens/65b19e8f5fe107d74bd05ce0?product=65b1a124e453756a9567b9c7&options=["Pão com Gergelim","Hamburguer","Queijo Cheddar","Ketchup","Mostarda","Cebola","Picles"]

- resumeCart: 
   - Endpoint: /cart/:id
    > Exemplo: /cart/65b19e8f5fe107d74bd05ce0

- closeCart: 
   - Endpoint: /cart/close/:id
    > Exemplo: /cart/close/65b19e8f5fe107d74bd05ce0

- payCart: 
   - Endpoint: /cart/pay/:id
   > Exemplo: /cart/pay/65b19e8f5fe107d74bd05ce0

- sendToKitchen: 
   - Endpoint: /cart/kitchen/:id
   > Exemplo: /cart/kitchen/65b19e8f5fe107d74bd05ce0

- cancelCart: 
   - Endpoint: /cart/cancel/:id
   > Exemplo: /cart/cancel/65b19e8f5fe107d74bd05ce0



## Gestão de ORDER

- receiveOrder: 
   - Endpoint: /order/receive/:id
   >Exemplo: /order/receive/65b19e8f5fe107d74bd05ce0
   - ***TIP: Agora você esta manipulando a order. Copie e cole o id da order para sequencia das proximas***

- prepareOrder: 
   - Endpoint: /order/prepare/:id
  > Exemplo: /order/prepare/65b1a8b7f56e976b1536bf52

- estimateDelivery: 
   - Endpoint: /order/estimate/:id
   > Exemplo: /order/prepare/65b1a8b7f56e976b1536bf52
   - Policies: Nesta etapa é validada a fila de pedidos ativos, diferente de closed e ready e somada as estimativas de preparo de todos os pedidos anteriores ao atual)

- updateStatusToReady: 
   - Endpoint: /order/update/ready/:id
   > Exemplo: /order/prepare/65b1a8b7f56e976b1536bf52

- updateStatusToDelivered: 
   - Endpoint: /order/update/delivered/:id
   > Exemplo: /order/update/delivered/65b1a8b7f56e976b1536bf52

- updateStatusToClosed: 
   - Endpoint: /order/update/closed/:id
  > Exemplo: /order/update/closed/65b1a8b7f56e976b1536bf52

- getAllActiveOrders: 
   - Endpoint: /order/

