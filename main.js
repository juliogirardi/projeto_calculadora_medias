const form = document.getElementById("form-atividade");

const imgAprovado = '<img src="./images/aprovado.png" />';
const imgReprovado = '<img src="./images/reprovado.png" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

let linhas = "";

form.addEventListener("submit", function (e) {
  e.preventDefault();

  addLine();
  refreshTable();
  refreshMedia();
});

function addLine() {
  const inputNomeAtividade = document.getElementById("nome-atividade");
  const inputNotaAtividade = document.getElementById("nota-atividade");

  if (atividades.includes(inputNomeAtividade.value)) {
    alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
  } else {
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    let linha = "<tr>";
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${
      inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado
    }</td>`;
    linha += "</tr>";

    linhas += linha;
  }

  inputNomeAtividade.value = "";
  inputNotaAtividade.value = "";
}

function refreshTable() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linhas;
}

function refreshMedia() {
  const mediaFinal = calcMedia();

  document.getElementById("media-final-valor").innerHTML =
    mediaFinal.toFixed(2);
  document.getElementById("media-final-resultado").innerHTML =
    mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calcMedia() {
  let soma = 0;

  for (let i = 0; i < notas.length; i++) {
    soma = soma + notas[i];
  }

  return soma / notas.length;
}
