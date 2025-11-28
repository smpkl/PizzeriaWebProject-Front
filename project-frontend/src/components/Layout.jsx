// Jokaisessa näkymässä oleva runko (header ja footer)

import {Outlet} from 'react-router';

const Layout = () => (
  <div>
    <header>{/* Navigation bar, logo, etc. */}</header>
    <main>
      <Outlet /> {/* Child routes render here */}
    </main>
    <footer>{/* Footer content */}</footer>
  </div>
);
