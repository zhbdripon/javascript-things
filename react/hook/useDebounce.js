import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}


// usage

// const [search, setSearch] = useState('')
// const debouncedSearch = useDebounce(search, 500)

// useEffect(() => {
//   if (debouncedSearch) {
//     fetchData(debouncedSearch)
//   }
// }, [debouncedSearch])