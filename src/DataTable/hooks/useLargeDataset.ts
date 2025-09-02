import { useMemo } from 'react';
import { Column } from '../types';

const CHUNK_SIZE = 100;

export function useLargeDataset<T extends { id: string | number }>(
  data: T[],
  columns: Column<T>[],
  searchTerm: string,
  searchableKeys: (keyof T)[]
) {
  return useMemo(() => {
    const chunks: T[][] = [];
    let currentChunk: T[] = [];

    const filteredData = data.filter(item => {
      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return searchableKeys.some(key => {
        const value = item[key];
        return value != null && String(value).toLowerCase().includes(searchLower);
      });
    });

    filteredData.forEach((item, index) => {
      currentChunk.push(item);
      if (currentChunk.length === CHUNK_SIZE || index === filteredData.length - 1) {
        chunks.push(currentChunk);
        currentChunk = [];
      }
    });

    return {
      chunks,
      totalItems: filteredData.length,
      getChunk: (index: number) => chunks[index] || [],
      getItem: (index: number) => {
        const chunkIndex = Math.floor(index / CHUNK_SIZE);
        const itemIndex = index % CHUNK_SIZE;
        return chunks[chunkIndex]?.[itemIndex];
      },
    };
  }, [data, searchTerm, searchableKeys]);
}