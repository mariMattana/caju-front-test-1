import { useState } from 'react';

function useUpdateRegistration<T>(storageKey: string) {
  const [error, setError] = useState<string | null>(null);

  const updateData = (id: string, updatedData: T) => {
    try {
      // Obter os dados atuais do localStorage
      const storedData = JSON.parse(localStorage.getItem(storageKey) || '[]');

      // Encontrar e atualizar o registro pelo ID
      const updatedStoredData = storedData.map((item: any) =>
        item.id === id ? { ...item, ...updatedData } : item
      );

      // Atualizar os dados no localStorage
      localStorage.setItem(storageKey, JSON.stringify(updatedStoredData));
      
    } catch (err) {
      setError('An error occurred while updating the data');
    }
  };

  return { updateData, error };
}

export default useUpdateRegistration;
