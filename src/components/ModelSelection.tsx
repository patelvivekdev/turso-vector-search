'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { modelType } from './chat';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const ModelSelection = () => {
  const [selectedModel, setSelectedModel] = useQueryState('model', { defaultValue: 'google' });

  useEffect(() => {
    if (selectedModel !== 'google' && selectedModel !== 'mistral') {
      setSelectedModel('google');
    }
  }, [selectedModel, setSelectedModel]);
  return (
    <div className="mx-auto w-full max-w-xs">
      <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value as modelType)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select AI Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="google">Google AI</SelectItem>
          <SelectItem value="mistral">Mistral AI</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
