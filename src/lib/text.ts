const replacements: Record<string, string> = {
  'Ã¡': 'a',
  'Ã©': 'e',
  'Ã­': 'i',
  'Ã³': 'o',
  'Ãº': 'u',
  'Ã±': 'n',
  'Ã': 'A',
  'Ã‰': 'E',
  'Ã': 'I',
  'Ã“': 'O',
  'Ãš': 'U',
  'Ã‘': 'N',
  'Â·': '-',
  'Â©': '(c)',
  'â€”': '-',
  'â€“': '-',
  'â†’': '->',
  'â†': '<-',
  'â†—': 'open',
  'â€¢': '-',
  'â˜…': '*',
  'crÄ±Ìticos': 'criticos',
};

export function cleanText(value: string): string {
  return Object.entries(replacements).reduce(
    (text, [from, to]) => text.replaceAll(from, to),
    value,
  );
}

export function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return cleanText(String(value)).replace(/-to-/g, ' - ').replace(/-/g, ' ');
  }
  return new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' }).format(date);
}
