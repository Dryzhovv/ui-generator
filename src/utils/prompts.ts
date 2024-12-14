import type { UserRequirements } from '../types';

export function generateLayoutPrompt(requirements: UserRequirements): string {
  return `Generate a clean, minimalist website layout with the following requirements:

Target Audience: ${requirements.targetAudience.demographics}
Preferences: ${requirements.targetAudience.preferences}
Website Goals: ${requirements.websiteGoals}

Content Sections:
${requirements.contentSections.map(section => `- ${section}`).join('\n')}

Brand Colors:
${requirements.brandColors.map(color => `- ${color}`).join('\n')}

Typography:
- Heading Font: ${requirements.typography.headingFont}
- Body Font: ${requirements.typography.bodyFont}

Call to Action Elements:
${requirements.callToAction.map(cta => `- ${cta}`).join('\n')}

Please generate semantic HTML5 and CSS that:
1. Uses a responsive design with flexbox/grid
2. Follows WCAG 2.1 AA accessibility guidelines
3. Implements proper spacing using the 8-point grid system
4. Maintains a clean, minimalist aesthetic
5. Includes proper ARIA labels
6. Optimizes for performance

Return the response in the following format:
---HTML---
[Your HTML code here]
---CSS---
[Your CSS code here]
---END---`;
}