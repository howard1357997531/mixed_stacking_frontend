import Swal from "sweetalert2";

export const basicSwal = (icon, title, background) => {
  return Swal.fire({
    icon: icon,
    title: title,
    background: background,
  });
};

export const confirmSwal = (title, text, icon, background) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    background: background,
    showCancelButton: true,
    confirmButtonColor: "#7066e0",
    cancelButtonColor: "#d33",
    confirmButtonText: "確定",
    cancelButtonText: "返回",
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
