import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import string from "../locales/string";
import { IoMdClose } from "react-icons/io";
import Dropdown from "./Dropdown";
import Input from "./Input";
import {
  CITIES,
  COUNTRY,
  EMAIL_VERIFIED,
  GENDER,
  PROFESSION,
  STATUS,
} from "../constants";
import { Users } from "../types/user.types";

interface EditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: Users;
}

const ViewModal: React.FC<EditModalProps> = ({
  open,
  setOpen,
  user,
}: EditModalProps) => {
  const cancelButtonRef = useRef(null);
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

  useEffect(() => {
    if (user) {
      setState((prev) => ({
        ...prev,
        name: user.name,
        gender: user.gender,
        status: user.status,
        profession: user.profession,
        city: user.city,
        country: user.country,
        description: user.description,
        email: user.email,
        emailVerified: user.emailVerified,
        dob: user.dob,
      }));
    }
  }, [user]);

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
                        {string.viewUser}
                      </Dialog.Title>
                    </div>
                    <div
                      className="cursor-pointer"
                      // onClick={() => setOpen(false)}
                    >
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
                          disabled
                          placeholder={string.name}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={GENDER}
                          id="gender"
                          placeholder={string.selectGender}
                          value={state.gender}
                          disabled
                          onChange={() => {}}
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={EMAIL_VERIFIED}
                          id="emailVerified"
                          placeholder={string.selectEmailVerified}
                          value={state.emailVerified}
                          disabled
                          onChange={() => {}}
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={STATUS}
                          id="status"
                          placeholder={string.selectStatus}
                          value={state.status}
                          disabled
                          onChange={() => {}}
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={CITIES}
                          id="city"
                          placeholder={string.selectCity}
                          value={state.city}
                          disabled
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                    <div className="col-span-6">
                      <Input
                        value={state.email}
                        className="w-full"
                        disabled
                        onChange={() => {}}
                        placeholder={string.email}
                        type="email"
                      />
                      <div className="w-full mt-4">
                        <Input
                          value={state.dob}
                          className="w-full"
                          disabled
                          onChange={() => {}}
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
                          disabled
                          onChange={() => {}}
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown
                          options={COUNTRY}
                          id="country"
                          placeholder={string.selectCountry}
                          value={state.country}
                          disabled
                          onChange={() => {}}
                        />
                      </div>
                      <div className="w-full mt-4">
                        <textarea
                          className="p-2 border border-gray-400 rounded w-full"
                          value={state.description}
                          disabled
                          onChange={() => {}}
                          placeholder={string.description}
                          maxLength={200}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ViewModal;
