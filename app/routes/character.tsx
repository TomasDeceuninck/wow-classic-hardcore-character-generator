import { Outlet } from 'react-router';

function CharacterLayout() {
  return (
    <section>
      <h1>Character Details</h1>
      <Outlet />  {/* Child routes will render here */}
    </section>
  )
}

export default CharacterLayout;