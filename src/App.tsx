import React from 'react';
import { InputForm } from './components/InputForm';
import { Preview } from './components/Preview';
import type { GeneratedLayout, UserRequirements } from './types';
import { generateLayout } from './services/layout/generator';

export function App() {
  const [layout, setLayout] = React.useState<GeneratedLayout | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (requirements: UserRequirements) => {
    setLoading(true);
    setError(null);

    try {
      const generatedLayout = await generateLayout(requirements);
      setLayout(generatedLayout);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold text-gray-900">Content-to-UI Generator</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <InputForm onSubmit={handleSubmit} />
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden h-[calc(100vh-12rem)]">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <Preview layout={layout} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}