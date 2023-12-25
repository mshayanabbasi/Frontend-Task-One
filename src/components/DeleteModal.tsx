import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import string from "../locales/string";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";
import { toast } from "react-toastify";
import { API_URL } from "../constants";

interface DeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  getUsers: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  setOpen,
  id,
  getUsers,
}: DeleteModalProps) => {
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const deleteUserHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const responseJson = await response.json();
      if (responseJson) {
        setLoading(false);
        setOpen(false);
        toast.success(string.userDeleteSuccessfully);
        getUsers();
      }
    } catch (error) {
      setLoading(false);
      toast.error(string.userDeleteFailed);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-transparent text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start sm:justify-between">
                    <div className="text-center sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {string.delete}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {string.areYouSureYouWantToDelete}
                        </p>
                      </div>
                    </div>
                    <div className="cursor-pointer">
                      <IoMdClose />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <Button
                    className="bg-[#F86B6C] p-3 rounded-md ml-4"
                    textClassName="text-white"
                    title={string.delete}
                    onClick={deleteUserHandler}
                    disabled={loading}
                  />
                  <Button
                    className="p-3 bg-c_19A7D8 rounded-md"
                    textClassName="text-white"
                    title={string.cancel}
                    onClick={() => setOpen(false)}
                    disabled={loading}
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

export default DeleteModal;
