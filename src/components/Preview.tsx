import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { GeneratedLayout } from '../types';

interface PreviewProps {
  layout: GeneratedLayout | null;
}

export function Preview({ layout }: PreviewProps) {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = React.useState<'preview' | 'code'>('preview');

  if (!layout) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Generate a layout to see the preview
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'preview'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'code'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Code
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md ${
                viewMode === 'desktop'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md ${
                viewMode === 'mobile'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === 'preview' ? (
          <div
            className={`mx-auto p-4 ${
              viewMode === 'mobile' ? 'max-w-sm' : 'max-w-6xl'
            }`}
          >
            <div
              className="preview-container"
              dangerouslySetInnerHTML={{ __html: layout.html }}
            />
            <style>{layout.css}</style>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">HTML</h3>
              <SyntaxHighlighter language="html" style={tomorrow}>
                {layout.html}
              </SyntaxHighlighter>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">CSS</h3>
              <SyntaxHighlighter language="css" style={tomorrow}>
                {layout.css}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}