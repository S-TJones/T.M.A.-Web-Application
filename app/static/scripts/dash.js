
// Open & Close of the Aside
function openNav() {
    document.getElementById("aside-open").style.display = "none";
    document.getElementById("aside-close").style.display = "block";

    document.getElementById("side-buttons").style.display = "flex";
    // document.getElementById("board").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("aside-close").style.display = "none";
    document.getElementById("aside-open").style.display = "block";

    document.getElementById("side-buttons").style.display = "none";
    // document.getElementById("board").style.marginLeft= "0";
}

// VueJS Stuff ------------------------------------------------------------
const app = Vue.createApp({
    data() {
        return {}
    }
});

// Dashboard
const Dashboard = {
    name: 'Dashboard',
    template: 
    `
    <div class="dash">
        <aside id="dash-aside">
            <div class="side-buttons" id="side-buttons">
                <div class="top-buttons">
                    {% if photo == "plain-user.jpg" %}
                    <img src = "../static/images/plain-user.jpg" alt ="User's Photo">
                    {% else %}
                    <img src = "{{ url_for('get_image', filename= photo) }}" alt ="User's Photo">
                    {% endif %}
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Settings</a>
                </div>
                <div class="base-buttons">
                    <a href="#" class="closebtn" onclick="closeNav()">
                        <i id="aside-close" class="fas fa-angle-double-left"></i>
                    </a>
                </div>
            </div>
            <div class="open-close">
                <a href="#" class="openbtn" onclick="openNav()">
                    <i id="aside-open" class="fas fa-angle-double-right"></i>
                </a>
            </div>
        </aside>
        
        <div class="board" id="board">
            <h1>User Dashboard</h1>
    
            <div class="tabs">
                <a href="#default">New Task</a>
                <a href="#user-tasks">All Tasks</a>
                <a href="#user-reviews">All Reviews</a>
            </div>

            <div class="items">
                <div id="user-tasks">
                    <h3>All Tasks</h3>
                    
                    {% for task in tasks %}
                    <div class="test">{{ task }}</div>
                    <div class="single-review">
                        <p>{{ task.title }}</p>
                        <p>123</p>
                        <p>{{ task.message }}</p>
                    </div>
                    {% endfor %}
                </div>
                <div id="user-reviews">
                    <h3>All Reviews</h3>
                    {% for review in reviews %}
                    <div class="test">
                        {{ review }}
                    </div>
                    <div class="top-reviews">
                        
                        <div class="review-items">
                            <p class="name">No name</p>
                            <p class="comment">
                                {{ review.comment }}
                            </p>
                            
                            <div class="ratings">
                                {% for num in range( review.rating ) %}
                                <i class="fas fa-star yellow-stars"></i>
                                {% endfor %}
        
                                {% for num in range( 5 - review.rating ) %}
                                <i class="fas fa-star no-stars"></i>
                                {% endfor %}
                            </div>
                        </div>
                    </div>
                    {% endfor %}
                </div>
                <div id="default">
                    <form action="{{ url_for('dashboard') }}" method="POST">
                        {{ form.csrf_token }}
                        
                        <fieldset>
                            <label for="task-title">Title here</label>
                            {{ form.title(id='task-title', placeholder='Enter Task title') }} 
                        </fieldset>

                        <fieldset>
                            <label for="desc">Description here</label>
                            {{ form.task(id='desc', placeholder='Enter task description') }} 
                        </fieldset>

                        <button type="submit" class="user-btn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `,
    created: function() {
        fetch("/dashboard/", {
            headers: {
                method: 'GET',
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            }
        })
        .then(function(response) {
            let self = this;
            self.car_status = response.status; // Stores the status
    
            return response.json();
        })
        .then(function(jsonResponse) {
            /* 
                Saving the data into SELF/THIS. 
                Further parsing of the JSON object happens here.
            */
        
            self.status = jsonResponse.status;
        
            console.log(jsonResponse);
        })
        .catch(function(error) {
            // Logs/Prints the error
            console.log(error);
        });
    },
    data() {
        return {}
    }, 
    methods: {

    }
}

// Route for the 404 page
const NotFound = {
    name: 'NotFound',
    template: 
    `
    <div>
      <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
      return {}
    }
  };
  
// Define Routes
const routes = [
    { path: "/", component: Home },
    { path: '/dashboard', component: Dashboard },

    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

// Let's the application use the different routes and mounts the app
app.use(router);
app.mount('#app');