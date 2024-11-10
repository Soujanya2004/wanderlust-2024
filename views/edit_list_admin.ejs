<!-- INCLUDE boilerplate -->
<% layout("/layouts/admin_boilerplate") %>

    <style>
        .all_btns{
            display: flex !important;
            justify-content: center;
        }
        .all_btns .btn{
            margin-left: 5px;
            margin-right: 5px;
        }

    .dark-mode{
         
            h3,  .form-label, .form-text {
                color: #f1f1f1;
            }
            .form-control {
                background-color: #333;
                color: #e0e0e0;
                border: 1px solid #555;
            }
            .form-control::placeholder {
                color: #888;
            }
            .form-control:focus {
                background-color: #444;
                border-color: #888;
                color: #fff;
            }
            .edit_form input[type="file"] {
                background-color: inherit;
                color: #e0e0e0;
                border: 1px solid #555;
            }
            .edit_form .valid-feedback, .edit_form .invalid-feedback {
                color: #a0a0a0;
            }
        }
    </style>


    <!-- EDIT lISTING -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-12 col-md-10 col-lg-8 mx-auto form_body">
            <h3 class="text-center" style="font-family: rakkas;">Edit Property details</h3>
            <form method="POST" action="/admin/listing/edit/<%= list._id %>?_method=PUT" novalidate class="needs-validation" enctype="multipart/form-data">
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
                    <% list.image.forEach(image => { %>
                        <img src="<%= image.url %>" alt="listing_image" style="height: 8rem; width: auto; margin-right: 10px;" />
                    <% }); %>
                    <br><small class="form-text text-muted">Images preview that already uploaded.</small>
                </div>

                <div class="mb-3 edit_form">
                    <label for="images" class="form-label">Upload New Images</label>
                    <input type="file" name="listing[image]" class="form-control" accept="image/*" multiple>
                    <small class="form-text text-muted">You can upload multiple images.</small>
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

                </div>
                <!-- Tags section -->
                <div class="mb-3 listing_form">
                    <label for="tags" class="form-label"><b>Tags</b></label>
                    <div>
                        <% if (list.tags && list.tags.length > 0) { %>
                            <% list.tags.forEach(tag => { %>
                                <span class="badge bg-primary"><%= tag %></span>
                            <% }); %>
                        <% } else { %>
                            <p style="color: red;">No tags found.</p>
                        <% } %>
                    </div>
                    <br>
                    <% tags.forEach(tag => { %>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input tag-checkbox" type="checkbox" name="listing[tags]" id="tag<%= tag %>" value="<%= tag %>">
                            <label class="form-check-label" for="tag<%= tag %>"><%= tag %></label>
                        </div>
                    <% }) %>
                </div>
                <small class="form-text tag-alert">Maximum 3 tags are allowed!</small>
                <div class="all_btns">
                    <button type="submit" class="btn btn-primary">Update Listing</button>
                    <a href="/admin/dashboard" class="btn btn-secondary">Cancel</a>
                </div>
            </form>
            <br><br><br><br>
        </div>
    </div>
    </div>


<script>
    // Set limit of three to add tags for list
const checkboxes = document.querySelectorAll('.tag-checkbox');
const tagAlert = document.querySelector('.tag-alert');
    const maxAllowed = 3;

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Count the number of checked boxes
            const checkedCount = document.querySelectorAll('.tag-checkbox:checked').length;

            if (checkedCount > maxAllowed) {
                // Uncheck the current checkbox if the limit is reached
                checkbox.checked = false;
                // alert(`You can select up to ${maxAllowed} tags only.`);
                tagAlert.classList.remove("normal-tag-alert");
                tagAlert.classList.add("red-tag-alert");
            } else {
                // Hide the alert message if under the limit
                tagAlert.classList.remove("red-tag-alert");
                tagAlert.classList.add("normal-tag-alert");
            }
        });
    });


</script>
