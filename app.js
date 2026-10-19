const express = require('express');
const calculadora = require('./calculadora');

const app = express();
const PORT = process.env.PORT || 3000; // porta definida pela nuvem (Railway/AWS) ou 3000 local

function pagina(titulo, conteudo, rotaAtiva) {
  const item = (href, texto) =>
    `<a href="${href}" class="${rotaAtiva === href ? 'ativo' : ''}">${texto}</a>`;

  return `<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${titulo} · Projeto Node.js</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f5f5fb;
      --card: #ffffff;
      --ink: #1e1b2e;
      --muted: #6b6880;
      --accent: #000000;
      --accent-2: #d7d7d7;
      --border: #ebe9f5;
      --shadow: 0 10px 30px rgba(109, 94, 252, .08);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--ink); line-height: 1.65; min-height: 100vh; }
    header { background: linear-gradient(120deg, var(--accent), var(--accent-2)); color: #fff; padding: 28px 0 70px; }
    .wrap { max-width: 760px; margin: 0 auto; padding: 0 24px; }
    .brand { font-weight: 700; font-size: 1.05rem; letter-spacing: .3px; opacity: .95; }
    nav { margin-top: 20px; display: flex; gap: 8px; flex-wrap: wrap; }
    nav a { color: #fff; text-decoration: none; font-weight: 500; font-size: .95rem; padding: 8px 16px; border-radius: 999px; transition: background .2s; background: rgba(255,255,255,.12); }
    nav a:hover { background: rgba(255,255,255,.25); }
    nav a.ativo { background: #fff; color: var(--accent); }
    main { max-width: 760px; margin: -44px auto 48px; padding: 0 24px; }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 18px; padding: 32px; box-shadow: var(--shadow); }
    h1 { font-size: 1.9rem; line-height: 1.2; margin-bottom: 14px; }
    h2 { font-size: 1.2rem; margin: 24px 0 10px; }
    p { color: var(--muted); margin-bottom: 12px; }
    ul { margin: 8px 0 12px 20px; color: var(--muted); }
    li { margin-bottom: 6px; }
    form { display: grid; gap: 12px; margin-top: 18px; }
    .row { display: flex; gap: 10px; flex-wrap: wrap; }
    input, select, button { font: inherit; padding: 11px 14px; border-radius: 10px; border: 1px solid var(--border); background: #faf9ff; flex: 1; min-width: 90px; }
    button { background: var(--accent); color: #fff; border: none; font-weight: 600; cursor: pointer; transition: opacity .2s; min-width: 120px; }
    button:hover { opacity: .9; }
    .resultado { margin-top: 18px; padding: 18px; border-radius: 12px; background: #efecff; font-size: 1.1rem; font-weight: 600; color: var(--accent); }
    .erro { background: #ffecec; color: #d64545; }
    code { background: #efecff; color: var(--accent); padding: 2px 7px; border-radius: 6px; font-size: .9em; }
    footer { text-align: center; color: var(--muted); font-size: .85rem; padding: 0 24px 40px; }
    a.link { color: var(--accent); font-weight: 600; }
  </style>
</head>
<body>
  <header>
    <div class="wrap">
      <div class="brand">● Vanessa Sousa &amp; Matheus Albino</div>
      <nav>
        ${item('/', 'Início')}
        ${item('/calculadora', 'Calculadora')}
        ${item('/autores', 'Autores')}
      </nav>
    </div>
  </header>
  <main>
    <div class="card">
      ${conteudo}
    </div>
  </main>
  <footer>Aplicação Node.js + Express · deploy na AWS e no Railway</footer>
</body>
</html>`;
}

app.get('/', (req, res) => {
  const conteudo = `
    <h1>Aplicação Web em Node.js</h1>
    <p>Projeto baseado no modelo <strong>request/response</strong>: o navegador faz uma
    requisição a uma rota e o servidor responde com uma página HTML.</p>
    <h2>Como funciona</h2>
    <p>A aplicação usa Node.js com o framework Express. A rota <code>/calculadora</code>
    reaproveita o módulo <code>calculadora.js</code> do projeto para fazer contas de verdade.</p>
    <h2>Rotas</h2>
    <ul>
      <li><code>/</code> — esta página, com a descrição do projeto;</li>
      <li><code>/calculadora</code> — calculadora que usa o módulo <code>calculadora.js</code>;</li>
      <li><code>/autores</code> — quem desenvolveu o projeto.</li>
    </ul>`;
  res.send(pagina('Início', conteudo, '/'));
});

app.get('/calculadora', (req, res) => {
  const { a, b, op } = req.query;
  let resultado = '';

  if (a !== undefined && b !== undefined && op) {
    const x = Number(a);
    const y = Number(b);
    try {
      let valor;
      if (op === 'soma') valor = calculadora.soma(x, y);
      else if (op === 'subtracao') valor = calculadora.subtracao(x, y);
      else if (op === 'multiplicacao') valor = calculadora.multiplicacao(x, y);
      else if (op === 'divisao') valor = calculadora.divisao(x, y);
      else throw new Error('Operação inválida');
      resultado = `<div class="resultado">Resultado: ${x} e ${y} → <strong>${valor}</strong></div>`;
    } catch (e) {
      resultado = `<div class="resultado erro">${e.message}</div>`;
    }
  }

  const conteudo = `
    <h1>Calculadora</h1>
    <p>Preencha os campos e envie. O servidor processa a requisição usando o módulo
    <code>calculadora.js</code> e devolve o resultado.</p>
    <form method="GET" action="/calculadora">
      <div class="row">
        <input type="number" name="a" placeholder="Número A" value="${a ?? ''}" required>
        <input type="number" name="b" placeholder="Número B" value="${b ?? ''}" required>
      </div>
      <div class="row">
        <select name="op">
          <option value="soma">Soma (+)</option>
          <option value="subtracao">Subtração (-)</option>
          <option value="multiplicacao">Multiplicação (×)</option>
          <option value="divisao">Divisão (÷)</option>
        </select>
        <button type="submit">Calcular</button>
      </div>
    </form>
    ${resultado}`;
  res.send(pagina('Calculadora', conteudo, '/calculadora'));
});

app.get('/autores', (req, res) => {
  const conteudo = `
    <h1>Autores</h1>
    <p>Projeto desenvolvido por:</p>
    <ul>
      <li>Vanessa Sousa</li>
      <li>Matheus Albino</li>
    </ul>`;
  res.send(pagina('Autores', conteudo, '/autores'));
});

app.use((req, res) => { // qualquer outra rota: 404
  const conteudo = `
    <h1>Página não encontrada</h1>
    <p>O caminho que você tentou acessar não existe neste servidor.</p>
    <p><a class="link" href="/">Voltar para o início</a></p>`;
  res.status(404).send(pagina('404', conteudo, ''));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
