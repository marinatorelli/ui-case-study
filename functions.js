/* Function that receives as argument a column and opens its options menu */
function showMenu(element) {
	/* We get the children of the div column, the div with the menu has index 1 in this array */
	var children = element.children;
	/* We add/remove the class show, to change display from none to block and viceversa */
	children[1].classList.toggle("hide");
	var icon = children[0].children[0];
	if (icon.innerHTML.localeCompare("keyboard_arrow_down")==0) {
		icon.innerHTML = "keyboard_arrow_right";
	} else {
		icon.innerHTML = "keyboard_arrow_down";
	}
}

/* Function that receives as argument a column and opens its options menu */
function displayProjectsMenu(element) {
	/* We get the children of the div column, the div with the menu has index 1 in this array */
	var children = element.children;
	/* We add/remove the class show, to change display from none to block and viceversa */
	children[1].classList.toggle("show");
}

/* Function that receives as argument an element (task or column) and closes it */
function closeElement(element) {
    element.remove();
}

function complete(task) {
	if (task.innerHTML.localeCompare("radio_button_unchecked")==0) {
		task.innerHTML = "radio_button_checked";
	} else {
		task.innerHTML = "radio_button_unchecked";
	}
}

overflow = 0;

$(document).ready(function() {
    makeDrag();
	$("#left-arrow").click(function() {
		var left = $("#my-events").position().left;
		console.log(left);
		if (left < 0) {
			$("#my-events").animate({ "left": "+=28%" }, "slow" );
			overflow++;
		}
	});
		
	$("#right-arrow").click(function(){
		if (overflow > 0) {
			$("#my-events").animate({ "left": "-=28%" }, "slow" );
			overflow--;
		}
	});
});

function makeDrag() {
    $("body").sortable({
        items: ".column",
        axis: "x"
    });
    $(".column").sortable({
        items: ".task",
        connectWith: ".column"
    });
}

function attend(event) {
	var attend = event.children[5];
	attend.className = "attending";
	attend.innerHTML = "";
	var spanAttending = document.createElement("span");
	spanAttending.innerHTML = "Attending";
	spanAttending.classList.add("yes-att");
	attend.appendChild(spanAttending)
	var spanCancel = document.createElement("span");
	spanCancel.innerHTML = "Cancel";
	spanCancel.classList.add("cancel-att");
	attend.appendChild(spanCancel);
	var myEvents = document.getElementById("my-events");
	myEvents.appendChild(event);
	// Add new event to side bar
	var sideBar = document.createElement("div");
	sideBar.classList.add("element");
	var icon = document.createElement("i");
	icon.classList.add("fas");
	icon.classList.add("fa-users");
	sideBar.appendChild(icon);
	var p = document.createElement("p");
	var title = event.children[1];
	p.innerHTML = title.innerHTML;
	sideBar.appendChild(p);
	var parentNode = document.getElementById("side-bar-events");
	parentNode.appendChild(sideBar);
	overflow++;
}

function cancel_attending(event) {
	event.remove();
}

function show_popup(id) {
	var popup = document.getElementById(id);
	popup.style.display = "flex";
}

/* Function that hides the popup to close it */
function close_popup(popup) {
    popup.style.display = "none";
}

function createLabel(popup) {
	var newLabel = document.forms["create-label"]["label"].value;
	var label = document.createElement("div");
	label.classList.add("element");
	var icon = document.createElement("i");
	icon.classList.add('fas');
	icon.classList.add('fa-tag')
	label.appendChild(icon);
	var p = document.createElement("p");
	p.innerHTML = newLabel;
	label.appendChild(p);
	document.getElementById("labels").appendChild(label);
	popup.style.display = "none";
}

function updateDate() {
	var date = new Date();
	var nmonth = date.getMonth();
	var month;
	switch (nmonth) {
		case 0:
			month = "jan."
			break;
		case 1:
			month = "feb."
			break;
		case 2:
			month = "mar."
			break;
		case 3:
			month = "apr."
			break;
		case 4:
			month = "may."
			break;
		case 5:
			month = "jun."
			break;
		case 6:
			month = "jul."
			break;
		case 7:
			month = "aug."
			break;
		case 8:
			month = "sep."
			break;
		case 9:
			month = "oct."
			break;
		case 10:
			month = "nov."
			break;
		case 11:
			month = "dec."
			break;
	}
	var day = date.getDate();
	var year = date.getFullYear();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var time = month.toString() + " " + day.toString() + ", " + year.toString() + " " + hour.toString() + ":" + minutes.toString();
	document.getElementById("date-created").innerHTML = time;
	document.getElementById("last-update").innerHTML = time;
}

function createProject(popup) {
	var projectName = document.forms["new-project"]["title"].value;
	var project = document.createElement("div");
	project.classList.add("element");
	var icon = document.createElement("i");
	icon.classList.add('fas');
	icon.classList.add('fa-circle')
	project.appendChild(icon);
	var p = document.createElement("p");
	p.innerHTML = projectName;
	project.appendChild(p);
	document.getElementById("projects").appendChild(project);
	popup.style.display = "none";
}

function createSection(popup) {
	var sectionName = document.forms["create-section"]["section-name"].value;
	var section = document.createElement("div");
	section.classList.add("column");
	var headerInstance = document.getElementById("instance-header");
	var header = headerInstance.cloneNode(true);
	header.children[0].innerHTML = sectionName;
	section.appendChild(header);
	var menuInstance = document.getElementById("instance-menu");
	var menu = menuInstance.cloneNode(true);
	section.appendChild(menu);
	document.getElementsByClassName("columns-container")[0].appendChild(section);
	popup.style.display = "none";
}

function renameProject(popup) {
	var newName = document.forms["rename"]["new-name"].value;
	var h1 = document.getElementById("project-name");
	h1.innerHTML = newName;
	popup.style.display = "none";
}

var column;

function addToColumn(selectedColumn) {
	column = selectedColumn;
}

function createTask(popup) {
	popup.style.display = "none";
	var name = document.forms["create-task"]["task-name"].value;
	var description = document.forms["create-task"]["task-description"].value;
	var taskInstance = document.getElementsByClassName("task")[0];
	var task = taskInstance.cloneNode(true);
	var title = task.children[0].children[1];
	title.innerHTML = name;
	var p = task.children[1];
	p.innerHTML = description;
	var tags = task.children[2];
	var i;
	for (i = 0; i < (tags.children.length-1); i++) {
		tags.children[i].remove();
	}
	column.appendChild(task);
	popup.style.display = "none";
}

var addElement;
var tags;

function displayOptions(addButton, tagsDiv) {
	addElement = addButton;
	tags = tagsDiv;
	var children = document.getElementById("labels").children;
	var options = document.getElementById("select-label");
	if (options.children.length-1 < children.length) {
		var i;
		for (i=(options.children.length-1); i < children.length; i++) {
			var label = document.createElement("option");
			var name = children[i].children[1].innerHTML;
			label.innerHTML = name;
			label.value = name;
			options.appendChild(label);
		}
	}
}

function addLabel(popup) {
	var index = document.getElementById("select-label").selectedIndex;
	var name = document.getElementsByTagName("option")[index].value;
	var tag = document.createElement("div");
	tag.classList.add("tag");
	var background;
	var labels = document.getElementById("labels").children;
	var i;
	for (i=0; i<labels.length; i++) {
		var label = labels[i].children[1].innerHTML;
		if (label.localeCompare(name)==0) {
			id = labels[i].children[0].id;
			switch (id) {
				case "purple":
					background = "#9D8CB7";
					break;
				case "dark-green":
					background = "#38726C";
					break;
				case "mustard":
					background = "#FF9F1C";
					break;
				case "red":
					background = "#F96F5D";
					break;
				default:
					background = "#c4c4c4";
			}
		}
	}
	tag.style.backgroundColor = background;
	var icon = document.createElement("i");
	icon.classList.add('fas');
	icon.classList.add('fa-tag');
	var p = document.createElement("p");
	p.innerHTML = name;
	tag.appendChild(icon);
	tag.appendChild(p);
	tags.insertBefore(tag, addElement);
	popup.style.display = "none";
}