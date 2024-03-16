import { createRoot } from 'react-dom/client';
import MainApp from "./App";
test('renders without crashing', () => {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<MainApp tab="home" />);
  root.unmount();
});