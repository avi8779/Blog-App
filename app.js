const openModel = document.getElementById('open-model');
const model = document.getElementById('model');
const close = document.getElementById('close');
const myModal = document.getElementById('myModal');

// Blog posts
let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

// Function to add a blog post
function addBlogPost() {
    const blogTitleInput = document.getElementById("blogTitle-input");
    const blogDescriptionInput = document.getElementById("blog-description");
    const blogInput = document.getElementById("blog-input");
    const imageInput = document.getElementById("image-input");
    const postContent = blogInput.value.trim();
    const imageFile = imageInput.files[0];

    if (postContent !== "") {
        // Check if an image is uploaded
        if (imageFile) {
            const reader = new FileReader();

            reader.onload = function () {
                const imageDataUrl = reader.result;

                // Save the image data URL along with other post data
                const newPost = {
                    blogTitle: blogTitleInput.value,
                    blogDescription: blogDescriptionInput.value,
                    content: postContent,
                    image: imageDataUrl, // Store image as data URL
                    date: new Date().toLocaleString(),
                };

                blogPosts.push(newPost);
                localStorage.setItem("blogPosts", JSON.stringify(blogPosts)); // Store in localStorage
                displayBlogPosts();
                blogTitleInput.value = "";
                blogDescriptionInput.value = "";
                blogInput.value = "";
                imageInput.value = ""; // Clear the file input

                alert("Blog successfully added!");
            };

            reader.readAsDataURL(imageFile); // Read the image file as a data URL
        } else {
            // If no image is uploaded
            const newPost = {
                blogTitle: blogTitleInput.value,
                blogDescription: blogDescriptionInput.value,
                content: postContent,
                image: null, // Set image as null if no image is uploaded
                date: new Date().toLocaleString(),
            };

            blogPosts.push(newPost);
            localStorage.setItem("blogPosts", JSON.stringify(blogPosts)); // Store in localStorage
            displayBlogPosts();
            blogTitleInput.value = "";
            blogDescriptionInput.value = "";
            blogInput.value = "";

            alert("Blog successfully added!");
        }
    } else {
        alert("Please fill in the blog content.");
    }
}

// Function to display blog posts
function displayBlogPosts() {
    const postsList = document.getElementById("posts-list");
    postsList.innerHTML = "";

    // Retrieve blog posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    // Check if there are no blog posts
    if (storedPosts.length === 0) {
        const noPostsMessage = document.createElement("p");
        noPostsMessage.textContent = "No blog posts available.";
        postsList.appendChild(noPostsMessage);
        return; // Exit the function early
    }

    // Loop through the stored posts and create a card for each post
    storedPosts.forEach((post, index) => {
        const li = document.createElement("div");
        li.style.cssText = "border: 1px solid black;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-radius: 10px; padding: 10px; border-style: none;";
        li.classList.add("post-card");

        li.innerHTML = `
            ${post.image ? `<img style="width: 200px; height: 180px;" src="${post.image}" alt="Post Image">` : ''}
            <p>${post.blogTitle}</p>
            
            <button id="add" style="width: 100%; padding: 5px; background-color: lightsalmon; color: white; border-radius: 5px; cursor: pointer; border: none;" onclick="redirectToDetailsPage()">Read</button>
            `;
            postsList.appendChild(li);
        });
        
}

// Function to delete a blog post
// function deletePost(index) {
//     blogPosts.splice(index, 1); // Remove the post at the specified index from the array
//     localStorage.setItem("blogPosts", JSON.stringify(blogPosts)); // Update localStorage
//     displayBlogPosts(); // Refresh the displayed blog posts
// }


// Function to handle the redirection to details page
function redirectToDetailsPage(postIndex) {
    const post = blogPosts[postIndex];
    // Store the post data in localStorage for access on the SingleBlog.html page
    localStorage.setItem("selectedPost", JSON.stringify(post));
    // Redirect to SingleBlog.html
    window.location.href = `SingleBlog.html`;
}


// Open and close modal
openModel.onclick = function () {
    model.style.display = "block";
}

close.onclick = function () {
    model.style.display = "none";
}

document.getElementById("addBlogPostButtonId").onclick = function () {
    model.style.display = "none";
    addBlogPost();
}

// Initial setup
displayBlogPosts();
