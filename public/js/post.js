const commentFormEl = $("#add-comment");
const addCommentBtn = $("#new-comment-btn");
const submitCommentBtn = $("#submit-comment-btn");

const displayAddComment = async () => {
  console.log("ahhhhhh");
  commentFormEl.hide();
};

const addNewComment = async (event) => {
  event.preventDefault();

  const description = document.querySelector("#comment-desc").value.trim();

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({ name, needed_funding, description }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to create post");
  }
};

addCommentBtn.on("click", displayAddComment);

submitCommentBtn.on("submit", addNewComment);
console.log("i connect dude");
