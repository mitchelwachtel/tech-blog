const deleteBlogpost = async (event) => {
  event.preventDefault();

  const bId = event.target.getAttribute("data-bid");

  const response = await fetch(`/api/blogpost/${bId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert("Failed to delete blogpost");
  }
};

document.querySelector(".blogpost-form").addEventListener("click", (event) => {
  const isButton = event.target.nodeName === "BUTTON";
  if (!isButton) {
    return;
  }
  if (event.target.getAttribute("data-type") == "blog-delete") {
    deleteBlogpost(event);
  }
});
