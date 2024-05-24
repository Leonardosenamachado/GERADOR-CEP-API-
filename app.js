document.addEventListener("DOMContentLoaded", () => {
  const btnBuscaCep = document.querySelector(".btnBuscaCep");
  const btnSalvar = document.querySelector(".btnSalvar");
  const enderecosSalvos = document.querySelector("#enderecosSalvos");

  btnBuscaCep.addEventListener("click", consultaCep);
  btnSalvar.addEventListener("click", salvarEndereco);
  const campoCep = document.querySelector("#cep");
  campoCep.addEventListener("blur", consultaCep);

  carregarEnderecos();

  function consultaCep() {
    const cep = campoCep.value.trim();
    if (cep === "") {
      alert("Por favor, digite um CEP.");
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          alert("CEP não encontrado.");
          return;
        }
        preencherCamposEndereco(data);
      })
      .catch((error) => console.log("Erro:", error));
  }

  function preencherCamposEndereco(data) {
    document.querySelector("#bairro").value = data.bairro;
    document.querySelector("#complemento").value = data.complemento;
    document.querySelector("#ddd").value = data.ddd;
    document.querySelector("#cidade").value = data.localidade;
    document.querySelector("#rua").value = data.logradouro;
  }

  function salvarEndereco() {
    const endereco = {
      cep: campoCep.value,
      bairro: document.querySelector("#bairro").value,
      complemento: document.querySelector("#complemento").value,
      ddd: document.querySelector("#ddd").value,
      cidade: document.querySelector("#cidade").value,
      rua: document.querySelector("#rua").value,
    };

    if (endereco.cep.trim() === "") {
      alert("Por favor, insira um CEP antes de salvar.");
      return;
    }

    let enderecos = JSON.parse(localStorage.getItem("enderecos")) || [];
    enderecos.push(endereco);
    localStorage.setItem("enderecos", JSON.stringify(enderecos));
    carregarEnderecos();
  }

  function carregarEnderecos() {
    const enderecos = JSON.parse(localStorage.getItem("enderecos")) || [];
    enderecosSalvos.innerHTML = "";

    enderecos.forEach((endereco, index) => {
      const enderecoItem = document.createElement("div");
      enderecoItem.className = "endereco-item";
      enderecoItem.innerHTML = `
                <strong>CEP:</strong> ${endereco.cep}<br>
                <strong>Bairro:</strong> ${endereco.bairro}<br>
                <strong>Complemento:</strong> ${endereco.complemento}<br>
                <strong>DDD:</strong> ${endereco.ddd}<br>
                <strong>Cidade:</strong> ${endereco.cidade}<br>
                <strong>Rua:</strong> ${endereco.rua}<br>
                <button onclick="removerEndereco(${index})">Remover</button>
            `;
      enderecosSalvos.appendChild(enderecoItem);
    });
  }
});

function removerEndereco(index) {
  let enderecos = JSON.parse(localStorage.getItem("enderecos")) || [];
  enderecos.splice(index, 1);
  localStorage.setItem("enderecos", JSON.stringify(enderecos));
  document.querySelector("#enderecosSalvos").innerHTML = "";
  carregarEnderecos();
}
