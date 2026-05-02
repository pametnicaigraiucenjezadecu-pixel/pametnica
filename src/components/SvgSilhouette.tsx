import React from 'react';

export type ShadowId =
  | 'cat' | 'fish' | 'ball' | 'star' | 'circle' | 'heart'
  | 'rocket' | 'car' | 'boat'
  | 'elephant' | 'pig' | 'cow' | 'horse'
  | 'tree' | 'cactus' | 'flower' | 'mushroom'
  | 'banana' | 'apple' | 'grapes' | 'cherry'
  | 'penguin' | 'owl' | 'duck' | 'chick'
  | 'train' | 'bus' | 'tram'
  | 'lion' | 'tiger' | 'leopard' | 'bear';

// All shapes are drawn in a 100×100 viewBox.
// Use fill="currentColor" for the main body, fill="white" for interior details.
const SHAPES: Record<ShadowId, React.ReactNode> = {
  ball: <circle cx="50" cy="50" r="42" />,

  circle: <circle cx="50" cy="50" r="42" />,

  star: <polygon points="50,6 62,38 96,38 69,58 79,90 50,70 21,90 31,58 4,38 38,38" />,

  heart: (
    <path d="M50,84 Q16,62 16,38 A22,22 0 0,1 50,26 A22,22 0 0,1 84,38 Q84,62 50,84Z" />
  ),

  cat: (
    <>
      <ellipse cx="50" cy="66" rx="27" ry="22" />
      <circle cx="50" cy="38" r="19" />
      <polygon points="32,28 40,12 48,28" />
      <polygon points="52,28 60,12 68,28" />
      {/* tail */}
      <path d="M76,64 Q92,56 90,42 Q88,32 80,30"
        stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
    </>
  ),

  fish: (
    <>
      <ellipse cx="56" cy="50" rx="32" ry="20" />
      <polygon points="24,30 8,50 24,70" />
    </>
  ),

  rocket: (
    <>
      <path d="M42,76 L42,32 Q50,8 58,32 L58,76Z" />
      <polygon points="42,74 28,90 42,82" />
      <polygon points="58,74 72,90 58,82" />
    </>
  ),

  car: (
    <>
      <rect x="30" y="34" width="40" height="16" rx="4" />
      <rect x="10" y="50" width="80" height="20" rx="5" />
      <circle cx="28" cy="72" r="11" />
      <circle cx="72" cy="72" r="11" />
      <circle cx="28" cy="72" r="5" fill="white" />
      <circle cx="72" cy="72" r="5" fill="white" />
    </>
  ),

  boat: (
    <>
      {/* sail */}
      <polygon points="50,14 50,62 80,62" />
      {/* hull */}
      <path d="M12,62 Q50,80 88,62Z" />
    </>
  ),

  elephant: (
    <>
      <ellipse cx="52" cy="60" rx="30" ry="25" />
      <circle cx="50" cy="34" r="22" />
      {/* big ear */}
      <ellipse cx="24" cy="34" rx="17" ry="22" />
      {/* trunk */}
      <path d="M38,50 Q26,58 24,72 Q28,78 35,72 Q36,60 44,52"
        stroke="currentColor" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* legs */}
      <rect x="26" y="80" width="10" height="14" rx="5" />
      <rect x="40" y="80" width="10" height="14" rx="5" />
      <rect x="54" y="80" width="10" height="14" rx="5" />
      <rect x="66" y="80" width="10" height="14" rx="5" />
    </>
  ),

  pig: (
    <>
      <ellipse cx="50" cy="62" rx="28" ry="24" />
      <circle cx="50" cy="36" r="22" />
      {/* round ears */}
      <circle cx="32" cy="20" r="11" />
      <circle cx="68" cy="20" r="11" />
      {/* snout */}
      <ellipse cx="50" cy="46" rx="13" ry="10" />
      <circle cx="44" cy="47" r="3" fill="white" />
      <circle cx="56" cy="47" r="3" fill="white" />
      {/* curly tail */}
      <path d="M78,62 Q93,54 90,44 Q87,36 80,38"
        stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
    </>
  ),

  cow: (
    <>
      <ellipse cx="50" cy="60" rx="30" ry="26" />
      <ellipse cx="50" cy="33" rx="22" ry="18" />
      <ellipse cx="28" cy="24" rx="9" ry="11" />
      <ellipse cx="72" cy="24" rx="9" ry="11" />
      {/* horns */}
      <path d="M33,20 Q28,8 22,6" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M67,20 Q72,8 78,6" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* snout */}
      <ellipse cx="50" cy="43" rx="14" ry="10" />
      <circle cx="44" cy="44" r="3" fill="white" />
      <circle cx="56" cy="44" r="3" fill="white" />
      {/* legs */}
      <rect x="26" y="82" width="10" height="14" rx="5" />
      <rect x="40" y="82" width="10" height="14" rx="5" />
      <rect x="54" y="82" width="10" height="14" rx="5" />
      <rect x="66" y="82" width="10" height="14" rx="5" />
    </>
  ),

  horse: (
    <>
      <ellipse cx="52" cy="58" rx="28" ry="20" />
      {/* neck */}
      <path d="M34,44 Q28,33 32,22 L44,20 Q50,30 48,44Z" />
      <ellipse cx="36" cy="20" rx="14" ry="10" transform="rotate(-15,36,20)" />
      {/* ear */}
      <polygon points="30,12 34,4 38,12" />
      {/* mane */}
      <path d="M34,14 Q30,19 32,26 Q37,16 40,23 Q38,14 43,18"
        stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* legs */}
      <rect x="28" y="72" width="9" height="20" rx="4" />
      <rect x="42" y="72" width="9" height="20" rx="4" />
      <rect x="55" y="72" width="9" height="20" rx="4" />
      <rect x="68" y="72" width="9" height="20" rx="4" />
      {/* tail */}
      <path d="M80,54 Q96,46 93,62 Q91,73 82,68"
        stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
    </>
  ),

  tree: (
    <>
      <polygon points="50,8 74,40 26,40" />
      <polygon points="50,24 78,56 22,56" />
      <polygon points="50,38 82,70 18,70" />
      <rect x="43" y="70" width="14" height="22" rx="3" />
    </>
  ),

  cactus: (
    <>
      {/* trunk */}
      <rect x="42" y="18" width="16" height="66" rx="8" />
      {/* left arm */}
      <rect x="22" y="36" width="22" height="12" rx="6" />
      <rect x="20" y="22" width="14" height="26" rx="7" />
      {/* right arm */}
      <rect x="56" y="44" width="22" height="12" rx="6" />
      <rect x="66" y="28" width="14" height="28" rx="7" />
    </>
  ),

  flower: (
    <>
      <circle cx="50" cy="26" r="14" />
      <circle cx="74" cy="38" r="14" />
      <circle cx="74" cy="62" r="14" />
      <circle cx="50" cy="74" r="14" />
      <circle cx="26" cy="62" r="14" />
      <circle cx="26" cy="38" r="14" />
      {/* center */}
      <circle cx="50" cy="50" r="17" />
      {/* stem */}
      <rect x="46" y="80" width="8" height="16" rx="4" />
    </>
  ),

  mushroom: (
    <>
      <path d="M12,58 Q12,16 50,12 Q88,16 88,58Z" />
      <rect x="34" y="58" width="32" height="30" rx="8" />
      <ellipse cx="36" cy="36" rx="7" ry="9" fill="white" />
      <ellipse cx="58" cy="26" rx="7" ry="9" fill="white" />
    </>
  ),

  banana: (
    <path d="M18,78 Q16,44 38,20 Q54,8 72,12 Q75,18 72,22 Q57,20 44,32 Q26,50 30,76Z" />
  ),

  apple: (
    <>
      <path d="M50,84 Q20,82 14,58 Q10,38 26,26 Q35,18 50,22 Q65,18 74,26 Q90,38 86,58 Q80,82 50,84Z" />
      <path d="M50,22 Q52,12 60,8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M55,16 Q66,12 68,20 Q62,23 55,16Z" />
    </>
  ),

  grapes: (
    <>
      <path d="M46,10 Q50,6 54,10 L54,20 L46,20Z" />
      {/* top two */}
      <circle cx="36" cy="30" r="13" />
      <circle cx="64" cy="30" r="13" />
      {/* middle three */}
      <circle cx="22" cy="50" r="13" />
      <circle cx="50" cy="50" r="13" />
      <circle cx="78" cy="50" r="13" />
      {/* bottom two */}
      <circle cx="36" cy="70" r="13" />
      <circle cx="64" cy="70" r="13" />
      {/* tip */}
      <circle cx="50" cy="86" r="11" />
    </>
  ),

  cherry: (
    <>
      {/* stems */}
      <path d="M34,40 Q50,14 66,40" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="28" cy="58" r="19" />
      <circle cx="72" cy="58" r="19" />
    </>
  ),

  penguin: (
    <>
      <ellipse cx="50" cy="62" rx="26" ry="30" />
      <circle cx="50" cy="28" r="20" />
      {/* white belly */}
      <ellipse cx="50" cy="65" rx="15" ry="22" fill="white" />
      {/* white face */}
      <ellipse cx="50" cy="30" rx="12" ry="10" fill="white" />
      {/* flippers */}
      <path d="M24,52 Q12,64 16,76 Q22,68 28,57Z" />
      <path d="M76,52 Q88,64 84,76 Q78,68 72,57Z" />
      {/* feet */}
      <ellipse cx="40" cy="90" rx="10" ry="5" />
      <ellipse cx="60" cy="90" rx="10" ry="5" />
    </>
  ),

  owl: (
    <>
      <ellipse cx="50" cy="64" rx="24" ry="28" />
      <circle cx="50" cy="32" r="26" />
      {/* ear tufts */}
      <polygon points="30,12 37,22 24,22" />
      <polygon points="70,12 63,22 76,22" />
      {/* eye rings */}
      <circle cx="38" cy="30" r="11" fill="white" />
      <circle cx="62" cy="30" r="11" fill="white" />
      {/* pupils */}
      <circle cx="38" cy="30" r="6" />
      <circle cx="62" cy="30" r="6" />
      {/* beak */}
      <polygon points="50,37 43,48 57,48" fill="white" />
    </>
  ),

  duck: (
    <>
      <ellipse cx="54" cy="60" rx="30" ry="22" />
      <circle cx="26" cy="38" r="18" />
      {/* flat bill */}
      <ellipse cx="10" cy="38" rx="13" ry="7" />
      {/* tail up */}
      <path d="M82,52 Q96,42 93,58 Q90,68 80,64Z" />
    </>
  ),

  chick: (
    <>
      <circle cx="50" cy="60" r="28" />
      <circle cx="50" cy="28" r="20" />
      {/* crest */}
      <ellipse cx="50" cy="9" rx="5" ry="8" />
      <ellipse cx="40" cy="12" rx="4" ry="7" transform="rotate(-20,40,12)" />
      <ellipse cx="60" cy="12" rx="4" ry="7" transform="rotate(20,60,12)" />
      {/* beak */}
      <polygon points="36,30 28,26 28,34" />
      {/* wing buds */}
      <ellipse cx="24" cy="60" rx="8" ry="14" />
      <ellipse cx="76" cy="60" rx="8" ry="14" />
    </>
  ),

  train: (
    <>
      {/* engine body */}
      <rect x="6" y="32" width="52" height="38" rx="4" />
      {/* cab on top */}
      <rect x="8" y="18" width="30" height="16" rx="3" />
      {/* chimney */}
      <rect x="18" y="10" width="12" height="10" rx="3" />
      {/* coal car */}
      <rect x="60" y="42" width="36" height="28" rx="3" />
      {/* coupling */}
      <rect x="57" y="52" width="4" height="8" />
      {/* wheels */}
      <circle cx="20" cy="74" r="10" />
      <circle cx="44" cy="74" r="10" />
      <circle cx="70" cy="74" r="9" />
      <circle cx="87" cy="74" r="8" />
      <circle cx="20" cy="74" r="4" fill="white" />
      <circle cx="44" cy="74" r="4" fill="white" />
      <circle cx="70" cy="74" r="4" fill="white" />
      <circle cx="87" cy="74" r="3" fill="white" />
    </>
  ),

  bus: (
    <>
      <rect x="6" y="22" width="88" height="52" rx="7" />
      {/* windows */}
      <rect x="14" y="30" width="14" height="12" rx="2" fill="white" />
      <rect x="34" y="30" width="14" height="12" rx="2" fill="white" />
      <rect x="54" y="30" width="14" height="12" rx="2" fill="white" />
      <rect x="74" y="30" width="14" height="12" rx="2" fill="white" />
      {/* door */}
      <rect x="12" y="46" width="14" height="22" rx="2" fill="white" />
      {/* wheels */}
      <circle cx="26" cy="77" r="12" />
      <circle cx="74" cy="77" r="12" />
      <circle cx="26" cy="77" r="5" fill="white" />
      <circle cx="74" cy="77" r="5" fill="white" />
    </>
  ),

  tram: (
    <>
      <rect x="14" y="20" width="72" height="56" rx="5" />
      {/* roof panel */}
      <rect x="17" y="14" width="66" height="8" rx="3" />
      {/* pantograph */}
      <line x1="50" y1="6" x2="50" y2="14" stroke="currentColor" strokeWidth="3" />
      <line x1="28" y1="6" x2="72" y2="6" stroke="currentColor" strokeWidth="3" />
      {/* windows */}
      <rect x="20" y="28" width="14" height="10" rx="2" fill="white" />
      <rect x="43" y="28" width="14" height="10" rx="2" fill="white" />
      <rect x="66" y="28" width="14" height="10" rx="2" fill="white" />
      <rect x="20" y="44" width="14" height="10" rx="2" fill="white" />
      <rect x="43" y="44" width="14" height="10" rx="2" fill="white" />
      <rect x="66" y="44" width="14" height="10" rx="2" fill="white" />
      {/* wheels */}
      <circle cx="30" cy="79" r="10" />
      <circle cx="70" cy="79" r="10" />
      <circle cx="30" cy="79" r="4" fill="white" />
      <circle cx="70" cy="79" r="4" fill="white" />
    </>
  ),

  // ── Big cats + bear — key distinctions:
  // lion:    large mane (big circle), so head looks huge
  // tiger:   slim, pointy ears, long tail, body stripes hint
  // leopard: slimmest, longest tail, rosette spots hint
  // bear:    stocky, ROUND ears, no tail
  lion: (
    <>
      {/* mane — fills behind face making head look huge */}
      <circle cx="50" cy="36" r="34" />
      {/* face on top */}
      <circle cx="50" cy="34" r="21" fill="white" />
      <circle cx="50" cy="34" r="19" />
      {/* body */}
      <ellipse cx="50" cy="72" rx="28" ry="20" />
      {/* legs */}
      <rect x="26" y="84" width="10" height="12" rx="5" />
      <rect x="40" y="84" width="10" height="12" rx="5" />
      <rect x="50" y="84" width="10" height="12" rx="5" />
      <rect x="64" y="84" width="10" height="12" rx="5" />
      {/* tail with tuft */}
      <path d="M78,66 Q96,58 93,74" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="91" cy="77" r="6" />
    </>
  ),

  tiger: (
    <>
      <ellipse cx="50" cy="60" rx="28" ry="22" />
      <circle cx="50" cy="30" r="24" />
      <polygon points="30,16 37,22 33,6" />
      <polygon points="70,16 63,22 67,6" />
      {/* stripe hints */}
      <rect x="40" y="24" width="5" height="13" rx="2" fill="white" opacity="0.45" />
      <rect x="55" y="24" width="5" height="13" rx="2" fill="white" opacity="0.45" />
      {/* legs */}
      <rect x="26" y="76" width="10" height="18" rx="5" />
      <rect x="40" y="76" width="10" height="18" rx="5" />
      <rect x="50" y="76" width="10" height="18" rx="5" />
      <rect x="64" y="76" width="10" height="18" rx="5" />
      {/* long tail */}
      <path d="M78,58 Q98,48 95,66 Q93,78 82,72"
        stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
    </>
  ),

  leopard: (
    <>
      {/* slimmer than tiger */}
      <ellipse cx="50" cy="58" rx="24" ry="19" />
      <circle cx="50" cy="30" r="20" />
      {/* pointier ears */}
      <polygon points="32,18 38,24 33,6" />
      <polygon points="68,18 62,24 67,6" />
      {/* rosette spots */}
      <circle cx="38" cy="28" r="5" fill="white" opacity="0.4" />
      <circle cx="62" cy="28" r="5" fill="white" opacity="0.4" />
      <circle cx="40" cy="56" r="5" fill="white" opacity="0.4" />
      <circle cx="60" cy="56" r="5" fill="white" opacity="0.4" />
      {/* long legs */}
      <rect x="28" y="72" width="8" height="22" rx="4" />
      <rect x="40" y="72" width="8" height="22" rx="4" />
      <rect x="52" y="72" width="8" height="22" rx="4" />
      <rect x="64" y="72" width="8" height="22" rx="4" />
      {/* very long tail */}
      <path d="M74,52 Q97,40 94,60 Q92,76 78,68"
        stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),

  bear: (
    <>
      {/* stocky body */}
      <ellipse cx="50" cy="64" rx="32" ry="27" />
      {/* big round head */}
      <circle cx="50" cy="32" r="27" />
      {/* round ears — key bear feature */}
      <circle cx="25" cy="12" r="13" />
      <circle cx="75" cy="12" r="13" />
      {/* snout */}
      <ellipse cx="50" cy="40" rx="13" ry="10" fill="white" opacity="0.3" />
      {/* stubby legs */}
      <rect x="22" y="86" width="14" height="10" rx="6" />
      <rect x="40" y="86" width="14" height="10" rx="6" />
      <rect x="46" y="86" width="14" height="10" rx="6" />
      <rect x="64" y="86" width="14" height="10" rx="6" />
    </>
  ),
};

interface Props {
  id: ShadowId;
  className?: string;
}

export const SvgSilhouette: React.FC<Props> = ({ id, className }) => (
  <svg
    viewBox="0 0 100 100"
    className={`shadow-silhouette-svg${className ? ` ${className}` : ''}`}
    aria-hidden="true"
  >
    {SHAPES[id]}
  </svg>
);
