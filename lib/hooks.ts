import { Hook } from "@/types/types";

export const hooks: Hook[] = [
  {
    id: "use-local-storage",
    name: "useLocalStorage",
    category: "State",
    description: "A hook for persisting state in localStorage with type safety",
    code: `function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
    usage: ["Persist form data across page refreshes", "Save user preferences", "Implement cart functionality in e-commerce applications"],
    parameters: [
      {
        name: "key",
        type: "string",
        description: "The key to store the value under in localStorage",
        required: true,
      },
      {
        name: "initialValue",
        type: "T",
        description: "The initial value if no value is stored",
        required: true,
      },
    ],
    returnValue: {
      type: "[T, (value: T | ((val: T) => T)) => void]",
      description: "A tuple containing the stored value and a setter function",
    },
    bestPractices: ["Use consistent key names across your application", "Handle errors gracefully", "Consider using a prefix for your keys to avoid naming conflicts"],
    pitfalls: ["localStorage is synchronous and can block the main thread", "Not available in server-side rendering", "Limited storage capacity"],
    examples: [
      {
        title: "Basic Usage",
        description: "Store and retrieve a simple value",
        code: `type Theme = 'light' | 'dark';

export default function App() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
      color: theme === 'light' ? '#333333' : '#ffffff',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <h1>Theme Switcher</h1>
      <p>Current theme: {theme}</p>
      <p>This preference will persist even after you refresh the page!</p>

      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          backgroundColor: theme === 'light' ? '#333333' : '#ffffff',
          color: theme === 'light' ? '#ffffff' : '#333333',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </div>
  );
};
`,
      },
    ],
    performance: ["Minimal impact on performance for small values", "Consider using sessionStorage for temporary data", "Large objects might impact performance during saves"],
  },
  {
    id: "use-debounce",
    name: "useDebounce",
    category: "Performance",
    description: "A hook for debouncing values to optimize performance",
    code: `function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
    usage: ["Debounce search input values", "Optimize form validation", "Reduce API call frequency"],
    parameters: [
      {
        name: "value",
        type: "T",
        description: "The value to debounce",
        required: true,
      },
      {
        name: "delay",
        type: "number",
        description: "The delay in milliseconds",
        required: true,
      },
    ],
    returnValue: {
      type: "T",
      description: "The debounced value",
    },
    bestPractices: ["Choose an appropriate delay based on your use case", "Consider using a longer delay for expensive operations", "Use in conjunction with useCallback for event handlers"],
    pitfalls: ["Too short delay might not provide benefits", "Too long delay might affect user experience", "Memory leaks if cleanup is not handled properly"],
    examples: [
      {
        title: "Search Input",
        description: "Debounce search input to reduce API calls",
        code: `
export default function App()  {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 1000);

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing..."
      />
      <p>Current length: {text.length}</p>
      <p>Debounced length: {debouncedText.length}</p>

    </div>
  );
}
`,
      },
    ],
    performance: ["Minimal memory overhead", "Reduces number of state updates", "Prevents unnecessary re-renders"],
  },
  {
    id: "use-debounce-callback",
    name: "useDebounceCallback",
    category: "Performance",
    description: "A hook that debounces a callback function to limit its execution frequency",
    code: `

  export function useDebounceCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const callbackRef = useRef(callback);

    useEffect(() => {
      callbackRef.current = callback;
    }, [callback]);

    return useCallback((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }, [delay]);
  }`,
    usage: ["Debounce form submission handlers", "Limit API call frequency", "Optimize search input handling", "Delay expensive calculations"],
    parameters: [
      {
        name: "callback",
        type: "T extends (...args: any[]) => any",
        description: "The function to debounce",
        required: true,
      },
      {
        name: "delay",
        type: "number",
        description: "The delay in milliseconds before executing the callback",
        required: true,
      },
    ],
    returnValue: {
      type: "(...args: Parameters<T>) => void",
      description: "A debounced version of the callback function",
    },
    bestPractices: ["Clean up timeouts when component unmounts", "Use refs to store latest callback value", "Keep delay values consistent to prevent unnecessary re-renders", "Consider using useCallback for the input function"],
    pitfalls: ["Not cleaning up timeouts can cause memory leaks", "Incorrect dependency array can cause stale closures", "Very short delays might not provide meaningful debouncing", "Not storing callback in ref can lead to outdated function calls"],
    examples: [
      {
        title: "Search Input with API Calls",
        description: "Debounce API calls when user types in search input",
        code: `export default function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = useDebounceCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    console.log('Window resized!'); // To see when the callback actually fires
  }, 500);

  // Attach the event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div>
      <h3>Try resizing your window!</h3>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>

    </div>
  );
}`,
      },
    ],
    performance: ["Prevents excessive function calls", "Minimal memory usage with proper cleanup", "No unnecessary re-renders", "Efficient handling of rapidly changing values"],
  },
  {
    id: "use-intersection-observer",
    name: "useIntersectionObserver",
    category: "Layout",
    description: "A hook for tracking element visibility in the viewport",
    code: `function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isVisible;
}`,
    usage: ["Implement infinite scrolling", "Lazy load images", "Track element visibility for analytics"],
    parameters: [
      {
        name: "elementRef",
        type: "RefObject<Element>",
        description: "Reference to the element to observe",
        required: true,
      },
      {
        name: "options",
        type: "IntersectionObserverInit",
        description: "IntersectionObserver options",
        required: false,
        defaultValue: "{}",
      },
    ],
    returnValue: {
      type: "boolean",
      description: "Whether the element is currently visible in the viewport",
    },
    bestPractices: ["Use appropriate threshold values for your use case", "Consider using root margins for earlier/later triggers", "Clean up observers when component unmounts"],
    pitfalls: ["Browser support considerations", "Performance impact with too many observers", "Incorrect ref usage"],
    examples: [
      {
        title: "Lazy Loading Images",
        description: "Load images only when they come into view",
        code: `export default function App() {
   const elementRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(elementRef, {
    threshold: 0.2,
    rootMargin: '50px'
  });

  return (
    <div className="app">
      {/* Spacer to enable scrolling */}
      <div style={{ height: '100vh' }}>
        <h1>Scroll down to see the effect</h1>
      </div>

      {/* Element being observed */}
      <div
        ref={elementRef}
        style={{
          minHeight: '300px',
          backgroundColor: '#f0f0f0',
          transition: 'all 0.5s ease-in-out',
          transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
          opacity: isVisible ? 1 : 0,
          padding: '20px',
          margin: '20px'
        }}
      >
        <h2>Animated Content</h2>
        <p>This section will fade in and slide up when it becomes visible.</p>
      </div>

      {/* Additional content */}
      <div style={{ height: '100vh' }}>
        <h1>Scroll up to see the effect again</h1>
      </div>
    </div>
  );
}`,
      },
    ],
    performance: ["Efficient viewport tracking", "Minimal impact on main thread", "Automatic cleanup of observers"],
  },

  {
    id: "use-media-query",
    name: "useMediaQuery",
    category: "Layout",
    description: "A hook for responsive design using media queries",
    code: `function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}`,
    usage: ["Responsive layouts", "Conditional rendering based on screen size", "Mobile-first development"],
    parameters: [
      {
        name: "query",
        type: "string",
        description: "Media query string",
        required: true,
      },
    ],
    returnValue: {
      type: "boolean",
      description: "Whether the media query matches",
    },
    bestPractices: ["Use standard media query syntax", "Consider performance with multiple queries", "Combine with useCallback for event handlers"],
    pitfalls: ["Browser compatibility issues", "Performance with many listeners", "SSR considerations"],
    examples: [
      {
        title: "Responsive Layout",
        description: "Adapt layout based on screen size",
        code: `export default function App() {
    const isSmall = useMediaQuery('(max-width: 400px)');
  const isMedium = useMediaQuery('(min-width: 401px) and (max-width: 800px)');

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center'
    }}>
      <h3>Resize the window!</h3>
      {isSmall && <p>👋 Hello mobile user!</p>}
      {isMedium && <p>👨‍💻 Hello tablet user!</p>}
      {!isSmall && !isMedium && <p>🖥️ Hello desktop user!</p>}
    </div>
  );
}
`,
      },
    ],
    performance: ["Minimal overhead", "Efficient event listener management", "Automatic cleanup"],
  },
  {
    id: "use-form",
    name: "useForm",
    category: "Custom",
    description: "A hook for form state management and validation",
    code: `function useForm<T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => Partial<Record<keyof T, string>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (validate) {
      const validationErrors = validate({ ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (onSubmit: (values: T) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values);
      }
    } else {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}`,
    usage: ["Form state management", "Form validation", "Controlled inputs"],
    parameters: [
      {
        name: "initialValues",
        type: "T",
        description: "Initial form values",
        required: true,
      },
      {
        name: "validate",
        type: "(values: T) => Partial<Record<keyof T, string>>",
        description: "Validation function",
        required: false,
      },
    ],
    returnValue: {
      type: "FormState<T>",
      description: "Form state and handlers",
    },
    bestPractices: ["Define validation schema upfront", "Handle all form fields consistently", "Use with TypeScript for type safety"],
    pitfalls: ["Over-validation causing performance issues", "Complex validation logic", "Memory leaks in validation"],
    examples: [
      {
        title: "Basic Form",
        description: "Simple form with validation",
        code: `export default function App() {
  const validate = (values) => {
    const errors = {};
    if (values.username.length < 3) {
      errors.username = 'Too short';
    }
    if (!values.email.includes('@')) {
      errors.email = 'Invalid email';
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      username: '',
      email: ''
    },
    validate
  );

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Username"
          value={values.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
        {errors.username && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.username}</div>
        )}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        {errors.email && (
          <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>
        )}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
}
`,
      },
    ],
    performance: ["Efficient form state updates", "Optimized validation timing", "Minimal re-renders"],
  },
];
