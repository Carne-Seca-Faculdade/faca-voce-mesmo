interface getLocalStorageProps {
  storageKey: string;
  defaultValue: any;
  staleTimeInMinutes?: number;
}

export function getLocalStorage({
  storageKey,
  defaultValue,
  staleTimeInMinutes,
}: getLocalStorageProps) {
  try {
    const serializedValue = localStorage.getItem(storageKey);

    if (!serializedValue) {
      console.log("Value not found in local storage");
      return defaultValue;
    }

    const { saveAt, data } = JSON.parse(serializedValue);

    if (!saveAt || !data) {
      console.log("LocalStorage data is incomplete");
      console.log("Setting default value", defaultValue);
      return defaultValue;
    }

    if (staleTimeInMinutes) {
      const isDataStale = verifyDataStale({
        saveAt,
        staleTimeInMinutes,
        storageKey,
      });

      return isDataStale ? defaultValue : data;
    }

    console.log("Value gotten from local storage", data);
    return data;
  } catch (error) {
    console.error(`Error getting ${storageKey} from local storage: ${error}`);
    return defaultValue;
  }
}

interface VerifyDataStaleProps {
  saveAt: number;
  staleTimeInMinutes: number;
  storageKey: string;
}

function verifyDataStale({
  saveAt,
  staleTimeInMinutes,
  storageKey,
}: VerifyDataStaleProps) {
  if (staleTimeInMinutes) {
    const staleTimeInMilliseconds = staleTimeInMinutes * 60 * 1000;
    const currentTime = Date.now();
    console.log("Fetching from local storage", storageKey);
    console.log("Current time is ", new Date(currentTime));
    console.log("Saved at ", new Date(saveAt));

    const difference = currentTime - saveAt;
    const differenceInMinutes = difference / 1000 / 60;
    console.log(
      `Time since ${storageKey} was saved is ${differenceInMinutes.toFixed(
        2,
      )} minutes`,
    );

    if (difference > staleTimeInMilliseconds) {
      console.log("Data is stale");
      return true;
    }

    console.log("Data is not stale");
    return false;
  }
}
