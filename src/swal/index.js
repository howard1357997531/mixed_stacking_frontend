import Swal from "sweetalert2";
import { Colors } from "../styles/theme";
import "./index.css";

export const basicSwal = (icon, title, background) => {
  return Swal.fire({
    icon: icon,
    title: title,
    background: background,
  });
};

// .then((result) => {if (result.isConfirmed) {}});
export const confirmSwal = (title, text = "") => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    background: "#a1887f",
    showCancelButton: true,
    confirmButtonColor: "#7066e0",
    cancelButtonColor: "#d33",
    confirmButtonText: "確定",
    cancelButtonText: "返回",
  });
};

export const confirmSwal2 = (title, text) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    background: "#a1887f",
    showCancelButton: true,
    confirmButtonColor: "#7066e0",
    cancelButtonColor: Colors.grey600,
    confirmButtonText: "確定",
    cancelButtonText: "稍後",
  });
};

export const timerSwal = (icon, title, background, timer) => {
  return Swal.fire({
    position: "center",
    width: "16em",
    icon: icon,
    title: title,
    background: background,
    showConfirmButton: false,
    timer: timer,
  });
};

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  background: Colors.greyTextBlood,
  color: Colors.swalRed,
  showConfirmButton: false,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const infoToast = (icon, title) => {
  return Toast.fire({ icon, title });
};

export const timerToast = (icon, title) => {
  if (icon === "success") {
    var cumColor = "swal-success";
  }
  const timerToastSet = Swal.mixin({
    toast: true,
    position: "bottom-end",
    background: Colors.greyTextBlood,
    color: Colors.swalGreen,
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: true,
    customClass: {
      timerProgressBar: cumColor,
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return timerToastSet.fire({ icon, title });
};
