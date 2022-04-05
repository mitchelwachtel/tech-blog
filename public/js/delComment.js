const deleteComment = async (event) => {
    event.preventDefault();
    console.log("hey");
    const cId = event.target.getAttribute("data-cid");
    const bId = event.target.getAttribute("data-bid");
    console.log(cId);
    console.log(bId);
  
    const response = await fetch(`/api/comment/${cId}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.replace(`/blogpost/personal/${bId}`);
    } else {
      alert("Failed to delete comment");
    }
  };

document
  .querySelector(".comments-section")
  .addEventListener("click", (event) => {
    const isButton = event.target.nodeName === "BUTTON";
    if (!isButton) {
      return;
    }
    if (event.target.getAttribute("data-type") == "comment-delete") {
      deleteComment(event);
    }
  });

