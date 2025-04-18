import Image from 'next/image';
import appIcon from '@images/AppIcon300.png';

export default function Logo() {
  return (
    <div className="flex items-center p-1 md:w-auto md:space-x-1 md:ps-6">
      <div className="w-8 md:w-auto">
        <Image src={appIcon} alt="Logo" width="60" height="60" />
      </div>
      <div
        className="text-start text-xs font-extralight md:text-2xl md:leading-6"
        style={{ fontFamily: 'helvetica, sans' }}
      >
        <p>Echo</p>
        <p>Photos</p>
      </div>
    </div>
  );
}
