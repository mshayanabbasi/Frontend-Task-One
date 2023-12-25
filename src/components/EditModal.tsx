import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import string from "../locales/string";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { TiCancel } from "react-icons/ti";
import Input from "./Input";

interface EditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  setOpen,
}: EditModalProps) => {
  const cancelButtonRef = useRef(null);

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
                        {string.editUser}
                      </Dialog.Title>
                    </div>
                    <div className="cursor-pointer">
                      <IoMdClose />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 my-4">
                    <div className="col-span-6">
                      <div>
                        <Input
                          value=""
                          onChange={() => {}}
                          placeholder={string.name}
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown />
                      </div>
                      <div className="w-full mt-4 -z-10">
                        <Dropdown />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown />
                      </div>
                    </div>
                    <div className="col-span-6">
                      <Input
                        value=""
                        onChange={() => {}}
                        placeholder={string.email}
                        type="email"
                      />
                      <div className="w-full mt-4">
                        <Input
                          value=""
                          className="w-full"
                          onChange={() => {}}
                          placeholder={string.experience}
                          type="date"
                        />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown />
                      </div>
                      <div className="w-full mt-4">
                        <Dropdown />
                      </div>
                      <div className="w-full mt-4">
                        <textarea
                          className="p-2 border border-gray-400 rounded w-full"
                          value=""
                          onChange={() => {}}
                          placeholder={string.description}
                          maxLength={200}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    icon={<TiCancel size={20} color="white" />}
                    className="bg-[#F86B6C] p-3 rounded-md ml-4 flex items-center"
                    textClassName="text-white"
                    title={string.cancel}
                    onClick={() => setOpen(false)}
                  />
                  <Button
                    className="p-3 bg-c_19A7D8 rounded-md"
                    textClassName="text-white"
                    title={string.submit}
                    onClick={() => setOpen(false)}
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

export default EditModal;
