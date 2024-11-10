<% layout("/layouts/boilerplate") %>

<style>

    .blog-container {
        text-align: center;
    }

    .blog-container{
        .add-blog, #blogPosts {
            margin: 2rem 0;
        }
        
        .add-blog form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
        }
        
        input, textarea {
            width: 80%;
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            font-size: 1rem;
        }
        
        /* Blog post styling */
        .blog-post {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 1rem 0;
            text-align: left;
        }
        
        .blog-post h3 {
            color: #007bff;
            margin: 0;
        }
        
        .blog-post img {
            max-width: 100%;
            border-radius: 0.5rem;
            margin-top: 1rem;
        }
        
        .blog-post .likes {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #ff4757;
            font-weight: bold;
            cursor: pointer;
        }
        
        .likes .like-count {
            font-weight: normal;
        }
    }
        
    /* Blog Post Styling */
    .blogs-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 2rem;
    }

    .blog-post {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        padding: 20px;
        width: 90%;
        max-width: 900px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        position: relative;
    }

    .blog-post:hover {
        transform: translateY(-8px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .blog-post h2 {
        font-size: 2rem;
        color: #333;
        text-align: center;
        margin-bottom: 1rem;
    }

    .blog-post p {
        font-size: 1.1rem;
        color: #555;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .blog-post p:nth-of-type(2), .blog-post p:nth-of-type(3) {
        font-size: 0.95rem;
        color: #777;
    }

    .blog-image {
        width: 100%;
        max-height: 350px;
        object-fit: cover;
        border-radius: 6px;
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    /* Like Button Styling */
    .like-btn {
        background: none;
        border: none;
        color: #e63946;
        cursor: pointer;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: color 0.3s ease;
    }

    .like-btn:hover {
        color: #c02733;
    }

    .like-btn span {
        font-size: 1.2rem;
    }
</style>

<!-- Blog Section -->
<main class="blog-container">
    <h2 class="mb-3 mt-5" style="font-family: rakkas;">Travel Stories</h2>
    <p>Read through amazing travel stories or share your own adventure!</p>
    
    <!-- Blog Post Form -->
    <section class="add-blog">
        <h3 class="mb-5" style="font-family: rakkas;">Share Your Story</h3>
        <form id="blogForm" action="/blogs" method="POST" enctype="multipart/form-data">
            <input type="text" name="blog[title]" id="title" placeholder="Title" required>
            <input type="text" name="blog[location]" id="location" placeholder="Location" required>
            <textarea name="blog[content]" id="content" placeholder="Describe your experience..." rows="5" required></textarea>
            <input type="file" name="blog[image]" id="image" accept="image/*">
            <button type="submit" class="btn btn-outline-danger">Post Story</button>
        </form>
        
    </section>

    <!-- Blog Posts -->
    <div class="blogs-section">
        <% blogs.forEach(blog => { %>
            <div class="blog-post">
                <h2><%= blog.title %></h2>
                <p><%= blog.content %></p>
                <p>Location: <%= blog.location %></p>
                <p>Posted by: <%= blog.blogOwner ? blog.blogOwner.username : 'Unknown' %></p>

                   <!-- Conditional Delete Form for Blog Owner -->
                <% if (currUser && blog.blogOwner && currUser._id.toString() === blog.blogOwner._id.toString()) { %>
                    <form action="/blogs/<%= blog._id %>?_method=DELETE" method="POST" style="display: inline;">
                        <button type="submit" class="btn btn-outline-danger">Delete</button>
                    </form>
                <% } %>

                <!-- Display each image in the blog's images array -->
                <% blog.images.forEach(image => { %>
                    <img src="<%= image.imgUrl %>" alt="Blog Image" class="blog-image">
                <% }) %>
    
                <!-- Like button with heart symbol -->
                <button class="like-btn" onclick="likeBlog('<%= blog._id %>')">
                    ❤️ <span id="likes-<%= blog._id %>"><%= blog.likes || 0 %></span>
                </button>
            </div>
        <% }) %>
    </div>
    
    
</main>