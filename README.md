# Aplicação Web em Node.js + Express

Aplicação web simples baseada no modelo **request/response**, criada para a
atividade da faculdade. Possui três rotas, e cada uma responde com uma
página HTML.

## Autores

- Vanessa Sousa
- Matheus Albino

## Rotas

| Rota            | Descrição                                               |
|-----------------|---------------------------------------------------------|
| `/`             | Página inicial, com a descrição do projeto              |
| `/calculadora`  | Usa o módulo `calculadora.js` para fazer contas         |
| `/autores`      | Quem desenvolveu o projeto                              |

## Como rodar localmente

```bash
npm install     # instala as dependências (Express)
npm start       # inicia o servidor
```

Depois acesse <http://localhost:3000> no navegador.

## Estrutura

- `app.js` — servidor Express com as rotas (base: arquivo do professor, adaptado).
- `calculadora.js` — módulo com as operações matemáticas (reaproveitado).
- `package.json` — metadados e script `start`.
- `.gitignore` — ignora `node_modules/` e afins (template Node).

## Deploy

A aplicação lê a porta de `process.env.PORT`, então funciona direto em
serviços de nuvem como **Railway** e **Amazon AWS (EC2)** a partir deste
mesmo repositório.
