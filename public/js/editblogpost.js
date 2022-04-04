const blogpostFormHandler = async (event) => {
  event.preventDefault();
console.log(event);
  // Collect values from the blogpost form
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();
  const id = event.target.getAttribute("data-id");

  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/blogpost/${id}`, {
      method: "PUT",
      body: JSON.stringify({title, content}),
      headers: {"Content-Type": "application/json"},
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".blogpost-form")
  .addEventListener("submit", blogpostFormHandler);
