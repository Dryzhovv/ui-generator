import { API_CONFIG } from '../../config/constants';
import { callHuggingFaceApi } from '../api/huggingface';
import type { GeneratedLayout, UserRequirements } from '../../types';
import { validateHtmlAccessibility } from '../../utils/accessibility';
import { generateLayoutPrompt } from '../../utils/prompts';
import { parseGeneratedResponse } from '../../utils/parser';

export async function generateLayout(requirements: UserRequirements): Promise<GeneratedLayout> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < API_CONFIG.RETRY_ATTEMPTS; attempt++) {
    try {
      const prompt = generateLayoutPrompt(requirements);
      const response = await callHuggingFaceApi(prompt);
      const { html, css } = parseGeneratedResponse(response);
      const accessibilityReport = validateHtmlAccessibility(html);

      return {
        html,
        css,
        accessibilityReport,
      };
    } catch (error) {
      lastError = error as Error;
      await new Promise(resolve => 
        setTimeout(resolve, API_CONFIG.RETRY_DELAY * Math.pow(2, attempt))
      );
    }
  }

  throw lastError || new Error('Failed to generate layout');
}