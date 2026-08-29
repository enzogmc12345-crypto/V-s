#!/usr/bin/env python3
"""
Servico local de remocao de fundo.

Roda na maquina do designer, escuta so em 127.0.0.1 e nunca envia imagem
para a internet. Existe porque o Illustrator, ao contrario do Photoshop,
nao expoe nenhuma remocao de fundo para plugin: o painel CEP conversa com
este servico e religa a imagem recortada no documento.

    python3 servidor.py [--porta 8765]

Endpoints
    GET  /saude           -> {"ok": true, "modelos": [...]}
    POST /remover-fundo   -> {"caminho": "...", "modelo": "...",
                              "alpha_matting": false}
                          <- {"saida": "/caminho/arquivo_sem-fundo.png"}

Seguranca: o servico le e escreve arquivos de imagem sob pedido. Ele so
aceita conexao de 127.0.0.1, confere o cabecalho Host (barra ataque de
DNS rebinding), aceita apenas extensoes de imagem e so escreve ao lado do
arquivo de origem. Nao exponha esta porta na rede.
"""

import argparse
import json
import os
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

EXTENSOES = {".png", ".jpg", ".jpeg", ".tif", ".tiff", ".webp", ".bmp"}
HOSTS_ACEITOS = {"127.0.0.1", "localhost", "[::1]"}
SUFIXO = "_sem-fundo"

MODELOS = [
    "birefnet-general",   # melhor borda e cabelo, mais pesado
    "isnet-general-use",  # equilibrio entre qualidade e velocidade
    "u2net_human_seg",    # recortes de pessoa
    "u2net",              # generico classico
]

_sessoes = {}
_trava = threading.Lock()


def sessao(nome):
    """Carrega o modelo uma vez e reaproveita: a primeira chamada baixa os pesos."""
    from rembg import new_session

    with _trava:
        if nome not in _sessoes:
            _sessoes[nome] = new_session(nome)
        return _sessoes[nome]


def remover_fundo(caminho, modelo="isnet-general-use", alpha_matting=False):
    from rembg import remove

    origem = os.path.abspath(os.path.expanduser(caminho))
    if not os.path.isfile(origem):
        raise ValueError(f"Arquivo nao encontrado: {origem}")
    if os.path.splitext(origem)[1].lower() not in EXTENSOES:
        raise ValueError("Extensao nao suportada. Use PNG, JPG, TIFF, WEBP ou BMP.")
    if modelo not in MODELOS:
        raise ValueError(f"Modelo desconhecido: {modelo}")

    with open(origem, "rb") as arquivo:
        entrada = arquivo.read()

    saida = remove(
        entrada,
        session=sessao(modelo),
        alpha_matting=alpha_matting,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=15,
        alpha_matting_erode_size=8,
        post_process_mask=True,
    )

    base, _ = os.path.splitext(origem)
    destino = f"{base}{SUFIXO}.png"
    with open(destino, "wb") as arquivo:
        arquivo.write(saida)
    return destino


class Handler(BaseHTTPRequestHandler):
    server_version = "CarrosselBgRemove/0.1"

    def _host_confere(self):
        host = (self.headers.get("Host") or "").split(":")[0]
        return host in HOSTS_ACEITOS

    def _responder(self, codigo, corpo):
        dados = json.dumps(corpo, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(dados)))
        # O painel do Illustrator roda de file://, entao a origem chega como "null".
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()
        self.wfile.write(dados)

    def do_OPTIONS(self):
        self._responder(204, {})

    def do_GET(self):
        if not self._host_confere():
            self._responder(403, {"erro": "Host nao permitido."})
            return
        if self.path.rstrip("/") == "/saude":
            self._responder(200, {"ok": True, "modelos": MODELOS, "versao": "0.1.0"})
            return
        self._responder(404, {"erro": "Rota desconhecida."})

    def do_POST(self):
        if not self._host_confere():
            self._responder(403, {"erro": "Host nao permitido."})
            return
        if self.path.rstrip("/") != "/remover-fundo":
            self._responder(404, {"erro": "Rota desconhecida."})
            return

        try:
            tamanho = int(self.headers.get("Content-Length") or 0)
            if tamanho <= 0 or tamanho > 4 * 1024 * 1024:
                raise ValueError("Corpo da requisicao vazio ou grande demais.")
            pedido = json.loads(self.rfile.read(tamanho).decode("utf-8"))
            destino = remover_fundo(
                pedido["caminho"],
                pedido.get("modelo", "isnet-general-use"),
                bool(pedido.get("alpha_matting", False)),
            )
            self._responder(200, {"ok": True, "saida": destino})
        except KeyError:
            self._responder(400, {"erro": 'O pedido precisa do campo "caminho".'})
        except ValueError as erro:
            self._responder(400, {"erro": str(erro)})
        except ImportError:
            self._responder(
                500,
                {"erro": "rembg nao instalado. Rode: pip install -r requirements.txt"},
            )
        except Exception as erro:  # noqa: BLE001 - o painel mostra a mensagem crua
            self._responder(500, {"erro": f"{type(erro).__name__}: {erro}"})

    def log_message(self, formato, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), formato % args))


def main():
    parser = argparse.ArgumentParser(description="Servico local de remocao de fundo.")
    parser.add_argument("--porta", type=int, default=8765)
    parser.add_argument(
        "--pre-carregar",
        metavar="MODELO",
        help="Baixa e carrega o modelo antes de aceitar pedidos (evita espera no primeiro uso).",
    )
    args = parser.parse_args()

    if args.pre_carregar:
        print(f"Carregando {args.pre_carregar}…", flush=True)
        sessao(args.pre_carregar)

    servidor = ThreadingHTTPServer(("127.0.0.1", args.porta), Handler)
    print(f"Serviço de remoção de fundo em http://127.0.0.1:{args.porta}", flush=True)
    print("Ctrl+C para parar.", flush=True)
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        print("\nEncerrando.")
        servidor.shutdown()


if __name__ == "__main__":
    main()
