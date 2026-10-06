// LISTA DE DESEJOS
let lista = JSON.parse(localStorage.getItem("listaDesejos")) || [];
const area = document.getElementById("lista-livros");

// Na lista.html, monta um cartao para cada livro salvo
if (area) {
  lista.forEach(function (livro) {
    area.innerHTML += `
      <article class="cartao-livro">
        <div class="capa"><img src="${livro.imagem}" class="imagem-livro"></div>
        <p class="categoria-livro">${livro.categoria}</p>
        <h2 class="titulo-livro">${livro.nome}</h2>
        <p class="autor">${livro.autor}</p>
        <div class="rodape-cartao">
          <span class="preco">${livro.preco}</span>
          <div class="acoes">
            <button class="favorito">♡</button>
            <button class="botao-adicionar"> Adicionar</button>
          </div>
        </div>
      </article>`;
  });
}

// clique adiciona / clique remove
document.querySelectorAll(".favorito").forEach(function (botao) {
  const cartao = botao.closest(".cartao-livro, .detalhe");
  const livro = {
    nome: cartao.querySelector(".titulo-livro, h1").textContent,
    autor: cartao.querySelector(".autor").textContent,
    categoria: cartao.querySelector(".categoria-livro").textContent,
    preco: cartao.querySelector(".preco").textContent,
    imagem: cartao.querySelector("img").getAttribute("src")
  };

  function pintar() {
    const salvo = lista.some(function (item) { return item.nome === livro.nome; });
    botao.textContent = salvo ? "♥" : "♡";
    botao.classList.toggle("curtido", salvo);
  }
  pintar();

  botao.addEventListener("click", function () {
    if (botao.textContent === "♥") {
      lista = lista.filter(function (item) { return item.nome !== livro.nome; });
      if (area) cartao.remove();
    } else {
      lista.push(livro);
    }
    localStorage.setItem("listaDesejos", JSON.stringify(lista));
    pintar();
    mostrarVazia();
  });
});

// Mensagem de lista vazia
function mostrarVazia() {
  if (area && lista.length === 0) {
    document.getElementById("lista-vazia").style.display = "block";
  }
}
mostrarVazia();
