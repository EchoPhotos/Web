import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { storage, auth } from "../firebase-config";

const UploadWidget = () => {
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showFileInput, setShowFileInput] = useState(true);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [vid, setVid] = useState("");

  const validFileTypes = ["image/jpeg", "image/png", "image/heic"];

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter((file: File) =>
        validFileTypes.includes(file.type)
      ).map((file: File) => ({
        file,
        progress: 0
      }));

      if (selectedFiles.length !== e.target.files.length) {
        setUploadError('Some files were not valid image types.');
      } else {
        setUploadError('');
      }

      setFiles(selectedFiles);
    }
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setUserPhone(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handlePhone: SubmitHandler<FormData> = async (data) => {
    if (userName == "") {
      setUploadError("Please Enter a Name");
    } else if (userPhone == "") {
      setUploadError("Please Enter a Phone Number");
    } else {
      const phoneNumber = userPhone;

      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
      });

      try {
        const confirmationResult: any = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier
        );

        const data = {
          verificationId: confirmationResult.verificationId,
          phoneNumber: phoneNumber,
        };
        setVid(confirmationResult.verificationId);
        setShowPhoneInput(false);
        setShowOtpInput(true);
        setUploadError("");
      } catch (error: any) {
        console.error(error);
        setUploadError(
          "Sorry, we couldn't verify this information. Please try again later."
        );
      }
    }
  };

  const handleOtp: SubmitHandler<FormData> = async (data) => {
    if (otp == "") {
      setUploadError("Please Enter a valid OTP");
    } else {
      const credential = PhoneAuthProvider.credential(vid, otp);

      try {
        const signin: any = await signInWithCredential(auth, credential);
        console.log(signin.user.accessToken);
        // TODO: Set user name and album upload trigger
        setShowOtpInput(false);
        setShowSuccess(true);
        setUploadError("");
      } catch (error: any) {
        console.log(error);
        if (error.message == "INVALID_CODE") {
          setUploadError(
            "Sorry, we couldn't verify this information.  Check you are entering the correct code."
          );
        } else {
          setUploadError(
            "Sorry, we couldn't verify this information. Please try again later."
          );
        }
      }
    }
  };

  const handleUpload = () => {
    if (!files[0]) {
      setUploadError("Please add some files to be uploaded.");
    } else {
      const urls = [];
      setUploadError("");

      files.forEach((fileObj, index) => {
        const { file } = fileObj;
        const storageRef = ref(storage, `anon-uploads/test/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const newFiles = [...files];
            newFiles[index].progress = progress;
            setFiles(newFiles);
          },
          (error) => {
            console.error("Upload error: ", error);
            setUploadError("Something went wrong, please try again later.");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              urls.push(downloadURL);
              if (urls.length === files.length) {
                console.log("All files uploaded:", urls);
                setDownloadURLs(urls);
                setShowFileInput(false);
                setShowPhoneInput(true);
              }
            });
          }
        );
      });
    }
  };

  const fileList = files.length > 0 && (
    <div className="w-[95%] h-[200px] overflow-y-scroll overflow-x-hidden pl-7">
      {files.map((fileObj, index) => (
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
    <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-lg h-[400px] w-[300px] sm:w-[300px]">
      <div id="recaptcha"></div>

      {showFileInput && (
        <div id="file-input">
          <div className="flex justify-center w-full">
            <label className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer block">
              + Add files
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
          {fileList}
          <div className="flex justify-center w-full">
            <button
              className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>
      )}

      {showPhoneInput && (
        <div className="space-y-2 w-full" id="phone-input">
          <p>Name:</p>
          <input
            type="text"
            placeholder="Eg: John Doe"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            onChange={handleNameChange}
          />
          <p>Confirm Phone Number:</p>
          <input
            type="tel"
            placeholder="Eg: +44 7234 543289"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            onChange={handlePhoneChange}
          />
          {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
          <div className="flex justify-center w-full">
            <button
              className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit(handlePhone)}
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {showOtpInput && (
        <div className="space-y-2 w-full" id="otp-input">
          <p>Enter the OTP:</p>
          <input
            type="text"
            placeholder="Eg: 123456"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
            onChange={handleOtpChange}
          />
          {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
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
