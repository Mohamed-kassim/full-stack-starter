import i18n from "../i18n.config";
export const isRTL = i18n.dir() === "rtl";
export const concatenateRtlStrings = (strings: string[]) => {
  const newStrings = [...strings];
  if (!isRTL) {
    newStrings.reverse();
  }
  const x = newStrings.join("");
  return x;
};
