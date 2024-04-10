import { NavbarAfterLogin } from './NavbarAfterLogin';
import bgImage from '../assets/bg.png';

export default function EventHeadHome() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-12"
      style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
    >
      <NavbarAfterLogin />
    
    </div>
  );
}