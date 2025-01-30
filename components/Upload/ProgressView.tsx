import { HStack } from '@components/UI/Components';
import { IoCheckmarkCircle } from 'react-icons/io5';

export default function ProgressView({ title, progress }: { title: string; progress: number }) {
  return (
    <HStack className="my-2 h-10 items-center justify-between space-x-4 rounded-xs bg-slate-100 p-3">
      <p className="w-full overflow-scroll text-sm font-semibold text-slate-400">{title}</p>
      {progress === 100 && <IoCheckmarkCircle className="text-xl text-green-500" />}
      {progress !== 100 && <progress className="w-full" value={progress} max="100" />}
      {/* <Button onClick={onDelete}>
        <div className='bg-white bg-opacity-50 text-red-400 hover:bg-red-400 hover:text-white rounded-xs font-semibold px-2'>Delete</div>
      </Button> */}
    </HStack>
  );
}
