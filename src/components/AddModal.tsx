import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import string from "../locales/string";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { TiCancel } from "react-icons/ti";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import {
  API_URL,
  CITIES,
  COUNTRY,
  EMAIL_VERIFIED,
  GENDER,
  PROFESSION,
  STATUS,
} from "../constants";
import { toast } from "react-toastify";

interface AddModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  getUsers: () => void;
}

const AddModal: React.FC<AddModalProps> = ({
  open,
  setOpen,
  getUsers,
}: AddModalProps) => {
  const cancelButtonRef = useRef(null);
  //   const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    // profilePicture: null,
    name: "",
    gender: "",
    emailVerified: "",
    status: "",
    city: "",
    email: "",
    dob: "",
    country: "",
    profession: "",
    description: "",
  });

  const handleChangeFunc = (value: string, key: string) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addUserHandler = async () => {
    setLoading(true);
    try {
      const payload = {
        id: uuidv4(),
        ...state,
      };
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseJson = await response.json();
      if (responseJson) {
        setLoading(false);
        setOpen(false);
        toast.success(string.postAddedSuccessfully);
        getUsers();
      }
    } catch (error) {
      setLoading(false);
      toast.error(string.postAddedFailed);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-c_121516 bg-opacity-20 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-transparent text-left transition-all sm:my-8 ">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start sm:justify-between">
                    <div className="text-center sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {string.addUser}
                      </Dialog.Title>
                    </div>
                    <div className="cursor-pointer">
                      <IoMdClose />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 my-4">
                    <div className="col-span-6">
                      {/* <div>
                        <Input
                          onChange={() => {}}
                          // @ts-ignore
                          ref={fileRef}
                          type="file"
                          hidden
                        />
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => fileRef?.current?.click()}
                        >
                          <div className="border-dotted p-3 border border-gray-500 rounded">
                            <FaCamera size={30} />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="text-base text-gray-400 font-normal ml-4">
                              {
                                string.dragAndDropYourPictureHereOrBrowseToUpload
                              }
                            </span>
                            <span className="text-base text-gray-400 font-normal ml-4">
                              {string.browseToUpload}
                            </span>
                          </div>
                        </div>
                      </div> */}
                      <div className="w-full mt-4">
                        <Input
                          value={state.name}
                          className="w-full"
                          onChange={(e) =>
                            handleChangeFunc(e.target.value, "name")
                          }
                          placeholder={string.name}
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={GENDER}
                          id="gender"
                          placeholder={string.selectGender}
                          value={state.gender}
                          onChange={(value) =>
                            handleChangeFunc(value, "gender")
                          }
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={EMAIL_VERIFIED}
                          id="emailVerified"
                          placeholder={string.selectEmailVerified}
                          value={state.emailVerified}
                          onChange={(value) =>
                            handleChangeFunc(value, "emailVerified")
                          }
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={STATUS}
                          id="status"
                          placeholder={string.selectStatus}
                          value={state.status}
                          onChange={(value) =>
                            handleChangeFunc(value, "status")
                          }
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={CITIES}
                          id="city"
                          placeholder={string.selectCity}
                          value={state.city}
                          onChange={(value) => handleChangeFunc(value, "city")}
                        />
                      </div>
                    </div>
                    <div className="col-span-6">
                      <Input
                        value={state.email}
                        className="w-full"
                        onChange={(e) =>
                          handleChangeFunc(e.target.value, "email")
                        }
                        placeholder={string.email}
                        type="email"
                      />
                      <div className="w-full mt-4">
                        <Input
                          value={state.dob}
                          className="w-full"
                          onChange={(e) =>
                            handleChangeFunc(e.target.value, "dob")
                          }
                          placeholder={string.dob}
                          type="date"
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={PROFESSION}
                          id="profession"
                          placeholder={string.selectProfession}
                          value={state.profession}
                          onChange={(value) =>
                            handleChangeFunc(value, "profession")
                          }
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={COUNTRY}
                          id="country"
                          placeholder={string.selectCountry}
                          value={state.country}
                          onChange={(value) =>
                            handleChangeFunc(value, "country")
                          }
                        />
                      </div>
                      <div className="w-full mt-4">
                        <textarea
                          className="p-2 border border-gray-400 rounded w-full"
                          value={state.description}
                          onChange={(e) =>
                            handleChangeFunc(e.target.value, "description")
                          }
                          placeholder={string.description}
                          maxLength={200}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    icon={<TiCancel size={20} color="white" />}
                    className="bg-[#F86B6C] p-3 rounded-md ml-4 flex items-center"
                    textClassName="text-white"
                    title={string.cancel}
                    disabled={loading}
                    onClick={() => setOpen(false)}
                  />
                  <Button
                    className="p-3 bg-c_19A7D8 rounded-md"
                    textClassName="text-white"
                    title={string.submit}
                    disabled={loading}
                    onClick={addUserHandler}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddModal;
