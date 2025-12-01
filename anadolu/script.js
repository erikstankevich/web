window.addEventListener("load", () => {
  const community = document.getElementById("community");
  const rightside = document.querySelector(".right-side");

  const communityHeight = community.offsetHeight;
  rightside.style.paddingTop = communityHeight + "px";
});
