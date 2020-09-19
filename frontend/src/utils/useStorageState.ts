import { Dispatch, SetStateAction, useState, useEffect } from "react";
//---------------------------------------------------------------< types >
type Response<T> = [T, Dispatch<SetStateAction<T>>];
//================================================================[ BODY ]
function useStorageState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);
    return storageValue ? JSON.parse(storageValue) : initialState;
  });

  /// armazena o estado no cash do navegador
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useStorageState;
