import { IoCheckmarkCircle } from 'react-icons/io5';

export default function ProgressView({ title, progress }: { title: string; progress: number }) {
  return (
    <div className="my-2 flex h-10 items-center justify-between rounded bg-slate-100 p-3">
      <p className="text-sm">{title}</p>
      {progress === 100 && <IoCheckmarkCircle className="text-xl text-green-500" />}
      {progress !== 100 && <progress className="w-24 bg-black" value={progress} max="100" />}
    </div>
  );
}
