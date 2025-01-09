export default function ImagePicker({ onFilePicked }) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/heic'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = event.target.files;
    if (inputFiles && inputFiles.length > 0) {
      const selectedFiles = Array.from(inputFiles).filter((file: File) =>
        validFileTypes.includes(file.type),
      );
      onFilePicked(selectedFiles);

      if (selectedFiles.length !== inputFiles.length) {
        alert('Some files were not valid image types and were ignored!');
      }
    }
  };
  return (
    <div className="flex justify-center">
      <label className="mt-4 w-56 cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-center font-semibold text-white shadow-lg shadow-blue-500/40 hover:bg-blue-600">
        Select Photos
        <input
          type="file"
          accept="image/png, image/jpeg, image/heif"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}
