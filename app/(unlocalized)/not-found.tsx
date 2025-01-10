import BackButton from '@components/Homepage/BackButton';
import { getDictionary } from '@old-utils/dictionary';

export default async function ErrorPage() {
  const dicts = await getDictionary('en');
  const dict = dicts.wedding;

  return (
    <>
      {
        <div className="flex h-96 flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-5xl font-bold">{dict['error-message']}</h1>

          <BackButton>{dict['go-back']}</BackButton>
        </div>
      }
    </>
  );
}
