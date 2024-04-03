const open = document.getElementById("open");
const close = document.getElementById("close1");
const modal = document.querySelector(".modal");

open.onclick = () => {
  modal.style.display = "flex";
};
close.onclick = () => {
  modal.style.display = "none"; // 버튼을 누르면 화면을 숨겨줌
};
