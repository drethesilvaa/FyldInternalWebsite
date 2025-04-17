export enum AspectRatio {
  FiveByFour = "Medium_Format",
  FourByThree = "Standard",
  OneByOne = "Square",
  ThreeByTwo = "Classic",
  SixteenByNine = "Widescreen",
  NineBySixteen = "Vertical_Portrait",
  Cinema = "Cinemascope_Panoramic",
}

// Optional: human‑readable labels
export const AspectRatioLabel: Record<AspectRatio, string> = {
  [AspectRatio.FiveByFour]: "Medium Format (5:4)",
  [AspectRatio.FourByThree]: "Standard (4:3)",
  [AspectRatio.OneByOne]: "Square (1:1)",
  [AspectRatio.ThreeByTwo]: "35 mm / Classic (3:2)",
  [AspectRatio.SixteenByNine]: "Widescreen (16:9)",
  [AspectRatio.NineBySixteen]: "Portrait (9:16)",
  [AspectRatio.Cinema]: "Cinemascope (2.35:1)",
};
