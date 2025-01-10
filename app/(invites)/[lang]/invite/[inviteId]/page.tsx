import InvitePreview from '../../../InvitePreview';
import { InviteProps, getData } from '../../../Shared';
import { getDictionary } from '@old-utils/dictionary';

export default async function Page(props: InviteProps) {
  const fetchedData = await getData(props.params.inviteId);
  const dicts = await getDictionary(props.params.lang);
  return (
    <InvitePreview data={fetchedData} albumCardDict={dicts.albumCard} lang={props.params.lang} />
  );
}

export { generateMetadata } from '../../../Shared';
