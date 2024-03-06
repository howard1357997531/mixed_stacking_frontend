import Swal from "sweetalert2";
import { Colors } from "../styles/theme";
import "./index.css";

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

export const basicSwal = (icon, title) => {
  return Swal.fire({
    icon: icon,
    title: title,
    color: parseColor(icon),
    background: Colors.swalBlack,
    customClass: {
      popup: "swal-popup",
      confirmButton: "swal-btn",
    },
  });
};

// .then((result) => {if (result.isConfirmed) {}});
export const confirmSwal = (title, text = "") => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    color: parseColor("warning"),
    background: Colors.swalBlack,
    showCancelButton: true,
    cancelButtonColor: Colors.grey400,
    confirmButtonText: "確定",
    cancelButtonText: "返回",
    customClass: {
      popup: "swal-popup",
      htmlContainer: "swal-html-container",
      confirmButton: "swal-btn",
      cancelButton: "swal-btn",
    },
  });
};

export const confirmSwal2 = (title, text = "") => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    color: parseColor("warning"),
    background: Colors.red800,
    showCancelButton: true,
    confirmButtonColor: Colors.blue500,
    cancelButtonColor: Colors.grey400,
    confirmButtonText: "確定",
    cancelButtonText: "返回",
    customClass: {
      popup: "swal-popup",
      htmlContainer: "swal-html-container",
      confirmButton: "swal-btn2-confirm",
      cancelButton: "swal-btn2-cancel",
    },
  });
};

export const standBySwal = (title, text = "") => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    color: parseColor("warning"),
    background: Colors.swalBlack,
    showCancelButton: true,
    cancelButtonColor: Colors.darkGreenHover,
    confirmButtonText: "確定",
    cancelButtonText: "稍等",
    customClass: {
      popup: "swal-popup",
      htmlContainer: "swal-html-container",
      confirmButton: "swal-btn",
      cancelButton: "swal-standby-btn",
    },
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
