<% layout("/layouts/boilerplate") %>
<style>
    .form_body {
        background-color: #f9f9f9;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 7px 15px rgba(0, 0, 0, 0.5); /* Initial shadow to lift form */
    }
    #previewContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px; /* Adjust spacing between images */
        margin-bottom: 1rem; /* Spacing below the preview container */
    }

    .preview-image-container {
        position: relative;
        /* border: 2px solid #ddd; */
        padding: 5px;
        /* border-radius: 8px; */
        overflow: hidden;
        background-color: #d3d3d3; /* Background color for container */
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow for effect */
        width: 9rem; /* Container width */
        height: 7rem; /* Container height */
    }

    .preview-img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Maintain aspect ratio, cover container */
        border-radius: 4px;
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

    /* Form Container - Floating Effect */
    .dark-mode{
        .form_body {
            background-color: #2e2e2e;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 7px 15px rgba(0, 0, 0, 0.5); /* Initial shadow to lift form */
            transition: box-shadow 0.3s ease; /* Smooth hover transition */
        }

        h3{
            color: #ffffff;
        }
        .indi-filter{
            background-color: #555555;
        }
        .indi-filter label{
            color: #ffffff !important;
        }
        .form-label {
            color: #ffffff;
        }
        /* Input Fields Styling */
        .listing_form input, textarea{
            background-color: #1b1b1b;
            color: #ffffff;
            border: 1px solid #555555;
            transition: box-shadow 0.3s ease;
        }
        .listing_form input, textarea:focus{
            background-color: #1b1b1b;
            color: #ffffff;
        }
    
        .listing_form input::placeholder,
        .listing_form textarea::placeholder {
            color: #aaaaaa !important;
        }
    
        .listing_form button[type="submit"] {
            border: 2px solid #999;
            color: #999;
        }
        .listing_form button[type="submit"]:hover {
            color: #333;
            border: none;
            background: #999;
        }
        .listing_form .form-text{
            color: #b0b0b082 !important;
        }
    
    
    }
    </style>
    <br>
    <div class="row">
        <div class="col-12 col-md-10 col-lg-8 mx-auto form_body">
            <h3 class="d-flex justify-content-center mt-2 heading">Add your property details</h3>
            <form method="POST" action="/listing" enctype="multipart/form-data" novalidate class="needs-validation">
                <div class="mb-3 listing_form">
                    <label for="title" class="form-label">Title</label>
                    <br>
                    <input name="listing[title]" class="form-control" placeholder="Enter title" required>
                    <div class="invalid-feedback">Please add a title!</div>    
                    <div class="valid-feedback">Looks good!</div>                    
                </div>
                <div class="mb-3 listing_form">
                    <label for="description" class="form-label">Description</label>
                    <br>
                    <textarea name="listing[description]" id="list-description" class="form-control" cols="30" rows="5" placeholder="Enter description....." required></textarea>
                    <small class="" id="des-error"></small>
                    <div class="invalid-feedback">Please add a description!</div>
                    <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="mb-3 listing_form">
                    <label for="images" class="form-label">Upload Images</label>
                    <input type="file" name="listing[image]" class="form-control" id="fileInput" multiple required>
                    <div class="invalid-feedback">Please upload at least one image!</div>
                    <small class="form-text text-muted">You can upload multiple <images id="fileError" class="">(Maximum 4)</images></small>
                    <div class="valid-feedback">Looks good!</div>
                </div>
            
                <!-- Image preview container -->
                <div id="previewContainer" class="mb-3"></div>

                <div class="row">
                    <div class="mb-3 col-3 listing_form">
                        <label for="price" class="form-label">Price</label>
                        <br>
                        <input name="listing[price]" class="form-control" type="number" placeholder="Enter price" required>
                        <div class="invalid-feedback">Please add a price!</div>
                        <div class="valid-feedback">Looks good!</div>
                    </div>

                    <div class="mb-3 col-5 listing_form">
                        <label for="location" class="form-label">Location</label>
                        <br>
                        <input name="listing[location]" class="form-control" placeholder="Enter location" required>
                        <div class="invalid-feedback">Please enter a valid location!</div>
                        <div class="valid-feedback">Looks good!</div>
                    </div>
               
                    <div class="mb-3 col-4 listing_form">
                        <label for="country" class="form-label">Country</label>
                        <br>
                        <input name="listing[country]" class="form-control" placeholder="Enter country" required>
                        <div class="invalid-feedback">please enter a country name!</div>
                        <div class="valid-feedback">Looks good!</div>
                    </div>
                </div>
                    <!-- Tags section -->
                    <div class="mb-3 listing_form">
                        <label for="tags" class="form-label">Tags</label>
                        <br>
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
                <button class="btn btn-danger" name="saveButton" type="submit">ADD</button>
                <br><br>
            </form>
        </div>
    </div>

    <!-- JS for image preview -->
    <script>
        const filesMax = 4; // Maximum allowed files
        const fileInput = document.getElementById("fileInput");
        const fileList = []; // Array to hold selected files

        fileInput.addEventListener("change", function (event) {
        const files = Array.from(event.target.files);
        if (files.length + fileList.length > filesMax) {
            fileList.length = 0; // Clear the file list array
            displayPreview(); // Clear the preview display
        }
        else{
            // Add new files to the fileList
            fileList.push(...files);

            // Display preview and update the file input to include all selected files
            displayPreview();
            updateFileInput();
        }
        
        });

        function displayPreview() {
        // Display images in fileList as preview
        const previewContainer = document.getElementById("previewContainer");
        previewContainer.innerHTML = ""; // Clear existing content

        fileList.forEach((file, index) => {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("preview-image-container"); // Add container class

            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.alt = `Image ${index + 1}`;
            img.classList.add("preview-img"); // Add image class for additional styling

            imgContainer.appendChild(img);
            previewContainer.appendChild(imgContainer);
        });
        }

        function updateFileInput() {
        // Clear the original file input and set files from fileList
        const dataTransfer = new DataTransfer();
        fileList.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
        }

    </script>
