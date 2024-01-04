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

const parseColor = (icon) => {
  if (icon === "success") {
    return Colors.swalGreen;
  } else if (icon === "warning") {
    return Colors.swalYellow;
  } else if (icon === "error") {
    return Colors.swalRed;
  } else if (icon === "info") {
    return Colors.swalBlue;
  } else if (icon === "question") {
    return Colors.swalGrey;
  }
};

const parseIcon = (icon) => {
  return "swal-" + icon;
};

export const infoToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timerProgressBar: true,
    background: Colors.grey600,
    color: parseColor(icon),
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return Toast.fire({ icon, title });
};

export const InfoBtnToast = (icon, title, btnName, func, route = null) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timerProgressBar: true,
    background: Colors.grey600,
    color: parseColor(icon),
    customClass: {
      popup: "infoBtnToast-popup",
      actions: "infoBtnToast-actions",
    },
    didOpen: (toast) => {
      const button = document.createElement("button");
      button.textContent = btnName;
      button.className = "infoBtnToast-button";
      // button.setAttribute("data-color", parseColor(icon));
      button.style.setProperty("--custom-color", parseColor(icon));

      button.addEventListener("click", () => {
        if (route) {
          route();
        }
        func();
        Swal.close();
      });

      const actionsContainer = toast.querySelector(".infoBtnToast-actions");
      actionsContainer.appendChild(button);
    },
  });

  return Toast.fire({ icon, title });
};

export const timerToast = (icon, title) => {
  const timerToastSet = Swal.mixin({
    toast: true,
    position: "bottom-end",
    background: Colors.grey600,
    color: parseColor(icon),
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: true,
    customClass: {
      timerProgressBar: parseIcon(icon),
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return timerToastSet.fire({ icon, title });
};
