import { useEffect, useState } from "react";

function useDebounce(value, delay) {
    const [debouncedSearch, setDebouncedSearch] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(value)
        }, delay);

        return () => clearTimeout(timer);

    }, [value, delay])

    return debouncedSearch
}

export default useDebounce;