// Global var tracks number of graphs
num_rows = 1 

function update(graph_num) {
    // Takes string representing graph number
    num = parseInt(graph_num)

    var select_lang = document.getElementById('language-select-' + String(num));
    var select_cat = document.getElementById('category-select-' + String(num));
    
    localStorage.setItem("language-" + String(num_rows), select_lang.options[select_lang.selectedIndex].value);
    localStorage.setItem("category-" + String(num_rows), select_cat.options[select_cat.selectedIndex].value);
} 


function showGraph() {
    let cat;
    let lang;

    for (let num = 1; num < num_rows + 1; num++) {
        cat = localStorage.getItem("category-" + String(num));
        lang = localStorage.getItem("language-" + String(num));

        if (lang == "" || lang == null) {
            alert('Please select a language');
        }
        else if (cat == "" || cat == null) {
            alert('Please select a category');
        }
    }

    let cont;
    let comm;
    let proj;

    for (let num = 1; num < num_rows + 1; num++) {
        cat = localStorage.getItem("category-" + String(num));
        lang = localStorage.getItem("language-" + String(num));
        // Store category
        cont = document.getElementById("contributor-" + String(num));
        comm = document.getElementById("commit-" + String(num));
        proj = document.getElementById("project-" + String(num));
    
        // Show contributor graph, hide others
        if (cat == "contributor" ) {
            // Update JSON object referenced for graphs
            parseData("Contributor", lang)
            comm.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:show");

            // Reloads graph with updated data vars
            graphContributor(String(num))
        }
        // Show commit graph, hide others
        else if (cat === "commit") {
            parseData("Commit", lang)

            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:none");
            comm.setAttribute("style", "display:show");

            // Reloads graph with updated data vars
            graphCommit(String(num))            
        }
        // Show project graph, hide others
        else {           
            parseData("Project", lang)

            comm.setAttribute("style", "display:none");
            cont.setAttribute("style", "display:none");
            proj.setAttribute("style", "display:show");

            // Reloads graph with updated data variables
            graphProject(String(num))  
        }
    }
}

function addRow() {
    // Add query row
    // Call function to add graph div

    if (num_rows == 6) {
        alert("Maximum number of graphs reached")
        return
    }
    num_rows += 1;

    const div = document.createElement('div');  
    div.className = 'row';
    div.id = 'row-' + String(num_rows)
    div.innerHTML = `
        <div class="flex flex-row space-x-16">
        <div class="flex flex-row items-center space-x-4">
            <!-- Dropdown for language selection -->
            <label for="language-select-` + String(num_rows) + `" class="font-bold">Language:</label>
            <select name="language-` + String(num_rows) + `" id="language-select-` + String(num_rows) + `" onchange="update(` + String(num_rows) + `)" class="form-select appearance-none 
                block
                w-full
                px-3
                py-1
                my-3
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select">
                <option value="" selected disabled hidden>--Select an Option--</option>
                <option value="Python">Python</option>
                <option value="C#">C#</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Java">Java</option>
                <option value="Go">Go</option>
                <option value="Ruby">Ruby</option>
                <option value="C++">C++</option>
                <option value="TypeScript">TypeScript</option>
                <option value="PHP">PHP</option>
                <option value="C">C</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="Jupyter">Jupyter</option>
                <option value="Shell">Shell</option>
                <option value="Objective-C">Objective-C</option>
                <option value="All">All</option>
            </select>
        </div>
        <div class="flex flex-row items-center space-x-4">
            <!-- Dropdown for category selection -->
            <label for="category-select-` + String(num_rows) + `" class="font-bold">Category:</label>
            <select name="category-` + String(num_rows) + `" id="category-select-` + String(num_rows) + `" onchange="update(` + String(num_rows) + `)" class="form-select appearance-none 
                block
                w-full
                px-3
                py-1
                my-3
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select">
                <option value="" selected disabled hidden>--Select an Option--</option>
                <option value="contributor">Contributors</option>
                <option value="commit">Commits</option>
                <option value="project">Project</option>
                <!-- <option value="all">All</option> -->
            </select>
        </div>
    </div>
    `;
  
    document.getElementById('query').appendChild(div);

    addGraph();
  }
  
  function removeRow() {
    // Remove query row option
    // Call to remove graph div element
    if (num_rows == 1) {
        return
    }
    num_rows -= 1;

    let element = document.getElementById('query');
    var child = element.lastElementChild;
    element.removeChild(child);

    // Remove graph div child node
    removeGraph();
  }
  

    function addGraph() {
        const div = document.createElement('div');  
        div.className = 'graph';
        div.id = 'graph-' + String(num_rows)

        div.innerHTML = `
        <div class="mx-auto my-3 w-full"> 
            <div id="contributor-`+ String(num_rows) + `" style="display: none" class="flex-col items-center w-full my-10">                
                <a href="#" class="px-6 hover:opacity-75 my-4 md:w-3/3">
                    <figure class="highcharts-figure">
                        <div id="cont-`+ String(num_rows) + `"></div>
                        <!-- JS file link -->
                        <script src="js/data.js"></script>
                        <script src="js/parse.js"></script>
                        <script src="census_interactive/graphs/Graph_Contributor/script.js"></script>
                        <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                    </figure>
                </a>
            </div>
        
            <div id="commit-`+ String(num_rows) + `" style="display: none" class="flex-col items-center my-10 w-full">
                <a href="#" class="px-6 hover:opacity-75 my-4 md:w-3/3">
                    <figure class="highcharts-figure">
                        <div id="comm-`+ String(num_rows) + `"></div> 
                        <!-- JS file link -->
                        <script src="js/data.js"></script>
                        <script src="js/parse.js"></script>
                        <script src="census_interactive/graphs/Graph_Commit/script.js"></script>
                        <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                    </figure>
                </a>
            </div>

            <div id="project-`+ String(num_rows) + `" style="display: none" class="flex-col items-center my-10 w-full">
                <a href="#" class="px-6 hover:opacity-75 my-4 md:w-3/3">
                    <figure class="highcharts-figure">
                        <div id="proj-`+ String(num_rows) + `"></div>
                        <!-- JS file link -->
                        <script src="js/data.js"></script>
                        <script src="js/parse.js"></script>
                        <script src="census_interactive/graphs/Graph_Project/script.js"></script>
                        <script src="https://blacklabel.github.io/grouped_categories/grouped-categories.js"></script>    
                    </figure>
                </a>
            </div>   
        </div>
        `
        document.getElementById('visualizations').appendChild(div);

    }

  function removeGraph() {
    let element = document.getElementById('visualizations');
    var child = element.lastElementChild;
    element.removeChild(child);
  }