const commentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the comment form
  const content = document.querySelector("#content").value.trim();
  const urlArr = window.location.href.split("/");
  const blogpostIdQuestionMark = urlArr[urlArr.length - 1];
  const bIdQmArr = blogpostIdQuestionMark.split("");
  if (bIdQmArr[bIdQmArr.length-1] == '?') {
    bIdQmArr.pop();
  }

  let blogpost_id;
  if (bIdQmArr.length > 1) {
    blogpost_id = bIdQmArr.join("");
  } else {
    blogpost_id = bIdQmArr[0];
  }

  if (content) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/comment/", {
      method: "POST",
      body: JSON.stringify({content, blogpost_id}),
      headers: {"Content-Type": "application/json"},
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace(`/blogpost/${blogpost_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#comment-submit")
  .addEventListener("click", commentFormHandler);

  
