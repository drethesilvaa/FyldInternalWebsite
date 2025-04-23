type SpacerSize =
  | "px12"
  | "px16"
  | "px24"
  | "px32"
  | "px48"
  | "px64"
  | "px96"
  | "px128";

interface SpacerProps {
  tamanho: SpacerSize;
}

const sizeMap: Record<SpacerSize, string> = {
  px12: "h-3",
  px16: "h-4",
  px24: "h-6",
  px32: "h-8",
  px48: "h-12",
  px64: "h-16",
  px96: "h-24",
  px128: "h-32",
};

export const Spacer: React.FC<SpacerProps> = ({ tamanho }) => {
  const className = sizeMap[tamanho];

  return <div className={className} />;
};
