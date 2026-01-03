export const convertCase = (input?: string): string => {
  if (!input) return "";
  // remove characters that aren't safe in branch names, including [ and ]
  const words = input.replace(/[/:*"<>|\\\[\]]/g, "").split(/\s+/);
  const firstWord = words.shift();
  return [
    firstWord,
    ...words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)),
  ]
    .filter(Boolean)
    .join("");
};

export const buildBranchAndCommit = (
  username = "",
  company = "",
  number = "",
  feature = ""
): { branch: string; commit: string } => {
  let f = feature.replace("  ", " ").trim();
  if (f.endsWith(".")) f = f.slice(0, -1).trim();
  const featureCase = convertCase(f);
  // ensure username, company and number don't include bracket characters
  const safe = (s = "") => s.replace(/\[|\]/g, "");
  const branch = `users/${safe(username)}/${safe(company)}-${safe(
    number
  )}/${featureCase}`;
  const commit = `[${company}-${number}]/${f}`;
  return { branch, commit };
};
