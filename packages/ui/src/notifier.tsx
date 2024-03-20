import * as Burnt from "burnt";
import { AlertOptions, ToastOptions } from "burnt/build/types";

const toast = (options: ToastOptions) => {
  return Burnt.toast({ haptic: "success", ...options });
};

const alert = (options: AlertOptions) => {
  return Burnt.alert({ ...options });
};

const successToast = (options: Omit<ToastOptions, "preset">) => {
  const { haptic = "success", ...rest } = options;
  return toast({ preset: "done", haptic, ...rest });
};
const errorToast = (options: Omit<ToastOptions, "preset">) => {
  const { haptic = "error", ...rest } = options;
  return toast({ preset: "error", haptic, ...rest });
};

export const Notifier = {
  toast,
  alert,
  successToast,
  errorToast,
};
