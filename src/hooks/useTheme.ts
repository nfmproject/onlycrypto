import { createContext, useContext, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '../state/themeStates/themeStates';

export const useThemeContext = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  function toggleTheme() {
    if (theme === 'Dark') setTheme('Light');
    else setTheme('Dark');
    document.body.classList.value = 'transition-colors ease-in-out duration-200';
    document.body.classList.add(`theme${theme}`);
  }
  return { toggleTheme };
};
