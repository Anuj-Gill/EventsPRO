// Committees.jsx
import { NavbarAfterLogin } from './NavbarAfterLogin';
import bgImage from '../assets/bg.png';
import { CommitteesName } from './CommitteesName';

export default function Committees() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-12" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <NavbarAfterLogin />
      <div className="container mx-auto mt-16 -mt-1 w-5/6 px-4">
        <div className="mb-10 mt-12">
          <h1 className="text-white text-6xl font-bold">Hello, User!</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center"> {/* Added justify-center to center the grid */}
          {/* Committee names */}
          <CommitteesName name={"CSI"} />
          <CommitteesName name={"IEEE"} />
          <CommitteesName name={"ACM"} />
          <CommitteesName name={"ITSA"} />
          <CommitteesName name={"BMSA"} />
          <CommitteesName name={"CESA"} />
          <CommitteesName name={"ACM"} />
          <CommitteesName name={"NASA"} />
          <CommitteesName name={"CESA"} />
          <CommitteesName name={"ACM"} />
          <CommitteesName name={"NASA"} />
        </div>
      </div>
    </div>
  );
}
