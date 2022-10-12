const makePostsEl = document.querySelector(".make-posts-el");
const editPostsEl = document.querySelector(".edit-post-form");
const addPostbtn = document.querySelector("#new-post-btn");

const displayAddPost = async () => {
  makePostsEl.style.display = "block";
  addPostbtn.style.display = "none";
  editPostsEl.style.display = "none";
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

// todo how to make all of them work (not just first)
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-delete")) {
    const id = event.target.getAttribute("data-delete");

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

const showEditButtonHandler = async (event) => {
  const dataEdit = event.target.getAttribute("data-edit");
  // if (dataEdit) {

  // }
  const dataForm = document.querySelector(`form[data-form="${dataEdit}"]`);
  makePostsEl.style.display = "none";
  dataForm.style.display = "block";
};

const cancelEditButtonHandler = async () => {
  editPostsEl.style.display = "none";
  makePostsEl.style.display = "none";
};

// todo update a post
const editButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    event.preventDefault();

    const id = event.target.getAttribute("data-id");
    const title = document.querySelector("#edit-post-name").value.trim();
    const content = document.querySelector("#edit-post-desc").value.trim();

    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post");
    }
  }
};

addPostbtn.addEventListener("click", displayAddPost);

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".post-list")
  .addEventListener("click", delButtonHandler);

const editBtns = document.querySelectorAll(".edit-btn");

editBtns.forEach((el) => {
  el.addEventListener("click", showEditButtonHandler);
});

document
  .querySelector("#save-edit-btn")
  .addEventListener("click", editButtonHandler);

document
  .querySelector("#cancel-btn")
  .addEventListener("click", cancelEditButtonHandler);
