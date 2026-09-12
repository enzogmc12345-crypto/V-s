# Frames do avatar

É aqui que entram os frames do vídeo do personagem virando a cabeça
(da esquerda para a direita, num movimento só).

Não copie os frames originais para cá — eles são pesados demais.
Rode o script, que ele cuida de redimensionar, comprimir e renomear:

```bash
bash portfolio/ferramentas/preparar-frames.sh "/caminho/da/pasta/com/os/frames"
```

O resultado fica assim:

```
frame_0001.webp
frame_0002.webp
frame_0003.webp
...
```

No fim o script imprime a `extensao` e a `quantidade` para você conferir
em `js/data.js`, dentro de `avatarFrames`.

Enquanto esta pasta estiver vazia, o site usa a imagem parada
`assets/hero/avatar.png` com uma inclinação 3D que segue o mouse.
