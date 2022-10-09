const commentFormEl = document.querySelector("#add-comment");

const displayAddComment = async () => {
  commentFormEl.style.display = "block";
};

const addNewComment = async (event) => {
  event.preventDefault();
  console.log(event);

  const content = document.querySelector("#comment-desc").value.trim();
  const pathname = document.location.pathname.split("/");
  const post_id = pathname[pathname.length - 1];

  const response = await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({ content, post_id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/post");
  } else {
    alert("Failed to create comment");
  }
};

document
  .querySelector("#new-comment-btn")
  .addEventListener("click", displayAddComment);

document
  .querySelector(".submit-comment-btn")
  .addEventListener("submit", addNewComment);

console.log(this);
