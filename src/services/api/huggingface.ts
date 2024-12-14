import { API_CONFIG } from '../../config/constants';

interface ApiResponse {
  generated_text: string;
}

export async function callHuggingFaceApi(prompt: string): Promise<string> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/${API_CONFIG.MODEL_ID}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_CONFIG.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        temperature: 0.7,
        max_new_tokens: 2048,
        return_full_text: false,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json() as ApiResponse[];
  return data[0].generated_text;
}