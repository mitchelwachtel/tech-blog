const editComment = async (event) => {
    event.preventDefault();
  console.log(event);
    // Collect values from the blogpost form

    const content = document.querySelector("#content").value.trim();
    const cId = event.target.getAttribute("data-cid");
    const bId = event.target.getAttribute("data-bid");
  
    if (content) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/comment/${cId}`, {
        method: "PUT",
        body: JSON.stringify({content}),
        headers: {"Content-Type": "application/json"},
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace(`/blogpost/${bId}`);
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector(".comment-form")
    .addEventListener("submit", editComment);
  