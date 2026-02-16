# JSDoc Comment Templates

This file contains JSDoc templates for common React patterns used in the project.

## React Component (Functional)

```typescript
/**
 * [Brief one-line description of component]
 *
 * [Optional: Longer description with usage context]
 *
 * @param {Object} props - Component props
 * @param {string} props.paramName - Description of parameter
 * @param {('option1'|'option2')} [props.optionalParam='default'] - Optional parameter with default
 * @param {ReactNode} [props.children] - Child elements
 * @returns {JSX.Element} Rendered component
 *
 * @example
 * <ComponentName paramName="value" optionalParam="option1">
 *   <ChildComponent />
 * </ComponentName>
 */
export function ComponentName({ paramName, optionalParam = 'default', children }: Props) {
  // ...
}
```

## Button Component Example

```typescript
/**
 * Primary button component with multiple variants and sizes
 *
 * Provides consistent button styling across the application with support
 * for different visual styles, sizes, and states.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button text or content
 * @param {('primary'|'secondary'|'danger')} [props.variant='primary'] - Visual style variant
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Button size
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {() => void} [props.onClick] - Click handler function
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Rendered button element
 *
 * @example
 * // Primary button (default)
 * <Button onClick={handleClick}>Click Me</Button>
 *
 * @example
 * // Large danger button
 * <Button variant="danger" size="lg" onClick={handleDelete}>
 *   Delete Item
 * </Button>
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className
}: ButtonProps) {
  // Implementation...
}
```

## Custom Hook

```typescript
/**
 * Custom hook for [purpose]
 *
 * [Detailed description of what the hook does and when to use it]
 *
 * @param {Type} parameter - Description of parameter
 * @returns {Object} Hook return value
 * @returns {Type} return.propertyName - Description of returned property
 *
 * @example
 * const { data, loading, error } = useCustomHook(param);
 */
export function useCustomHook(parameter: Type) {
  // ...
}
```

## useLocalStorage Hook Example

```typescript
/**
 * Custom hook for persisting state in localStorage
 *
 * Synchronizes component state with localStorage, providing automatic
 * persistence across page reloads. Handles JSON serialization and
 * deserialization automatically.
 *
 * @template T
 * @param {string} key - localStorage key
 * @param {T} initialValue - Default value if key doesn't exist
 * @returns {[T, (value: T | ((prev: T) => T)) => void]} Current value and setter function
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 *
 * // Update theme
 * setTheme('dark');
 *
 * // Update with function
 * setTheme(prev => prev === 'light' ? 'dark' : 'light');
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Implementation...
}
```

## Utility Function

```typescript
/**
 * [Brief description of what function does]
 *
 * [Optional: More detailed explanation]
 *
 * @param {Type} paramName - Description
 * @returns {ReturnType} Description of return value
 *
 * @throws {ErrorType} When [condition]
 *
 * @example
 * const result = utilityFunction(param);
 */
export function utilityFunction(paramName: Type): ReturnType {
  // ...
}
```

## Format Date Utility Example

```typescript
/**
 * Formats a Date object or timestamp into a human-readable string
 *
 * Converts dates to a consistent format used throughout the application.
 * Handles both Date objects and Unix timestamps.
 *
 * @param {Date | number} date - Date object or Unix timestamp (milliseconds)
 * @param {string} [format='MMM DD, YYYY'] - Desired output format
 * @returns {string} Formatted date string
 *
 * @throws {Error} If date parameter is invalid
 *
 * @example
 * formatDate(new Date());
 * // Returns: "Jan 15, 2024"
 *
 * @example
 * formatDate(1705276800000, 'YYYY-MM-DD');
 * // Returns: "2024-01-15"
 */
export function formatDate(date: Date | number, format = 'MMM DD, YYYY'): string {
  // Implementation...
}
```

## Type Definition

```typescript
/**
 * [Description of the type/interface]
 *
 * @typedef {Object} TypeName
 * @property {Type} propertyName - Description
 * @property {Type} [optionalProperty] - Optional property description
 */
```

## Props Interface Example

```typescript
/**
 * Props for the Navigation component
 *
 * @interface NavigationProps
 * @property {Array<NavLink>} links - Navigation menu items
 * @property {boolean} [isMobileMenuOpen] - Whether mobile menu is visible
 * @property {() => void} [onMobileMenuToggle] - Mobile menu toggle handler
 * @property {string} [className] - Additional CSS classes
 */
export interface NavigationProps {
  links: NavLink[];
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
  className?: string;
}
```

## Context Provider

```typescript
/**
 * [Context Name] provider component
 *
 * Provides [describe what context provides] to child components.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component
 *
 * @example
 * <ContextProvider>
 *   <App />
 * </ContextProvider>
 */
export function ContextProvider({ children }: { children: ReactNode }) {
  // ...
}
```

## ThemeProvider Example

```typescript
/**
 * Theme provider component
 *
 * Provides theme context (light/dark mode) to all child components.
 * Persists theme preference to localStorage and applies appropriate
 * CSS classes to the document root.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @param {('light'|'dark')} [props.defaultTheme='light'] - Initial theme
 * @returns {JSX.Element} Provider component
 *
 * @example
 * <ThemeProvider defaultTheme="dark">
 *   <App />
 * </ThemeProvider>
 */
export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
  // Implementation...
}
```

## Page Component

```typescript
/**
 * [Page Name] page component
 *
 * [Description of what this page displays and its purpose]
 *
 * @route {string} /route-path
 * @returns {JSX.Element} Rendered page
 *
 * @example
 * // In router configuration
 * <Route path="/route-path" element={<PageName />} />
 */
export function PageName() {
  // ...
}
```

## Complex Type with Generics

```typescript
/**
 * Generic async data fetching hook
 *
 * @template T - Type of data being fetched
 * @param {() => Promise<T>} fetchFn - Async function that fetches data
 * @param {T} [initialData] - Initial data value
 * @returns {Object} Fetch state
 * @returns {T | undefined} returns.data - Fetched data
 * @returns {boolean} returns.loading - Whether data is loading
 * @returns {Error | null} returns.error - Error if fetch failed
 * @returns {() => void} returns.refetch - Function to trigger refetch
 */
export function useFetch<T>(fetchFn: () => Promise<T>, initialData?: T) {
  // ...
}
```

## Constant/Configuration Object

```typescript
/**
 * Application-wide configuration constants
 *
 * @constant {Object} APP_CONFIG
 * @property {string} API_URL - Base API endpoint URL
 * @property {number} REQUEST_TIMEOUT - Default request timeout in ms
 * @property {Object} PAGINATION - Pagination settings
 * @property {number} PAGINATION.DEFAULT_PAGE_SIZE - Items per page
 */
export const APP_CONFIG = {
  API_URL: import.meta.env.VITE_API_URL,
  REQUEST_TIMEOUT: 30000,
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
  },
} as const;
```

---

**Guidelines**:
1. Always include brief description on first line
2. Document all parameters with types
3. Include return type and description
4. Add @example for complex usage
5. Use @throws for error conditions
6. For React components, always show example usage
7. Use markdown formatting in descriptions where helpful
8. Keep descriptions concise but complete
9. Update JSDoc when code changes
