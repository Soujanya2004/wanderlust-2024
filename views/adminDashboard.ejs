<!-- INCLUDE boilerplate -->
<% layout("/layouts/admin_boilerplate") %>

<style>
    h1 {
        text-align: center;
        font-family: rakkas;
        font-size: 2em;
        color: #333;
        margin-top: 20px;
    }

    .listing-row {
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 10px;
        padding: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #f9f9f9;
    }

    .description-cell {
        max-height: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .btn {
        width: 70px;
        padding: 6px 12px;
        margin: 3px 0;
    }

        /* Dark Mode Styles */
        .dark-mode {
          .listing-row {
              background-color: #242424;
              color: #e0e0e0;
              border-color: #444;
          }
          .listing-title, h1 {
              color: #ffffff;
          }
        }

        /* Responsive Design for Small Screens */
        @media (max-width: 768px) {
            h1 {
                font-size: 1.5em;
            }

            .listing-row {
                padding: 10px;
            }

            .heading{
              display: none;
            }
             
            .img-fluid{
              width: 200px !important;
              height: 100px !important;
              object-fit: cover;
            }
            
            .all_btns{
              display: flex !important;
            }

            .all_btns .btn{
              margin-right: 5px;
            }
        }

</style>

<div class="container">
    
    <h1 class="admin">Listings Management Dashboard</h1>
      <div class="row bg-danger text-white p-2 rounded listing-row heading">
        <div class="col-2 col-md-2">Title</div>
        <div class="col-3 col-md-2">Description</div>
        <div class="col col-md-1">Price</div>
        <div class="col col-md-1">Location</div>
        <div class="col col-md-1">Country</div>
        <div class="col col-md-1">Reviews</div>
        <div class="col-2 col-md-2">Images</div>
        <!-- tags -->
         <div class="col col-md-1">Tags</div>
        <div class="col col-md-1">Actions</div>
    </div>
            <% listings.forEach(list => { %> <!-- Use forEach to iterate over listings -->
              <div class="row border-bottom p-2 listing-row">
                <% if (list.owner && list.owner.username) { %>
                  <div class="col-12 col-md-2 listing-title"><%= list.title %> 
                    <div style="font-size: .8rem; color: #ff385c;">Owned By: <b><%= list.owner.username %></b></div>
                  </div>
              <% } else { %>
                  <div class="col-12 col-md-2 listing-title"><%= list.title %>
                    <div style="font-size: .8rem; color: #ff385c;"> Owned By: <b>Unknown User</b></div>
                  </div>
              <% } %>              
                <div class="col-12 col-md-2 description-cell"><%= list.description %></div>
                <div class="col-12 col-md-1"><b><%= list.price %></b></div>
                <div class="col-12 col-md-1"><i><%= list.location %></i></div>
                <div class="col-12 col-md-1"><b><%= list.country %></b></div>
                <div class="col-12 col-md-1">
                    <a href="/admin/reviews/<%= list._id %>" class="btn btn-secondary btn-sm">View</a>
                </div>
                <div class="col-12 col-md-2">
                    <% list.image.forEach(image => { %>
                        <img src="<%= image.url %>" alt="<%= image.filename %>" class="img-fluid rounded me-1" style="width: 50px; height: auto;">
                    <% }) %>
                </div>
                <!-- tags -->
                 <div class="col-12 col-md-1">
                    <% if (list.tags && list.tags.length>0) { %>
                      <% list.tags.forEach(tag => { %>
                        <span class="badge bg-primary me-1"><%= tag %></span>
                    <% }) %>
                    <% } else{ %>
                      <span class="badge bg-secondary me-1">No Tags</span>
                    <% } %>
                </div>
                <div class="col-12 col-md-1  all_btns">
                        <!-- Edit Form -->
                        <form action="/admin/listing/edit/<%= list._id %>" method="GET">
                            <button class="btn btn-outline-primary" type="submit">Edit</button>
                        </form>

                        <!-- Delete Form -->
                        <form action="/admin/listing/<%= list._id %>?_method=DELETE" method="POST" onsubmit="return confirm('Are you sure you want to delete this listing?');">
                            <button class="btn btn-outline-danger" type="submit">Delete</button>
                        </form>

                        <!-- New View Profile Button -->
                      <form action="/admin/listing/<%= list._id %>" method="GET">
                        <button class="btn btn-outline-info" type="submit">View</button>
                      </form>
                    </div>
                  </div>
              <% }) %>
        
</div>

