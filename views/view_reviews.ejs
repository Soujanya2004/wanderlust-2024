<!-- INCLUDE boilerplate -->
<% layout("/layouts/admin_boilerplate") %>

    <style>
        /* Styling for the Listing Container */
        .container.listing {
            margin: 2rem auto;
            padding: 2rem;
            background: inherit;
            border-radius: 10px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .container.listing:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }

        /* Title Styling */
        .container.listing h1 {
            font-family: rakkas;
            font-size: 2.2rem;
            color: #494e53;
            text-align: center;
            font-weight: 700;
            margin-bottom: 1rem;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 0.5rem;
        }

        /* Description and Details */
        .container.listing p {
            margin-left: 2rem;
            font-size: 1.1rem;
            color: #555;
            margin-bottom: 1rem;
            line-height: 1.6;
        }

        .container.listing strong {
            color: #333;
            font-family: rakkas;
            font-weight: 600;
        }

        /* Image Gallery */
        .image-gallery {
            margin-top: 1.5rem;
            border-radius: 8px;
            overflow: hidden;
        }

        .image-gallery img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            text-align: center;
            border-radius: 8px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .image-gallery img:hover {
            transform: scale(1.01);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        /* Actions Button */
        .actions {
            display: flex;
            justify-content: center;
            margin-top: 2rem;
        }

        /* Basic table styles */
        .reviews-title {
            font-family: 'Rakkas';
        }
        .reviews-container {
            margin: 0 auto;
        }
        .reviews-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .reviews-table th, .reviews-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .reviews-table th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .review-author {
            font-style: italic;
        }
        .no-reviews-message {
            text-align: center;
            color: #888;
            font-style: italic;
        }

        /* DARK MODE CSS */
        .dark-mode{
            /* Dark mode for container */
            .listing {
                background-color: #1f1f1f;
                border: 1px solid #333;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
            }

            /* Headings */
            .listing h1 {
                color: #ff6b6b;
                border-bottom: 2px solid #333;
            }

            /* Paragraph and text styling */
            .listing p,
            .listing strong {
                color: #b0b0b0;
            }

            /* Image Gallery styling */
            .image-gallery img {
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            }

            /* Table styling for reviews */
            .reviews-table {
                background-color: #1f1f1f;
                color: #e0e0e0;
                border-color: #333;
            }

            .reviews-table th {
                background-color: #333;
            }

            .reviews-table td {
                border: 1px solid #444;
            }

            .review-author {
                color: #ffb74d;
            }

            .reviews-title {
                color: #e9ecef;
            }
            .no-reviews-message {
                color: #888;
            }
        }
    </style>

        <div class="container listing">
            <h1><%= list.title %></h1>
            <p><strong>Description:</strong> <%= list.description %></p>
            <p><strong>Price:</strong> &#8377;<%= list.price %></p>
            <p><strong>Location:</strong> <%= list.location %>, <%= list.country %></p>
            <!-- tags -->
            <p>
                <% if (list.tags && list.tags.length>0) { %>
                  <% list.tags.forEach(tag => { %>
                    <span class="badge bg-primary me-1"><%= tag %></span>
                <% }) %>
                <% } else{ %>
                  <span class="badge bg-secondary me-1">No Tags</span>
                <% } %>
            </p>
            <!-- Centered Image Gallery with Bootstrap Columns -->
            <div class="image-gallery row col-10 offset-1">
                <% list.image.forEach(image => { %>
                    <div class="col-md-6 col-lg-12 mb-4">
                        <img src="<%= image.url %>" alt="<%= image.filename %>" class="img-fluid gallery-image">
                    </div>
                <% }) %>
            </div>
            <div class="reviews row">
                <h2 class="reviews-title mb-5 mt-3 text-center">Reviews</h2>
                <div class="reviews-container col-10 offset-1">
                    <% if (list.reviews.length > 0) { %>
                        <table class="reviews-table">
                            <thead>
                                <tr>
                                    <th>Review</th>
                                    <th>Ratings</th>
                                    <th>Owner</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <% list.reviews.forEach(review => { %>
                                    <tr>
                                        <td><%= review.Comments %></td>
                                        <td><b><%= review.rating %></b></td>
                                        <td class="review-author"><%= review.author.username %></td>
                                        <td>
                                            <form action="/admin/listing/<%= list._id %>/reviews/<%= review._id %>?_method=DELETE" method="POST" onsubmit="return confirm('Are you sure you want to delete this listing Review?');" class="delete-form">
                                                <button type="submit" class="btn btn-outline-danger">Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                <% }); %>
                            </tbody>
                        </table>
                    <% } else { %>
                        <p class="no-reviews-message">No reviews available for this listing.</p>
                    <% } %>
                </div>
            </div>