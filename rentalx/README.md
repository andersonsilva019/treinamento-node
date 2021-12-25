## Cadastro de carro

**Requisito funcional**
- [x] Deve ser possível cadastrar um novo carro.

**Regra de negócio**
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O carro deve ser cadastrado com disponibilidade com valor padrão.
- O usuário responsável pelo cadastro deve ser um usuário com credenciais de administrador.

## Listagem de carro

**Requisito funcional**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome da marca
- Deve ser possível listar todos os carros disponíveis pelo nome do carro

**Regra de negócio**
- Para o usuário poder fazer uma consulta não é necessário realizar um cadastro no sistema.

## Cadastro de especificação no carro

**Requisito funcional**
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**Regra de negócio**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário com credenciais de administrador.

## Cadastro de imagens do carro

**Requisito funcional**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**Requisito não funcional**
- Deve utilizar o [multer](https://github.com/expressjs/multer) para upload dos arquivos.

**Regra de negócio**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário com credenciais de administrador.

## Aluguel de carros

**Requisito funcional**
- Deve ser possível cadastrar um aluguel 

**Regra de negócio**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um nome aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um nome aluguel caso já exista um aberto para o mesmo carro

