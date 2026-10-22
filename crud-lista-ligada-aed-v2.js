//OBS: Por favor,cuidado a onde executa o código 
// por causa do "prompt".
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
  const entrada = window.prompt(mensagem);
  if (entrada === null) return null;
  const dado = entrada.trim();
  if (dado === "") {
    window.alert("O valor informado não pode ser vazio.");
    return null;
  }
  return dado;
}

function lerPosicao(mensagem) {
  const entrada = window.prompt(mensagem + "\nNota: As posições começam em 0.");
  if (entrada === null) return null;
  const num = Number(entrada.trim());
  
  if (!Number.isInteger(num) || num < 0) {
    window.alert("Posição inválida! Informe um número inteiro maior ou igual a 0.");
    return null;
  }
  return num;
}

function listarTodos(lista) {
  if (lista.inicio === null) {
    console.log("A lista está vazia.");
    return [];
  }

  let atual = lista.inicio;
  let posicao = 0;
  const resultado = [];

  while (atual !== null) {
    console.log(`[ ${posicao} ] ${atual.dado}`);
    resultado.push({ posicao: posicao, dado: atual.dado });
    atual = atual.proximo;
    posicao++;
  }

  return resultado;
}

function inserir(lista, dado) {
  const novo = criarNo(dado);

  if (lista.inicio === null) {
    lista.inicio = novo;
    return true;
  }

  let atual = lista.inicio;
  while (atual.proximo !== null) {
    atual = atual.proximo;
  }

  atual.proximo = novo;
  return true;
}

function inserirNaPosicao(lista, dado, posicao) {
  if (typeof posicao !== "number" || !Number.isInteger(posicao) || posicao < 0) {
    console.log("Erro: Posição deve ser um número inteiro não negativo.");
    return false;
  }

  if (posicao === 0) {
    const novo = criarNo(dado);
    novo.proximo = lista.inicio;
    lista.inicio = novo;
    return true;
  }

  let anterior = lista.inicio;

  for (let i = 0; i < posicao - 1 && anterior !== null; i++) {
    anterior = anterior.proximo;
  }

  if (anterior === null) {
    console.log(`Erro: A posição ${posicao} é maior que o tamanho da lista.`);
    return false;
  }

  const novo = criarNo(dado);
  novo.proximo = anterior.proximo;
  anterior.proximo = novo;

  return true;
}

function menu(lista) {
  while (true) {
    const opcao = window.prompt(
      "=== LISTA LIGADA SIMPLES ===\n\n" +
      "[ 1 ] Listar todos os elementos\n" +
      "[ 2 ] Inserir elemento no fim\n" +
      "[ 3 ] Inserir elemento em uma posição\n" +
      "[ 4 ] Sair\n\n" +
      "Escolha uma opção (1-4):"
    );

    if (opcao === null || opcao.trim() === "4") {
      window.alert("Programa finalizado.");
      return;
    }

    switch (opcao.trim()) {
      case "1": {
        if (lista.inicio === null) {
          window.alert("A lista está vazia.");
        } else {
          let atual = lista.inicio;
          let pos = 0;
          let texto = "CONTEÚDO DA LISTA:\n------------------\n";
          while (atual !== null) {
            texto += `[ ${pos} ] ${atual.dado}\n`;
            atual = atual.proximo;
            pos++;
          }
          window.alert(texto);
          console.table(listarTodos(lista));
        }
        break;
      }

      case "2": {
        const valor = lerDado("Digite o valor para inserir no final da lista:");
        if (valor !== null) {
          inserir(lista, valor);
          window.alert(`Sucesso! "${valor}" foi adicionado ao final da lista.`);
        }
        break;
      }

      case "3": {
        const valor = lerDado("Digite o valor a ser inserido:");
        if (valor !== null) {
          const pos = lerPosicao("Em qual posição deseja inserir esse elemento?");
          if (pos !== null) {
            const inseriu = inserirNaPosicao(lista, valor, pos);
            if (inseriu) {
              window.alert(`Sucesso! "${valor}" foi inserido na posição ${pos}.`);
            } else {
              window.alert(`Falha ao inserir! A posição ${pos} é inválida para esta lista.`);
            }
          }
        }
        break;
      }

      default:
        window.alert("Opção inválida!");
    }
  }
}

const minhaLista = criarLista();
menu(minhaLista);

/**
 Questão 6 (Condição de término):
A condição atual === null indica que todos os nós foram visitados. 
Para parar no último nó, usa-se atual.proximo === null.

Questão 7 (Incrementar a posição): O incremento (posicao++) é 
necessário para identificar numericamente a posição de cada 
elemento na exibição, já que a lista ligada não possui índices
fixos na memória .

Questão 8 (Array do listarTodos): 
Não, o array retornado serve apenas como estrutura temporária para
formatar a exibição no console.

Questão 9 (Complexidade): A complexidade da listagem é $\mathcal{O}(n)$, 
pois é preciso percorrer todos os $n$ nós.
 * 
 */