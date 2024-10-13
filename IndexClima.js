const container = document.getElementById("container");
const pesquisa = document.getElementById("pesquisar");
const clima = document.getElementById("Clima");
const detalhes = document.getElementById("detalhes");
const erro = document.getElementById("NaoEncontrado");
const API = "da06047f4a79386f5ce925290cd0acc0";

pesquisa.addEventListener("click", () => {
  const Cidade = document.getElementById("input").value.trim();

  // Verifica se o campo de entrada está vazio
  if (Cidade === "") {
    alert("Por favor, insira o nome de uma cidade ou país.");
    return;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${Cidade}&units=metric&appid=${API}`
  )
    .then((response) => response.json()) // Converte a resposta em JSON
    .then((json) => {
      // Verifica se a cidade foi encontrada
      if (json.cod === "404") {
        mostrarErro(); //chamada da função de mostrar o erro que está mais abaixo
        return;
      }
      // Oculta a mensagem de erro caso a cidade seja encontrada
      erro.style.display = "none";
      erro.classList.remove("fadeIn");

      const imagem = document.getElementById("imagem");
      const temperatura = document.getElementById("temperatura");
      const descricao = document.getElementById("descricao");
      const umidade = document.getElementById("pumidade");
      const vento = document.getElementById("pvento");

      // Define a imagem correspondente ao tipo de clima,
      // ainda não são todos mas vou adicionando conforme o tempo
      switch (json.weather[0].main) {
        case "Clear":
          imagem.src = "imagens/limpo.png";
          break;
        case "Clouds":
          imagem.src = "imagens/nublado.png";
          break;
        case "Rain":
          imagem.src = "imagens/chovendo.png";
          break;
        case "Snow":
          imagem.src = "imagens/nevando.png";
          break;
        case "Mist":
          imagem.src = "imagens/mist.png";
          break;
        default:
          imagem.src = "imagens/default.png";
      }
      temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      descricao.innerHTML = `${json.weather[0].description}`;
      umidade.innerHTML = `${json.main.humidity}%<br>Umidade`;
      vento.innerHTML = `${parseInt(json.wind.speed)}km/h <br>Vento`;
      mostrarClima(); //Chamada da função de mostrar o clima
    })
    // Tratamento dos erros que podem ocorrer durante a requisição
    .catch((error) => {
      console.error("Erro ao buscar dados: ", error);
      alert("Houve um problema ao acessar a API. Tente novamente mais tarde.");
    });
});

// Função para mostrar os dados climáticos
function mostrarClima() {
  clima.style.display = "";
  detalhes.style.display = "";
  clima.classList.add("fadeIn");
  detalhes.classList.add("fadeIn");
  container.style.height = "590px";
}

// Função para mostrar a mensagem de erro
function mostrarErro() {
  container.style.height = "400px";
  clima.style.display = "none";
  detalhes.style.display = "none";
  erro.style.display = "block";
  erro.classList.add("fadeIn");
}