function criarNo(dado) {
  return {
    dado: dado,
    proximo: null
  };
}

function criarLista() {
  return {
    inicio: null
  };
}

function lerDado(mensagem) {
  var entrada = window.prompt(mensagem);
  if (entrada === null) return null;
  var dado = entrada.trim();
  if (dado === "") {
    window.alert("O valor nao pode ficar vazio.");
    return null;
  }
  return dado;
}

function lerPosicao(mensagem) {
  var entrada = window.prompt(mensagem + "\nAs posicoes comecam em 0.");
  if (entrada === null) return null;
  var pos = Number(entrada.trim());
  if (!Number.isInteger(pos) || pos < 0) {
    window.alert("Informe uma posicao inteira nao negativa.");
    return null;
  }
  return pos;
}

function listarTodos(lista) {
  if (lista.inicio === null) {
    console.log("A lista esta vazia.");
    return [];
  }
  var atual = lista.inicio;
  var pos = 0;
  var res = [];
  while (atual !== null) {
    console.log("[" + pos + "] " + atual.dado);
    res.push({ posicao: pos, dado: atual.dado });
    atual = atual.proximo;
    pos++;
  }
  return res;
}

function inserir(lista, dado) {
  var novo = criarNo(dado);
  if (lista.inicio === null) {
    lista.inicio = novo;
    return true;
  }
  var atual = lista.inicio;
  while (atual.proximo !== null) {
    atual = atual.proximo;
  }
  atual.proximo = novo;
  return true;
}

function obterNo(lista, posicao) {
  if (typeof posicao !== "number" || !Number.isInteger(posicao) || posicao < 0) {
    return null;
  }
  var atual = lista.inicio;
  var cont = 0;
  while (atual !== null) {
    if (cont === posicao) {
      return atual;
    }
    atual = atual.proximo;
    cont++;
  }
  return null;
}

function inserirNaPosicao(lista, dado, posicao) {
  if (typeof posicao !== "number" || !Number.isInteger(posicao) || posicao < 0) {
    return false;
  }
  if (posicao === 0) {
    var novo = criarNo(dado);
    novo.proximo = lista.inicio;
    lista.inicio = novo;
    return true;
  }
  var anterior = obterNo(lista, posicao - 1);
  if (anterior === null) {
    return false;
  }
  var novo = criarNo(dado);
  novo.proximo = anterior.proximo;
  anterior.proximo = novo;
  return true;
}

function excluirPosicao(lista, posicao) {
  if (typeof posicao !== "number" || !Number.isInteger(posicao) || posicao < 0) {
    return false;
  }
  if (lista.inicio === null) {
    return false;
  }
  if (posicao === 0) {
    lista.inicio = lista.inicio.proximo;
    return true;
  }
  var anterior = obterNo(lista, posicao - 1);
  if (anterior === null || anterior.proximo === null) {
    return false;
  }
  anterior.proximo = anterior.proximo.proximo;
  return true;
}

function atualizarPosicao(lista, posicao, novoDado) {
  if (novoDado === null || typeof novoDado !== "string" || novoDado.trim() === "") {
    return false;
  }
  var no = obterNo(lista, posicao);
  if (no === null) {
    return false;
  }
  no.dado = novoDado.trim();
  return true;
}

function buscar(lista, dado) {
  if (dado === null || typeof dado !== "string") {
    return -1;
  }
  var atual = lista.inicio;
  var pos = 0;
  while (atual !== null) {
    if (atual.dado === dado) {
      return pos;
    }
    atual = atual.proximo;
    pos++;
  }
  return -1;
}

function menu(lista) {
  while (true) {
    var opcao = window.prompt(
      "LISTA LIGADA SIMPLES - PARTE 2\n\n" +
      "[1] Listar todos\n" +
      "[2] Inserir no fim\n" +
      "[3] Inserir na posicao\n" +
      "[4] Excluir posicao\n" +
      "[5] Atualizar posicao\n" +
      "[6] Buscar valor\n" +
      "[7] Sair\n\n" +
      "Escolha uma opcao (1-7):"
    );

    if (opcao === null || opcao.trim() === "7") {
      window.alert("Programa finalizado.");
      return;
    }

    switch (opcao.trim()) {
      case "1":
        if (lista.inicio === null) {
          window.alert("A lista esta vazia.");
        } else {
          var atual = lista.inicio;
          var pos = 0;
          var texto = "CONTEUDO DA LISTA:\n";
          while (atual !== null) {
            texto += "[" + pos + "] " + atual.dado + "\n";
            atual = atual.proximo;
            pos++;
          }
          window.alert(texto);
          console.table(listarTodos(lista));
        }
        break;

      case "2":
        var valor = lerDado("Digite o valor para inserir no final:");
        if (valor !== null) {
          inserir(lista, valor);
          window.alert("Valor '" + valor + "' inserido no final!");
        }
        break;

      case "3":
        var valor = lerDado("Digite o valor a ser inserido:");
        if (valor !== null) {
          var pos = lerPosicao("Em qual posicao deseja inserir?");
          if (pos !== null) {
            var ok = inserirNaPosicao(lista, valor, pos);
            if (ok) {
              window.alert("Valor '" + valor + "' inserido na posicao " + pos + "!");
            } else {
              window.alert("Posicao " + pos + " invalida.");
            }
          }
        }
        break;

      case "4":
        var pos = lerPosicao("Digite a posicao a ser excluida:");
        if (pos !== null) {
          var ok = excluirPosicao(lista, pos);
          if (ok) {
            window.alert("Elemento da posicao " + pos + " excluido com sucesso!");
          } else {
            window.alert("Posicao " + pos + " invalida para exclusao.");
          }
        }
        break;

      case "5":
        var pos = lerPosicao("Digite a posicao que deseja atualizar:");
        if (pos !== null) {
          var novoValor = lerDado("Digite o novo valor:");
          if (novoValor !== null) {
            var ok = atualizarPosicao(lista, pos, novoValor);
            if (ok) {
              window.alert("Posicao " + pos + " atualizada para '" + novoValor + "'!");
            } else {
              window.alert("Falha ao atualizar posicao " + pos + ".");
            }
          }
        }
        break;

      case "6":
        var buscaValor = lerDado("Digite o valor a ser buscado:");
        if (buscaValor !== null) {
          var posicaoEncontrada = buscar(lista, buscaValor);
          if (posicaoEncontrada !== -1) {
            window.alert("Valor '" + buscaValor + "' encontrado na posicao " + posicaoEncontrada + ".");
          } else {
            window.alert("Valor '" + buscaValor + "' nao encontrado na lista.");
          }
        }
        break;

      default:
        window.alert("Opcao invalida! Escolha entre 1 e 7.");
    }
  }
}
const minhaLista = criarLista();
menu(minhaLista);
