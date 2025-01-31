import AlbumPreview from '../../../AlbumPreview';
import { InviteProps, getData } from '../../../Shared';
import { getDictionary } from '@utils/dictionary';

export default async function Page(props: InviteProps) {
  const params = props.params;
  const fetchedData = await getData(params.inviteId);
  const dicts = await getDictionary(params.lang);
  return <AlbumPreview data={fetchedData} albumCardDict={dicts.albumCard} lang={params.lang} />;
}

export { generateMetadata } from '../../../Shared';
