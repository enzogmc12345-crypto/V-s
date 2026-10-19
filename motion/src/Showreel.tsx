import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CORES, FONTE } from "./paleta";

/* ============================================================
   SHOWREEL VÓS — 12s, 30fps, 1280x720
   Toda animação é dirigida por useCurrentFrame + interpolate:
   nada de CSS transition/animation, que não renderiza.
   ============================================================ */

/* Grade de fundo, desenhada linha a linha. */
const Grade: React.FC<{ readonly atraso?: number }> = ({ atraso = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      {Array.from({ length: 13 }).map((_, i) => (
        <div
          key={`v${i}`}
          style={{
            position: "absolute",
            left: i * 100 + 40,
            top: 0,
            width: 1,
            height: "100%",
            backgroundColor: CORES.azul,
            opacity: interpolate(frame, [atraso + i * 1.4, atraso + i * 1.4 + 0.6 * fps], [0, 0.1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`h${i}`}
          style={{
            position: "absolute",
            top: i * 100 + 20,
            left: 0,
            height: 1,
            width: "100%",
            backgroundColor: CORES.azul,
            opacity: interpolate(frame, [atraso + i * 1.4, atraso + i * 1.4 + 0.6 * fps], [0, 0.07], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/* Rótulo pequeno em caixa alta, com entrada por clipe. */
const Rotulo: React.FC<{ readonly children: React.ReactNode; readonly atraso?: number; readonly cor?: string }> = ({
  children,
  atraso = 0,
  cor = CORES.azul,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ overflow: "hidden", height: 26 }}>
      <div
        style={{
          fontFamily: FONTE,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: cor,
          translate: interpolate(frame, [atraso, atraso + 0.6 * fps], ["0px 30px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* Palavra grande que sobe de dentro de uma máscara. */
const Palavra: React.FC<{
  readonly children: React.ReactNode;
  readonly atraso?: number;
  readonly tamanho?: number;
  readonly cor?: string;
}> = ({ children, atraso = 0, tamanho = 112, cor = CORES.tinta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ overflow: "hidden", height: tamanho * 1.08 }}>
      <div
        style={{
          fontFamily: FONTE,
          fontSize: tamanho,
          lineHeight: 1.05,
          fontWeight: 700,
          letterSpacing: -tamanho * 0.035,
          color: cor,
          whiteSpace: "nowrap",
          translate: interpolate(frame, [atraso, atraso + 0.8 * fps], [`0px ${tamanho * 1.1}px`, "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* ---------- Cena 1 · a marca ---------- */
const CenaMarca: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: CORES.fundo,
        alignItems: "center",
        justifyContent: "center",
        opacity: interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
          extrapolateLeft: "clamp",
        }),
      }}
    >
      <Grade />
      <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontFamily: FONTE,
            fontSize: 190,
            fontWeight: 700,
            letterSpacing: -10,
            color: CORES.tinta,
            lineHeight: 1,
            scale: interpolate(entrada, [0, 1], [0.84, 1], { output: "perceptual-scale" }),
            opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          Vós
        </div>
        <div
          style={{
            height: 5,
            borderRadius: 3,
            backgroundColor: CORES.azul,
            width: interpolate(frame, [0.5 * fps, 1.5 * fps], [0, 300], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        />
        <Rotulo atraso={1 * fps}>Estúdio criativo · desde 2024</Rotulo>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Cena 2 · motion graphics ---------- */
const CenaMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: CORES.fundo,
        padding: 90,
        justifyContent: "center",
        opacity: interpolate(
          frame,
          [0, 8, durationInFrames - 10, durationInFrames],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    >
      <Grade />
      <Rotulo>01 · o que fazemos</Rotulo>
      <div style={{ height: 22 }} />
      <Palavra atraso={0.2 * fps}>Motion</Palavra>
      <Palavra atraso={0.35 * fps} cor={CORES.azul}>
        graphics
      </Palavra>

      {/* equalizador: barras que respiram em senoide */}
      <div style={{ position: "absolute", right: 110, top: 190, display: "flex", gap: 16, alignItems: "flex-end" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: 26,
              borderRadius: 13,
              backgroundColor: i === 2 ? CORES.azul : CORES.azulClaro,
              height:
                90 +
                Math.sin((frame / fps) * 4 + i * 0.9) * 55 +
                interpolate(frame, [0, 0.8 * fps], [-90, 0], { extrapolateRight: "clamp" }),
            }}
          />
        ))}
      </div>

      {/* play girando devagar */}
      <div
        style={{
          position: "absolute",
          right: 150,
          bottom: 120,
          width: 108,
          height: 108,
          borderRadius: 54,
          backgroundColor: CORES.azul,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          scale: interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            output: "perceptual-scale",
          }),
          rotate: `${interpolate(frame, [0, durationInFrames], [-14, 8])}deg`,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            marginLeft: 8,
            borderTop: "18px solid transparent",
            borderBottom: "18px solid transparent",
            borderLeft: `30px solid ${CORES.branco}`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Cena 3 · sites e apps ---------- */
const CenaSites: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const barra = (atraso: number, largura: number, cor: string) => (
    <div
      style={{
        height: 14,
        borderRadius: 7,
        backgroundColor: cor,
        width: interpolate(frame, [atraso, atraso + 0.5 * fps], [0, largura], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    />
  );
  return (
    <AbsoluteFill
      style={{
        backgroundColor: CORES.fundo,
        padding: 90,
        justifyContent: "center",
        opacity: interpolate(
          frame,
          [0, 8, durationInFrames - 10, durationInFrames],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    >
      <Grade />
      <Rotulo>02 · o que fazemos</Rotulo>
      <div style={{ height: 22 }} />
      <Palavra atraso={0.2 * fps}>Sites</Palavra>
      <Palavra atraso={0.35 * fps} cor={CORES.azul}>
        e aplicativos
      </Palavra>

      {/* janela de navegador montando sozinha */}
      <div
        style={{
          position: "absolute",
          right: 96,
          top: 128,
          width: 430,
          borderRadius: 18,
          backgroundColor: CORES.branco,
          boxShadow: "0 30px 60px rgba(10,26,51,0.12)",
          overflow: "hidden",
          translate: interpolate(frame, [0.1 * fps, 0.9 * fps], ["80px 0px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div style={{ display: "flex", gap: 7, padding: 14, backgroundColor: CORES.nuvem }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: CORES.azulClaro }} />
          ))}
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          {barra(0.6 * fps, 240, CORES.tinta)}
          {barra(0.75 * fps, 320, CORES.nuvem)}
          {barra(0.9 * fps, 180, CORES.nuvem)}
          <div style={{ height: 10 }} />
          <div style={{ display: "flex", gap: 12 }}>
            {barra(1.1 * fps, 120, CORES.azul)}
            {barra(1.25 * fps, 90, CORES.nuvem)}
          </div>
        </div>
      </div>

      {/* celular que entra por cima da janela */}
      <div
        style={{
          position: "absolute",
          right: 70,
          bottom: 58,
          width: 128,
          height: 230,
          borderRadius: 22,
          backgroundColor: CORES.tinta,
          border: `6px solid ${CORES.tinta}`,
          boxShadow: "0 24px 44px rgba(10,26,51,0.22)",
          overflow: "hidden",
          translate: interpolate(frame, [0.9 * fps, 1.7 * fps], ["0px 120px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div style={{ backgroundColor: CORES.branco, height: "100%", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ height: 54, borderRadius: 10, backgroundColor: CORES.azul }} />
          {barra(1.5 * fps, 80, CORES.nuvem)}
          {barra(1.6 * fps, 60, CORES.nuvem)}
          {barra(1.7 * fps, 70, CORES.nuvem)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Cena 4 · social media ---------- */
const CenaSocial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const cartao = (i: number, cor: string) => (
    <div
      key={i}
      style={{
        position: "absolute",
        right: 96 + i * 18,
        top: 150 + i * 10,
        width: 190,
        height: 240,
        borderRadius: 18,
        backgroundColor: cor,
        boxShadow: "0 24px 50px rgba(10,26,51,0.16)",
        rotate: `${interpolate(frame, [0.2 * fps + i * 4, 1.1 * fps + i * 4], [0, (i - 1) * 9], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}deg`,
        translate: interpolate(frame, [0.2 * fps + i * 4, 1.1 * fps + i * 4], ["0px 90px", `${-i * 58}px 0px`], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    />
  );
  return (
    <AbsoluteFill
      style={{
        backgroundColor: CORES.fundo,
        padding: 90,
        justifyContent: "center",
        opacity: interpolate(
          frame,
          [0, 8, durationInFrames - 10, durationInFrames],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    >
      <Grade />
      <Rotulo>03 · o que fazemos</Rotulo>
      <div style={{ height: 22 }} />
      <Palavra atraso={0.2 * fps}>Social</Palavra>
      <Palavra atraso={0.35 * fps} cor={CORES.azul}>
        media
      </Palavra>

      {[CORES.nuvem, CORES.azulClaro, CORES.azul].map((cor, i) => cartao(i, cor))}

      {/* contador subindo */}
      <div
        style={{
          position: "absolute",
          left: 90,
          bottom: 92,
          fontFamily: FONTE,
          fontSize: 22,
          fontWeight: 600,
          color: CORES.tinta,
          opacity: interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        +{Math.round(interpolate(frame, [1 * fps, 2.2 * fps], [0, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))} projetos
        entregues
      </div>
    </AbsoluteFill>
  );
};

/* ---------- Cena 5 · fecho ---------- */
const CenaFecho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: CORES.fundo }}>
      <Grade />
      {/* o azul inunda a tela de baixo para cima */}
      <AbsoluteFill
        style={{
          backgroundColor: CORES.azul,
          translate: interpolate(frame, [0, 0.8 * fps], ["0px 720px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div
          style={{
            fontFamily: FONTE,
            fontSize: 150,
            fontWeight: 700,
            letterSpacing: -8,
            color: CORES.branco,
            lineHeight: 1,
            opacity: interpolate(frame, [0.7 * fps, 1.2 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [0.7 * fps, 1.4 * fps], ["0px 24px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Vós
        </div>
        <div
          style={{
            fontFamily: FONTE,
            fontSize: 26,
            fontWeight: 500,
            letterSpacing: 2,
            color: CORES.branco,
            opacity: interpolate(frame, [1.1 * fps, 1.6 * fps], [0, 0.9], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          sua marca em movimento
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ---------- montagem ---------- */
export const Showreel: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: CORES.fundo }}>
      <Sequence durationInFrames={2.6 * fps} name="Marca">
        <CenaMarca />
      </Sequence>
      <Sequence from={2.6 * fps} durationInFrames={2.6 * fps} name="Motion graphics">
        <CenaMotion />
      </Sequence>
      <Sequence from={5.2 * fps} durationInFrames={2.6 * fps} name="Sites e apps">
        <CenaSites />
      </Sequence>
      <Sequence from={7.8 * fps} durationInFrames={2.6 * fps} name="Social media">
        <CenaSocial />
      </Sequence>
      <Sequence from={10.4 * fps} durationInFrames={1.6 * fps} name="Fecho">
        <CenaFecho />
      </Sequence>
    </AbsoluteFill>
  );
};
