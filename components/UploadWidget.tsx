'use client';

import React, { useContext, useEffect, useState } from 'react';
import ProgressView from '@components/Upload/ProgressView';
import { uploadFileWithPreview, FileUpload } from '@utils/Upload';
import RegisterActionButton from '@components/Authentication/RegisterActionButton';
import { addUploadToAlbum, getInvite } from '@utils/API';
import ImagePicker from '@components/Upload/ImagePicker';
import Spinner from '@components/UI/Spinner';
import { Button } from '@headlessui/react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { useParams } from 'next/navigation';
import { AuthStateContext } from 'provider/AuthStateProvider';
import NoVideoUploadAvailable from '@components/Warnings/NoVideoUpload';
import { HStack, VStack } from '@components//UI/Components';

enum State {
  Idle,
  Uploading,
  AllUploaded,
  UploadCompleted,
}

const strings = {
  finishButton: 'Finish',
  uploadSuccessfulMessage: 'Images have been uploaded!',
  phoneNumberExplanation: 'Verification phone number',
  uploaderName: 'Uploader name',
};

export default function UploadWidget() {
  const params = useParams();
  const [pickedFiles, setPickedFiles] = useState(Array<FileUpload>());
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [state, setState] = useState(State.Idle);
  const authState = useContext(AuthStateContext);

  const [albumId, setAlbumId] = useState<string | undefined>(undefined);
  const [batchId, setBatchId] = useState(crypto.randomUUID().toString().toUpperCase());

  function getAlbumId() {
    if (params.albumId) {
      const albumId: string = params.albumId as string;
      setAlbumId(albumId);
    } else if (params.inviteId) {
      const inviteId: string = params.inviteId as string;
      getInvite(inviteId).then((invite) => {
        setAlbumId(invite.group);
      });
    }
  }

  useEffect(() => {
    getAlbumId();
  }, []);

  const onFilePicked = (files: Array<File>) => {
    const fileList = files.map((file: File) => ({
      file,
      progress: 0,
      uploadId: crypto.randomUUID().toString().toUpperCase(),
    }));

    uploadFiles(fileList);
  };

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserName(event.target.value);
  };

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserPhone(event.target.value);
  };

  const completeUpload = async () => {
    const loadedAlbumId = albumId;
    if (!loadedAlbumId) {
      alert('Fatal Error: Album could not be determined!');
      return;
    }
    const last = pickedFiles[pickedFiles.length - 1];
    pickedFiles.forEach(async (upload) => {
      let item = await addUploadToAlbum(
        {
          batch: batchId,
          batchSize: pickedFiles.length,
          id: upload.uploadId,
          lastOfBatch: upload.uploadId == last.uploadId,
          originalFileName: upload.file.name,
        },
        loadedAlbumId,
      );
    });

    setState(State.UploadCompleted);
  };

  async function reset() {
    setPickedFiles([]);
    setBatchId(crypto.randomUUID().toString().toUpperCase());
    setState(State.Idle);
  }

  async function uploadFiles(pickedFiles: FileUpload[]) {
    if (!pickedFiles[0]) {
      alert('You must select at least one photo!');
    } else {
      setState(State.Uploading);
      pickedFiles.forEach(async (upload, index) => {
        await uploadFileWithPreview(upload, (progress) => {
          const newFiles = [...pickedFiles];
          newFiles[index].progress = progress;
          const allComplete = newFiles.find((upload) => upload.progress >= 100);
          if (allComplete) {
            setState(State.AllUploaded);
          }
          setPickedFiles(newFiles);
        });
      });
    }
  }

  const fileList = pickedFiles.length > 0 && (
    <div className="h-52 w-full overflow-x-hidden overflow-y-scroll rounded-xl">
      {pickedFiles.map((fileObj, index) => (
        <div key={index}>
          <ProgressView progress={fileObj.progress} title={fileObj.file.name} />
        </div>
      ))}
    </div>
  );

  const uploadView = (
    <VStack className="h-full items-start justify-center p-6">
      <NoVideoUploadAvailable />

      <p className="py-5 text-3xl font-semibold">Upload photos</p>

      {pickedFiles.length == 0 && <ImagePicker onFilePicked={onFilePicked} />}

      <VStack className="w-full items-end justify-center">
        {pickedFiles.length > 0 && (
          <button onClick={reset} className="rounded-sm text-sm text-slate-500 underline">
            Remove all
          </button>
        )}
        {fileList}
      </VStack>

      {state == State.Uploading && (
        <HStack className="my-4 items-center rounded-lg bg-slate-500 p-2 px-4 text-white">
          <Spinner />
          Uploading..
        </HStack>
      )}

      {!authState.userId && state != State.Idle && (
        <div className="my-3 flex flex-col">
          <p className="mt-3 text-xs font-semibold text-slate-600">{strings.uploaderName}</p>
          <input
            type="name"
            name="Test"
            placeholder="Your name"
            className="w-56 rounded border border-gray-300 px-2 py-1 text-sm"
            onChange={handleNameChange}
          />
          <p className="mt-3 text-xs font-semibold text-slate-600">
            {strings.phoneNumberExplanation}
          </p>
          <input
            type="tel"
            placeholder="+1 (XXX) XXX XX XX"
            className="w-56 rounded border border-gray-300 px-2 py-1 text-sm"
            onChange={handlePhoneChange}
          />
        </div>
      )}
      {state == State.AllUploaded && (
        <RegisterActionButton name={userName} phoneNumber={userPhone} action={completeUpload}>
          {strings.finishButton}
        </RegisterActionButton>
      )}
      {state == State.UploadCompleted && (
        <div className="w-full space-y-2" id="success">
          <div className="flex w-full justify-center">
            <p>{strings.uploadSuccessfulMessage}</p>
          </div>
        </div>
      )}
    </VStack>
  );

  if (state == State.UploadCompleted) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-3xl text-green-500 transition">
        <IoCheckmarkCircle size={128} className="" />
        Upload successful!
        <Button className="text-sm font-semibold text-slate-400" onClick={reset}>
          {' '}
          Upload more{' '}
        </Button>
      </div>
    );
  }
  return uploadView;
}
