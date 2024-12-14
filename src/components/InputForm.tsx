import React from 'react';
import { Save, Trash2 } from 'lucide-react';
import type { UserRequirements } from '../types';

interface InputFormProps {
  onSubmit: (requirements: UserRequirements) => void;
}

export function InputForm({ onSubmit }: InputFormProps) {
  const [requirements, setRequirements] = React.useState<UserRequirements>({
    targetAudience: {
      demographics: '',
      preferences: '',
    },
    websiteGoals: '',
    contentSections: [''],
    brandColors: ['#000000'],
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    callToAction: [''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(requirements);
  };

  const addSection = () => {
    setRequirements(prev => ({
      ...prev,
      contentSections: [...prev.contentSections, ''],
    }));
  };

  const removeSection = (index: number) => {
    setRequirements(prev => ({
      ...prev,
      contentSections: prev.contentSections.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Project Requirements</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Target Audience Demographics
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={requirements.targetAudience.demographics}
              onChange={e => setRequirements(prev => ({
                ...prev,
                targetAudience: { ...prev.targetAudience, demographics: e.target.value },
              }))}
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Website Goals
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={requirements.websiteGoals}
              onChange={e => setRequirements(prev => ({ ...prev, websiteGoals: e.target.value }))}
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content Sections
            <div className="space-y-2">
              {requirements.contentSections.map((section, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={section}
                    onChange={e => {
                      const newSections = [...requirements.contentSections];
                      newSections[index] = e.target.value;
                      setRequirements(prev => ({ ...prev, contentSections: newSections }));
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSection}
              className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              + Add Section
            </button>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Brand Colors (max 3)
            <div className="flex gap-2 mt-1">
              {requirements.brandColors.map((color, index) => (
                <input
                  key={index}
                  type="color"
                  className="h-10 w-10 rounded cursor-pointer"
                  value={color}
                  onChange={e => {
                    const newColors = [...requirements.brandColors];
                    newColors[index] = e.target.value;
                    setRequirements(prev => ({ ...prev, brandColors: newColors }));
                  }}
                />
              ))}
              {requirements.brandColors.length < 3 && (
                <button
                  type="button"
                  onClick={() => setRequirements(prev => ({
                    ...prev,
                    brandColors: [...prev.brandColors, '#000000'],
                  }))}
                  className="h-10 w-10 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  +
                </button>
              )}
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Generate Layout
        </button>
      </div>
    </form>
  );
}