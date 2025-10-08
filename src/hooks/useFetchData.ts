// src/hooks/useFetchData.ts
import { useState, useEffect, useCallback } from "react";

interface UseFetchDataReturn<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  setIsLoading: (loading: boolean) => void;
  setError: (erro: string| null) => void
  fetchData: () => Promise<void>;
}

export function useFetchData<T>(fetchFn: () => Promise<T[]>): UseFetchDataReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await fetchFn();
      setData(result);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao carregar os dados";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetchData();
    }, 1000); // Simulate delay
  }, [fetchData]);

  return { data, isLoading, error, fetchData, setIsLoading, setError };
}
