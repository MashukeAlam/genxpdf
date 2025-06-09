import languages from "../../data/source_languages.json"; // or target_languages.json

export function getLanguageNameByCode(code) {
  const match = languages.data.find(lang => lang.code === code);
  return match ? match.name : code; // fallback to code if name not found
}
