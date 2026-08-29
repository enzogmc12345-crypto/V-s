/**
 * Ponte minima com o CEP.
 *
 * Faz o mesmo que o CSInterface.js da Adobe para o que este painel
 * precisa: chamar ExtendScript e ler o resultado. Sem biblioteca externa,
 * uma dependencia a menos para manter.
 */
(function (global) {
  'use strict';

  function ponte() {
    if (!global.__adobe_cep__) {
      throw new Error(
        'Este painel precisa rodar dentro do Illustrator (Janela > Extensões > Carrossel Suite).'
      );
    }
    return global.__adobe_cep__;
  }

  /** Transforma um objeto JS em literal valido para o ExtendScript. */
  function literal(valor) {
    return JSON.stringify(valor === undefined ? null : valor)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029');
  }

  /** Executa codigo ExtendScript e devolve o texto cru. */
  function executar(codigo) {
    return new Promise(function (resolve, reject) {
      try {
        ponte().evalScript(codigo, function (resultado) {
          if (resultado === 'EvalScript error.') {
            reject(new Error('Erro no ExtendScript ao executar: ' + codigo.slice(0, 80)));
            return;
          }
          resolve(resultado);
        });
      } catch (erro) {
        reject(erro);
      }
    });
  }

  /**
   * Chama uma funcao do host e devolve dados ja desempacotados.
   * O host responde sempre {ok:boolean, dados|erro}.
   */
  async function chamar(funcao, parametros) {
    const bruto = await executar(funcao + '(' + literal(parametros) + ')');
    let resposta;
    try {
      resposta = JSON.parse(bruto);
    } catch (erro) {
      throw new Error(`Resposta inesperada de ${funcao}: ${String(bruto).slice(0, 200)}`);
    }
    if (!resposta.ok) throw new Error(resposta.erro);
    return resposta.dados;
  }

  /** Seletor de pasta do proprio CEP (nao depende de Node). */
  function escolherPasta(titulo) {
    const cep = global.cep;
    if (!cep || !cep.fs || !cep.fs.showOpenDialog) {
      throw new Error('Seletor de pasta indisponível nesta versão do Illustrator.');
    }
    const r = cep.fs.showOpenDialog(false, true, titulo || 'Escolha a pasta de destino', '');
    if (r.err !== 0 || !r.data || !r.data.length) return null;
    return r.data[0];
  }

  global.CEP = { executar, chamar, escolherPasta, literal };
})(window);
