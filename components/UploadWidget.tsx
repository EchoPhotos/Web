"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  ConfirmationResult,
  UserCredential,
} from "firebase/auth";
import { storage, auth } from "../app/firebase-config";

interface Upload {
  file: File,
  progress: number
}

const UploadWidget = () => {
  const noUploads: Upload[] = []
  const [uploadingFiles, setFiles] = useState(noUploads);
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [vid, setVid] = useState("");
  const router = useRouter()


  const validFileTypes = ["image/jpeg", "image/png", "image/heic"];

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = event.target.files;
    if (inputFiles && inputFiles.length > 0) {
      const selectedFiles = Array.from(inputFiles)
        .filter((file: File) => validFileTypes.includes(file.type))
        .map((file: File) => ({
          file,
          progress: 0,
        }));

      if (selectedFiles.length !== inputFiles.length) {
        setErrorMessage("Some files were not valid image types.");
      } else {
        setErrorMessage("");
      }

      setFiles(selectedFiles);
      uploadFiles();
    }
  };

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserName(event.target.value);
  };

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserPhone(event.target.value);
  };

  const handleOtpChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setOtp(event.target.value);
  };

  const handlePhone: SubmitHandler<FormData> = async (_) => {
    if (uploadingFiles.length == 0) {
      setErrorMessage("Please add photos");
    } else if (userName == "") {
      setErrorMessage("Please Enter a Name");
    } else if (userPhone == "") {
      setErrorMessage("Please Enter a Phone Number");
    } else {
      const phoneNumber = userPhone;

      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });

      try {
        const confirmationResult: ConfirmationResult =
          await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);

        setVid(confirmationResult.verificationId);
        setShowOtpInput(true);
        setErrorMessage("");
      } catch (error: any) {
        console.error(error);
        setErrorMessage(
          "Sorry, we couldn't verify this information. Please try again later."
        );
      }
    }
  };

  const handleOtp: SubmitHandler<FormData> = async (_) => {
    if (otp == "") {
      setErrorMessage("Please Enter a valid OTP");
    } else {
      const credential = PhoneAuthProvider.credential(vid, otp);

      try {
        const signin: UserCredential = await signInWithCredential(
          auth,
          credential
        );
        const token = await signin.user.getIdToken();
        console.log(token);
        // TODO: Set user name and album upload trigger

        registerUsername(userName, token, "https://www.echophotos.io");
        addUploadsToAlbum(
          uploadingFiles.map((upload) => upload.file.name),
          // router.
          "ablumId",
          "inviteId"
        );
        
        setShowOtpInput(false);
        setShowSuccess(true);
        setErrorMessage("");
      } catch (error: any) {
        console.log(error);
        if (error.message == "INVALID_CODE") {
          setErrorMessage(
            "Sorry, we couldn't verify this information.  Check you are entering the correct code."
          );
        } else {
          setErrorMessage(
            "Sorry, we couldn't verify this information. Please try again later."
          );
        }
      }
    }
  };

  async function registerUsername(
    userName: string,
    token: string,
    domain: string
  ) {
    console.log(`POST to ${domain}/users`, { name: userName }, token);
  }

  async function addUploadsToAlbum(
    files: string[],
    album: string,
    invite?: string
  ) {
    fetch('https://mywebsite.example/endpoint/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })
})
    console.log(`POST to ${files}/users`, { name: userName });
  }

  async function uploadFiles() {
    if (!uploadingFiles[0]) {
      setErrorMessage("Please select photos!");
    } else {
      const urls: string[] = [];
      setErrorMessage("");

      uploadingFiles.forEach((fileObj, index) => {
        const { file } = fileObj;
        const storageRef = ref(storage, `anon-uploads/test/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const newFiles = [...uploadingFiles];
            newFiles[index].progress = progress;
            setFiles(newFiles);
          },
          (error) => {
            console.error("Upload error: ", error);
            setErrorMessage("Something went wrong, please try again later.");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              urls.push(downloadURL);
              if (urls.length === uploadingFiles.length) {
                console.log("All files uploaded:", urls);
              }
            });
          }
        );
      });
    }
  };

  const fileList = uploadingFiles.length > 0 && (
    <div className="w-[95%] h-100 overflow-y-scroll overflow-x-hidden pl-7">
      {uploadingFiles.map((fileObj, index) => (
        <div
          key={index}
          className="flex justify-between items-center mt-2 mb-2 p-2.5 my-2.5 mx-2"
        >
          <p className="pr-10 text-[12px] leading-3">{fileObj.file.name}</p>
          <progress
            className="w-[60px]"
            value={fileObj.progress}
            max="100"
          ></progress>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-800 border border-gray-200 rounded-lg h-[400px] w-[300px] sm:w-[300px]">
      <div id="recaptcha"></div>

      <div id="file-and-profile-input">
        <div className="flex justify-center w-full">
          <label className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer block">
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
        {fileList}
        {!showOtpInput && (
          <div>
            Uploader name
            <input
              type="name"
              name="Test"
              placeholder="Your name"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              onChange={handleNameChange}
            />
            Send from
            <input
              type="tel"
              placeholder="+1 (XXX) XXX XX XX"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
              onChange={handlePhoneChange}
            />
            <p className="text-xs text-gray-300">To avoid spam, each upload needs a sender phone number.</p>
            <div className="flex justify-center w-full">
              <button
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-grabbing"
                onClick={handleSubmit(handlePhone)}
              >
                Send
              </button>
            </div>
          </div>
        )}
        {showOtpInput && (
          <div className="space-y-2 w-full" id="otp-input">
            <p>Enter the OTP:</p>
            <input
              type="text"
              autoComplete="one-time-code"
              placeholder="123456"
              className="w-full"
              onChange={handleOtpChange}
            />
            <div className="flex justify-center w-full">
              <button
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit(handleOtp)}
              >
                Verify
              </button>
            </div>
          </div>
        )}
        {errorMessage && (
          <p className="text-sm flex justify-center w-full text-red-500">
            {errorMessage}
          </p>
        )}
      </div>

      {showSuccess && (
        <div className="space-y-2 w-full" id="success">
          <div className="flex justify-center w-full">
            <p>Images have been uploaded!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
