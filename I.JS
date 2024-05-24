function consultaCep() {
  const cep = document.querySelector("#cep").value;
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((resposta) => resposta.json())
    .then((json) => {
      preencherCampos(json);
      salvarCamposLocalStorage(json);
    })
    .catch((error) => console.log(error));
}
function preencherCampos(cepData) {
  document.querySelector("#id_logradouro").innerText = cepData.logradouro;
  document.querySelector("#id_complemento").innerText = cepData.complemento;
  document.querySelector("#id_bairro").innerText = cepData.bairro;
  document.querySelector("#id_localidade").innerText = cepData.localidade;
  document.querySelector("#id_uf").innerText = cepData.uf;
  document.querySelector("#id_ibge").innerText = cepData.ibge;
  document.querySelector("#id_gia").innerText = cepData.gia;
  document.querySelector("#id_ddd").innerText = cepData.ddd;
  document.querySelector("#id_siaf").innerText = cepData.siafi;
}
function salvarCamposLocalStorage(cepData) {
  localStorage.setItem("cepData", JSON.stringify(cepData));
}
window.addEventListener("load", function () {
  const cepData = JSON.parse(localStorage.getItem("cepData"));
  if (cepData) {
    preencherCampos(cepData);
    document.querySelector("#cep").value = cepData.cep;
  }
});
