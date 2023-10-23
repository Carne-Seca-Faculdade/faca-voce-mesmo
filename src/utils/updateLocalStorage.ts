interface UpdateLocalStorageProps {
  storageKey: string;
  value: {
    saveAt: number;
    data: any;
  };
}

export function updateLocalStorage({
  storageKey,
  value,
}: UpdateLocalStorageProps) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(storageKey, serializedValue);
    console.log("Saved to local storage", storageKey, value);
  } catch (error) {
    throw new Error(`Error saving to local storage: ${error}`);
  }
}
