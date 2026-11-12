/* Professores em Ação — areas.js
   Cria o diálogo "Área específica" e o liga a todos os botões do menu
   que tenham o atributo data-destino="arquivo.html". */
(function () {
  var AREAS = ["Português", "Filosofia", "História", "Artes", "Matemática",
               "Música", "Biologia", "Química", "Geografia", "Física"];

  function lerAreas() {
    try { return JSON.parse(sessionStorage.getItem("areas") || "[]"); }
    catch (e) { return []; }
  }

  function salvarAreas(lista) {
    try { sessionStorage.setItem("areas", JSON.stringify(lista)); } catch (e) {}
  }

  // Monta o diálogo
  var dialogo = document.createElement("dialog");
  dialogo.className = "dialogo";
  dialogo.innerHTML =
    '<form method="dialog">' +
      '<h2 class="dialogo__titulo">Área específica</h2>' +
      '<p class="dialogo__ajuda">Escolha uma área para ver exemplos adaptados.</p>' +
      '<fieldset>' +
        AREAS.map(function (a) {
          return '<label class="opcao"><input type="radio" name="area" value="' + a + '" required> ' + a + '</label>';
        }).join("") +
      '</fieldset>' +
      '<div class="dialogo__acoes">' +
        '<button class="botao botao--secundario" value="cancelar" formnovalidate>Cancelar</button>' +
        '<button class="botao" value="continuar">Continuar</button>' +
      '</div>' +
    '</form>';
  document.body.appendChild(dialogo);

  var destino = null;

  // Cada botão do menu abre o diálogo e guarda a página de destino
  document.querySelectorAll("[data-destino]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      destino = botao.getAttribute("data-destino");
      var salvas = lerAreas();
      dialogo.querySelectorAll("input").forEach(function (i) {
        i.checked = i.value === salvas[0];
      });
      dialogo.showModal();
    });
  });

  // Ao continuar, salva as áreas e vai para a página escolhida
  dialogo.addEventListener("close", function () {
    if (dialogo.returnValue !== "continuar" || !destino) return;
    var marcadas = Array.prototype.map.call(
      dialogo.querySelectorAll("input:checked"),
      function (i) { return i.value; }
    );
    salvarAreas(marcadas);
    window.location.href = destino;
  });

  // Mostra as áreas escolhidas, se a página tiver <p id="areas-escolhidas">
  var p = document.getElementById("areas-escolhidas");
  var escolhidas = lerAreas();
  if (p && escolhidas.length) {
    p.textContent = "Exemplos adaptados para: " + escolhidas.join(", ") + ".";
    p.hidden = false;
  }
})();
