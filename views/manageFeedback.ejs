<!-- INCLUDE boilerplate -->
<% layout("/layouts/admin_boilerplate") %>

    <style>
        h1 {
            text-align: center;
            margin-top: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        tr{
            width: 100%;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        th {
            background-color: #ff385c;
            color: white;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            text-align: center;
        }
        tr:nth-child(even) {
            background-color: #fafafa;
        }
        tr:hover {
            background-color: #f1f1f1;
        }   
        .btn {
            width: 70px;
            padding: 0.15rem 0.25rem;
            margin: 3px;
            font-size: 0.8rem;
        }
        .green{
            color: #1ae94a !important;
        }
        .red{
            color: #ff385c;
        }
        .user_btn{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .btn-success{
            background-color: #00af29;
        }

        .dark-mode{
            h1 {
                color: #f1f1f1;
            }
            table {
                background-color: #1e1e1e;
                color: #e0e0e0;
                border-color: #333333;
            }

            th {
                background-color: #ff385c;
                color: #ffffff;
            }

            tr:nth-child(even) {
                background-color: #2e2e2e;
            }

            tr:hover {
                background-color: #444444;
            }
            .date{
                color: #cecece !important;
            }

         }
        /* Responsive adjustments */
        @media (max-width: 995px) {
            table {
                font-size: 0.9em;
            }
            h1 {
                font-size: 1.2em;
            }
        }
    .feedback-star{
        font-size: 1rem;
        color: #f5bd23;
        cursor: pointer;
        /* box-shadow: 0 5px 10px #000000b5; */
        transition: all 0.1s ease;
    }
    .feedback-star:hover{
        transform: scale(1.2) translateY(-0.25rem) !important;
    }
    .feed-comment{
        font-weight: 500 !important;
        font-size: 0.8rem;
        font-family: Arial, Helvetica, sans-serif !important;
    }
    .feed-name{
        font-weight: 300 !important;
        opacity: 0.7 !important;
        font-size: 1rem;
        color: #ff435ffd;
        font-family: cursive !important;
    }
    .date{
        font-weight: 200 !important;
        font-size: 0.8rem;
    }
    .green{
        color: #02c90f;
        padding: 15px;
        border-radius: 50%;
        background-color: #e9e9e9;
    }
    .red{
        color: #cd1d1d;
        padding: 15px;
        border-radius: 50%;
        background-color: #e9e9e9;
    }
</style>
    

    <!-- Main Content -->
    <div class="container">
        
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3 mt-5">
            <% feedbacks.forEach(feedback => {  %>
                <div class="col">
                    <div class="card listing-card h-100" id="feedback-<%= feedback._id %>">
                        <div class="card-body">
                            <p class="card-text d-flex justify-content-center">
                                <i class="fa-solid <%= feedback.display ? 'fa-eye green' : 'fa-eye-slash red' %>"></i>
                            </p>
                            <p class="card-text d-flex justify-content-between mb-2">
                                <span class="feed-name">By <%= feedback.name %></span>
                                <span><%= feedback.rating %>&nbsp; <i class="fa-solid fa-star feedback-star"></i></span>
                            </p>
                            <p class="card-text">
                                <span class="feed-comment"><%= feedback.comment %></span><br>
                            </p>
                        </div>
                        <div class="card-text text-end mb-2">
                            <span class="text-muted date">
                                <small>
                                    <%= new Date(feedback.submittedAt).toLocaleDateString("en-IN", {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    }) %>
                                </small>
                            </span>
                        </div>
                        <div class="d-flex justify-content-evenly card-footer">
                            <!-- Delete Form -->
                            <form action="/admin/feedbacks/<%= feedback._id %>?_method=DELETE" method="POST" onsubmit="return confirm('Are you sure you want to delete this feedback?');">
                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>

                            <form action="/admin/feedbacks/<%=feedback._id%>/toggleDisplay" method="POST">
                                <button type="submit" class="btn btn-success">
                                    <%= feedback.display ? 'Hide It' : 'Display It' %>
                                </button>
                            </form> 
                        </div>
                    </div>
                </div>
            <% }) %>
        </div>



    </div>

