import clsx from "clsx";

/* ------------------------------------------------------------------
   Isometric line art — boxes drawn from (x, y, z, w, d, h)
------------------------------------------------------------------- */
type Box = { x: number; y: number; z: number; w: number; d: number; h: number; accent?: boolean; ghost?: boolean };

const S = 14; // unit size in px
const C = 0.866;

function iso(x: number, y: number, z: number, ox: number, oy: number) {
  return [ox + (x - y) * C * S, oy + (x + y) * 0.5 * S - z * S] as const;
}

function poly(pts: (readonly [number, number])[]) {
  return pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
}

function IsoBox({ b, ox, oy }: { b: Box; ox: number; oy: number }) {
  const { x, y, z, w, d, h } = b;
  const P = (a: number, c: number, e: number) => iso(a, c, e, ox, oy);
  const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const left = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const right = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)];
  const stroke = b.accent ? "var(--blue)" : "currentColor";
  const common = {
    stroke,
    strokeWidth: 1.25,
    strokeLinejoin: "round" as const,
    strokeDasharray: b.ghost ? "3 4" : undefined,
  };
  const fill = b.ghost ? "none" : "var(--art-fill, #fff)";
  return (
    <g>
      <polygon points={poly(left)} fill={fill} {...common} />
      <polygon points={poly(right)} fill={b.accent ? "var(--blue)" : fill} fillOpacity={b.accent ? 0.12 : 1} {...common} />
      <polygon points={poly(top)} fill={b.accent ? "var(--blue)" : fill} fillOpacity={b.accent ? 0.9 : 1} {...common} />
    </g>
  );
}

const SCENES: Record<string, Box[]> = {
  // a solid module embedded inside a wireframe "business"
  embed: [
    { x: 0, y: 0, z: 0, w: 6, d: 6, h: 5, ghost: true },
    { x: 1.5, y: 1.5, z: 0, w: 3, d: 3, h: 2.5, accent: true },
  ],
  // three slabs: hardware / models / software you own
  own: [
    { x: 0, y: 0, z: 0, w: 6, d: 5, h: 0.9 },
    { x: 0, y: 0, z: 1.6, w: 6, d: 5, h: 0.9 },
    { x: 0, y: 0, z: 3.2, w: 6, d: 5, h: 0.9, accent: true },
  ],
  // a monitored cluster of varying heights
  operate: [
    { x: 0, y: 0, z: 0, w: 1.6, d: 1.6, h: 4.5 },
    { x: 2.2, y: 0, z: 0, w: 1.6, d: 1.6, h: 3 },
    { x: 4.4, y: 0, z: 0, w: 1.6, d: 1.6, h: 5.5, accent: true },
    { x: 0, y: 2.2, z: 0, w: 1.6, d: 1.6, h: 2 },
    { x: 2.2, y: 2.2, z: 0, w: 1.6, d: 1.6, h: 3.8 },
    { x: 4.4, y: 2.2, z: 0, w: 1.6, d: 1.6, h: 1.4 },
  ],
};

export function IsoArt({ scene, className }: { scene: keyof typeof SCENES | string; className?: string }) {
  const boxes = [...(SCENES[scene] ?? SCENES.embed)].sort(
    (a, b) => a.x + a.y + a.z * 0.01 - (b.x + b.y + b.z * 0.01) || a.z - b.z,
  );
  return (
    <svg viewBox="0 0 180 160" className={clsx("text-ink", className)} aria-hidden>
      {boxes.map((b, i) => (
        <IsoBox key={i} b={b} ox={90} oy={95} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------
   Pixel icons — '#' = filled cell, '+' = accent cell
------------------------------------------------------------------- */
const ICONS: Record<string, string[]> = {
  discover: [
    "...####.....",
    "..#....#....",
    ".#.++...#...",
    ".#.+....#...",
    ".#......#...",
    ".#......#...",
    "..#....#....",
    "...#####....",
    ".......###..",
    "........###.",
    ".........###",
    "..........#.",
  ],
  design: [
    "############",
    "#....#.....#",
    "#....#.....#",
    "#....#.....#",
    "######+++++#",
    "#....#+...+#",
    "#....#+...+#",
    "#....#+++++#",
    "#....#.....#",
    "#....#.....#",
    "#....#.....#",
    "############",
  ],
  engineer: [
    "............",
    "...#....+...",
    "..#.....+...",
    ".#.....+....",
    "#......+....",
    ".#....+.....",
    "..#...+.....",
    "...#.+......",
    ".....+..#...",
    "........#...",
    ".........#..",
    "............",
  ],
  deploy: [
    ".....##.....",
    "....####....",
    "...######...",
    "..##.##.##..",
    ".#...##...#.",
    ".....##.....",
    ".....##.....",
    ".....##.....",
    "............",
    "++++++++++++",
    "+..........+",
    "++++++++++++",
  ],
  operate: [
    "....####....",
    "..##....##..",
    ".#........#.",
    ".#..++++..##",
    "#...+..+...#",
    "#...+..+...#",
    "#...++++...#",
    "##.........#",
    ".#........#.",
    ".#........#.",
    "..##....##..",
    "....####....",
  ],
  square: [
    "..########..",
    ".#........#.",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    ".#........#.",
    "..########..",
  ],
  stack: [
    "#########...",
    "#.......#...",
    "#.#########.",
    "#.#.......#.",
    "#.#.#########",
    "#.#.#.......#",
    "###.#.......#",
    "..#.#.......#",
    "..###.......#",
    "....#.......#",
    "....#.......#",
    "....#########",
  ],
  check: [
    "............",
    "...........#",
    "..........##",
    ".........##.",
    "........##..",
    "#......##...",
    "##....##....",
    ".##..##.....",
    "..####......",
    "...##.......",
    "............",
    "............",
  ],
  eye: [
    "............",
    "....####....",
    "..##....##..",
    ".#...++...#.",
    "#...++++...#",
    "#...++++...#",
    ".#...++...#.",
    "..##....##..",
    "....####....",
    "............",
    "............",
    "............",
  ],
  gauge: [
    "....####....",
    "..##....##..",
    ".#........#.",
    "#.......+..#",
    "#......+...#",
    "#.....+....#",
    "#....##....#",
    "#....##....#",
    ".#........#.",
    "..##....##..",
    "....####....",
    "............",
  ],
  code: [
    "############",
    "#..........#",
    "############",
    "#..........#",
    "#.#........#",
    "#..#.......#",
    "#.#..++++..#",
    "#..........#",
    "#..........#",
    "#..........#",
    "#..........#",
    "############",
  ],
};

export function PixelIcon({
  name,
  className,
  accent = "var(--blue)",
}: {
  name: string;
  className?: string;
  accent?: string;
}) {
  const rows = ICONS[name] ?? ICONS.square;
  const w = Math.max(...rows.map((r) => r.length));
  return (
    <svg viewBox={`0 0 ${w} ${rows.length}`} className={className ?? "size-12"} shapeRendering="crispEdges" aria-hidden>
      {rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" || c === "+" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={c === "+" ? accent : "currentColor"} />
          ) : null,
        ),
      )}
    </svg>
  );
}
