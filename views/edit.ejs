<% layout("/layouts/boilerplate") %>
    <br>
    <style>
        .form_body{
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 7px 15px rgba(0, 0, 0, 0.5);
            background-color: #ededed;
        }
        .filter-tag{
            display: inline-flex;
            flex-direction: row;
            flex-wrap: wrap;
        }
        .indi-filter{
            padding: 0.1rem 0 0.1rem 0.6rem;
            background-color: #d3d3d3;
            margin-left: 0.4rem;
            border-radius: 3rem;
            margin-bottom: 0.5rem;
        }
        .display-badge{
            margin-bottom: 1rem;
        }
    /* Form Container - Floating Effect */
    .dark-mode{
        .form_body {
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 7px 15px rgba(0, 0, 0, 0.5);
            background-color: #2e2e2e;
        }
        h3 {
            color: #fff;
        }
        .indi-filter{
            background-color: #555555;
        }
        .form_body label{
            color: #ffffff;
            transition: color 0.3s ease;
        }

        /* Input Fields Styling */
        .edit_form input, textarea{
            background-color: #1b1b1b;
            color: #ffffff;
            border: 1px solid #555555;
            transition: box-shadow 0.3s ease;
        }
        .edit_form input, textarea:focus{
            background-color: #1b1b1b;
            color: #ffffff;
        }

        .edit_form input[type="text"]::placeholder {
            color: #aaaaaa;
        }

        .edit_form input[type="text"] {
            border-radius: 5px;
            padding: 12px;
            width: 100%;
            margin-top: 10px;
        }

        /* Button Styling */
        .edit_form button[type="submit"] {
            border: 2px solid #999;
            color: #999;
            background: transparent;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .edit_form button[type="submit"]:hover {
            color: #333;
            border: none;
            background: #999;
        }
        .form-text{
            color: #aaaaaa7f !important;
        }
        .delete-label{
            color: #1b1b1b !important;
        }
    
    }
</style>

        
    <div class="container">
        <div class="row">
                <div class="col-12 col-md-10 col-lg-8 mx-auto form_body">
                <h3 class="text-center">Edit Property details</h3>
                <form method="POST" action="/listing/<%= list._id %>?_method=PUT" novalidate class="needs-validation" enctype="multipart/form-data">
                    <div class="mb-3 edit_form">
                        <label for="title" class="form-label">Title</label>
                        <input name="listing[title]" class="form-control" value="<%= list.title %>" required>
                        <div class="valid-feedback">Looks good!</div>
                        <div class="invalid-feedback">Please enter a valid title!</div>
                    </div>

                    <div class="mb-3 edit_form">
                        <label for="description" class="form-label">Description</label>
                        <textarea name="listing[description]" class="form-control" rows="5" required><%= list.description %></textarea>
                        <div class="valid-feedback">Looks good!</div>
                        <div class="invalid-feedback">Please enter a valid description!</div>
                    </div>

                    <div class="mb-3 edit_form">
                        <div class="preview-container-edit">
                        <% list.image.forEach ((image, i) => { %>
                                <div class="preview-item">
                                    <img src="<%= image.url %>" alt="listing_image" class="preview-image"/>
                                    <div class="delete-checkbox">
                                        <input class="form-check-input" type="checkbox" id="image-<%=i%>" name="deleteImages[]" value="<%=image.filename %>">
                                        <label for="image-<%=i%>" class="form-check-label delete-label">Delete</label>
                                    </div>
                                </div>
                        <% }); %>
                    </div>
                    <small class="form-text text-muted">Images preview that already uploaded.</small>
                    </div>

                    <div class="mb-3 edit_form">
                        <label for="images" class="form-label">Upload New Images</label>
                        <input type="file" name="listing[image]" class="form-control" accept="image/*" id="fileInput" multiple>
                        <small class="form-text text-muted">You can upload multiple <images id="fileError" class="">(Maximum 4)</images></small>
                    </div>
                    <div class="row">

                        <div class="mb-3 col-3 edit_form">
                            <label for="price" class="form-label">Price (&#8377;)</label>
                            <input name="listing[price]" type="number" class="form-control" value="<%= list.price %>" required>
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">Please enter a valid price!</div>
                        </div>

                        <div class="mb-3 col-5 edit_form">
                            <label for="location" class="form-label">Location</label>
                            <input name="listing[location]" class="form-control" value="<%= list.location %>" required>
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">Please enter a valid location!</div>
                        </div>
    
                        <div class="mb-3 col-4 edit_form">
                            <label for="country" class="form-label">Country</label>
                            <input name="listing[country]" class="form-control" value="<%= list.country %>" required>
                            <div class="valid-feedback">Looks good!</div>
                            <div class="invalid-feedback">Please enter a valid country!</div>
                        </div>
                        <!-- Tags section -->
                        <div class="mb-3 listing_form">
                            <label for="tags" class="form-label"><b>Tags</b></label>
                            <div class="display-badge">
                                <% if (list.tags && list.tags.length>0) { %>
                                    <% list.tags.forEach(tag => { %>
                                        <span class="badge bg-primary"><%= tag %></span>
                                    <% }); %>
                                <% } else {%>
                                    <p style="color: red;">No tags found.</p>
                                <% } %>
                            </div>
                            <!-- <br> -->
                            <div class="filter-tag">
                            <% tags.forEach(tag => { %>
                                <div class="indi-filter">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input tag-checkbox" type="checkbox" name="listing[tags]" id="tag<%= tag %>" value="<%= tag %>">
                                        <label class="form-check-label" for="tag<%= tag %>"><%= tag %></label>
                                    </div>
                                </div>                                
                            <% }) %>
                            </div>
                            <small class="form-text tag-alert">Maximum 3 tags are allowed!</small>
                        </div>

                    </div>

                    <button type="submit" name="saveButton" class="btn btn-danger">Save</button>
                </form>
            </div>
        </div>
    </div>