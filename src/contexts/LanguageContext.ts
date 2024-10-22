import { createContext } from 'react';

interface LanguageContextType {
  language: string;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'English',
  translate: (key: string) => key,
});

export default LanguageContext;