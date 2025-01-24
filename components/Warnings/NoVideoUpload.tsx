import { HStack } from '@components/UI/Components';
import Disclosure from '@components/UI/Disclosure';
import { IoInformationCircleOutline } from 'react-icons/io5';

export default function NoVideoUploadAvailable() {
  return (
    <Disclosure
      title={
        <HStack className="text-sm/6 font-medium">
          <IoInformationCircleOutline size={22} className="mr-2 text-yellow-500" />
          Upload videos from app
        </HStack>
      }
    >
      <p>
        Video uploads are currently only from the apps. You can install the app both on iOS and
        Android.
      </p>
    </Disclosure>
  );
}
