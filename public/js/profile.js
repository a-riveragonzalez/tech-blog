const makePostsEl = document.querySelector("#make-posts-el");
const editPostsEl = document.querySelector(".edit-post-form");
const addPostbtn = document.querySelector("#new-post-btn");

const displayAddPost = async () => {
  addPostbtn.style.display = "none";
  editPostsEl.style.display = "none";
  makePostsEl.style.display = "block";
};

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-name").value.trim();
  const content = document.querySelector("#post-desc").value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

const editButtonHandler = async (event) => {
  makePostsEl.style.display = "none";
  editPostsEl.style.display = "block";

  // if (event.target.hasAttribute("data-id")) {
  //   const id = event.target.getAttribute("data-id");

  //   const response = await fetch(`/api/posts/${id}`, {
  //     method: "DELETE",
  //   });

  //   if (response.ok) {
  //     document.location.replace("/profile");
  //   } else {
  //     alert("Failed to delete post");
  //   }
  // }
};

addPostbtn.addEventListener("click", displayAddPost);

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector("#delete-btn")
  .addEventListener("click", delButtonHandler);

document
  .querySelector("#edit-btn")
  .addEventListener("click", editButtonHandler);
