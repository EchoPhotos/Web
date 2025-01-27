import AlbumPreview from '../../../AlbumPreview';
import { InviteProps, getData } from '../../../Shared';
import { getDictionary } from '@utils//dictionary';

export default async function Page(props: InviteProps) {
  const fetchedData = await getData(props.params.inviteId);
  const dicts = await getDictionary(props.params.lang);
  return (
    <AlbumPreview data={fetchedData} albumCardDict={dicts.albumCard} lang={props.params.lang} />
  );
}

export { generateMetadata } from '../../../Shared';
