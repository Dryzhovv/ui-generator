interface ParsedResponse {
  html: string;
  css: string;
}

export function parseGeneratedResponse(response: string): ParsedResponse {
  const htmlMatch = response.match(/---HTML---([\s\S]*?)---CSS---/);
  const cssMatch = response.match(/---CSS---([\s\S]*?)---END---/);

  if (!htmlMatch || !cssMatch) {
    throw new Error('Invalid response format from API');
  }

  return {
    html: htmlMatch[1].trim(),
    css: cssMatch[1].trim(),
  };
}