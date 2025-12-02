window.addEventListener("DOMContentLoaded", () => {
  const community = document.getElementById("community");
  const rightside = document.querySelector(".right-side");

  if (!community || rightside)
  {
    console.error("null");
    return;
  }

  const communityHeight = community.offsetHeight;
  rightside.style.paddingTop = communityHeight + "px";
});
