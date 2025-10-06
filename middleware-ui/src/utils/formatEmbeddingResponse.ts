export const formatEmbeddingResponse = (response: string): string => {
  // Check if it looks like an embedding (starts with numbers and commas)
  if (/^-?\d+\.?\d*,-?\d+\.?\d*/.test(response.trim())) {
    // Split by commas and format with line breaks every 10 numbers
    const numbers = response.split(",");
    const formatted = [];
    for (let i = 0; i < numbers.length; i += 10) {
      formatted.push(numbers.slice(i, i + 10).join(", "));
    }
    return formatted.join("\n");
  }
  return response;
};
