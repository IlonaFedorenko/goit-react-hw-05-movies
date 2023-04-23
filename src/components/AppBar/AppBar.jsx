import { Header, NavItem } from './AppBar.module.js';

const navItem = [
  { href: '', text: 'Home' },
  { href: 'movies', text: 'Movies' },
];

export const AppBar = () => {
  return (
    <Header>
      {navItem.map(({ href, text }) => (
        <NavItem to={href} key={text}>
          {text}
        </NavItem>
      ))}
    </Header>
  );
};
