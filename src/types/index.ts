export interface UserRequirements {
  targetAudience: {
    demographics: string;
    preferences: string;
  };
  websiteGoals: string;
  contentSections: string[];
  brandColors: string[];
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  callToAction: string[];
}

export interface LayoutConfig {
  spacing: number;
  colorScheme: string[];
  typographyScale: number;
  orientation: 'vertical' | 'horizontal';
}

export interface GeneratedLayout {
  html: string;
  css: string;
  accessibilityReport: {
    wcagCompliance: boolean;
    contrastRatios: Record<string, number>;
    ariaLabels: boolean;
  };
}