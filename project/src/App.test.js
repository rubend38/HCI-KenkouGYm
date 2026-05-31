import { render, screen } from '@testing-library/react';
import App from './App';
import MainMenu from './MainMenu';

test('renders learn react link', () => {
  render(<App />);
  render(<MainMenu />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
