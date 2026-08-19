import React, { FC } from "react";
import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
  refetch?: any;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  refetch,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[92%] max-w-[390px]
          max-h-[90vh]
          overflow-y-auto
          bg-white dark:bg-[#0c0b12]
          border border-slate-200/80 dark:border-white/10
          rounded-2xl
          shadow-[0_25px_80px_-20px_rgba(0,0,0,0.45)]
          outline-none
          p-5 sm:p-6
        "
      >
        <Component
          setOpen={setOpen}
          setRoute={setRoute}
          refetch={refetch}
        />
      </Box>
    </Modal>
  );
};

export default CustomModal;