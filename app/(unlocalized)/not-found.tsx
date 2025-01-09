import BackButton from "@old-components/BackButton";
import { getDictionary } from "@old-utils/dictionary";


export default async function ErrorPage() {
  const dicts = await getDictionary("en");
  const dict = dicts.wedding;

  return (
      <>
        {
          <div className="flex justify-center items-center text-center h-96 flex-col">
            <h1 className="font-bold mb-4 text-5xl">
              {dict["error-message"]}
            </h1>

            <BackButton>{dict["go-back"]}</BackButton>
          </div>
        }
      </>
  );
}
