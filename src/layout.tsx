import { ReactNode } from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeSwitcher />
      <main>{children}</main>
    </>
  );
};

export default Layout;
