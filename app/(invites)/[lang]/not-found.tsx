import BackButton from '@components/Homepage/BackButton';
import { HStack } from '@components/UI/Components';

export default async function ErrorPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <HStack className="items-center space-x-5">
        <BackButton>Back</BackButton>
        <h3 className="font-bold">Error 404: This page does not exist.</h3>
      </HStack>
    </div>
  );
}
