import { Button } from '@headlessui/react';
import {
  IoCopyOutline,
  IoLogoWhatsapp,
  IoMailOutline,
  IoPhonePortraitOutline,
  IoShareOutline,
} from 'react-icons/io5';

export function ShareViaWhatsApp({ message }) {
  return (
    <a
      className="my-1 w-16 rounded-md bg-green-50 px-4 py-1 text-center text-slate-800 transition hover:bg-slate-700 hover:text-green-400 hover:shadow-2xs hover:shadow-green-400"
      href={`https://api.whatsapp.com/send?text=${encodeURI(message)}`}
    >
      <div className="justify-top my-2 flex flex-col items-center px-2 text-center text-[10px]">
        <IoLogoWhatsapp className="mb-1 text-xl" />
        Share via WhatsApp
      </div>
    </a>
  );
}

export function ShareViaSMS({ message }) {
  return (
    <a
      className="my-1 w-16 rounded-md bg-yellow-50 px-4 py-1 text-center text-slate-800 transition hover:bg-slate-700 hover:text-yellow-400 hover:shadow-2xs hover:shadow-yellow-400"
      href={`sms:?body=${encodeURIComponent(message)}`}
    >
      <div className="justify-top my-2 flex flex-col items-center px-2 text-center text-[10px]">
        <IoPhonePortraitOutline className="mb-1 text-xl" />
        Share via SMS
      </div>
    </a>
  );
}

export interface ShareMenuData {
  title: string;
  text: string;
  url: string;
}

export function ShareViaMenu({ data }: { data: ShareMenuData }) {
  return (
    <Button
      className="my-1 w-16 rounded-md bg-slate-50 px-4 py-1 text-center text-slate-800 transition hover:bg-slate-700 hover:text-gray-50 hover:shadow-2xs hover:shadow-gray-500"
      onClick={() => {
        navigator.share(data);
      }}
    >
      <div className="justify-top my-2 flex flex-col items-center px-2 text-center text-[10px]">
        <IoShareOutline className="mb-1 text-xl" />
        Share via ...
      </div>
    </Button>
  );
}

export function ShareViaMail({ message }) {
  return (
    <a
      className="my-1 w-16 rounded-md bg-red-50 px-4 py-1 text-center text-slate-800 transition hover:bg-slate-700 hover:text-red-400 hover:shadow-2xs hover:shadow-red-400"
      href={`mailto:?body=${encodeURIComponent(message)}`}
    >
      <div className="justify-top my-2 flex flex-col items-center px-2 text-center text-[10px]">
        <IoMailOutline className="mb-1 text-xl" />
        Share via Mail
      </div>
    </a>
  );
}

export function ShareViaCopy({ message }) {
  const onClick = () => {
    navigator.clipboard.writeText(message).then(() => {
      alert(`Copied "${message}"!`);
    });
  };

  return (
    <Button
      onClick={onClick}
      className="my-1 w-16 rounded-md bg-blue-50 px-4 py-1 text-center text-slate-800 transition hover:bg-slate-700 hover:text-blue-400 hover:shadow-2xs hover:shadow-blue-400"
    >
      <div className="justify-top my-2 flex flex-col items-center px-2 text-center text-[10px]">
        <IoCopyOutline className="mb-1 text-xl" />
        Copy to pasteboard
      </div>
    </Button>
  );
}
