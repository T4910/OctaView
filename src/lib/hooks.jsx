import { useState, useEffect } from 'react';

const mediaQueryMap = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
    // Add more shorthands as needed
};

export function useMediaQuery(queryKey) {
    const query = mediaQueryMap[queryKey];
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const handleChange = (event) => {
            setMatches(event.matches);
        };

        handleChange(mediaQuery);

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [query]);

    return matches;
}

// Example usage:
// function MyComponent() {
//     const isSmallScreen = useMediaQuery('sm');

//     return (
//         <div>
//             {isSmallScreen ? 'Small screen' : 'Large screen'}
//         </div>
//     );
// }
