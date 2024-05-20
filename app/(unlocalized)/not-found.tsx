import BackButton from "@/components/BackButton";

const dictionary = async () =>
  import("../../locales/en/404.json").then(
    (module) => module.default
  );


export default async function ErrorPage() {
  const dict = await dictionary();

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
