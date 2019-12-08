/* Function that receives as argument a sidebar menu and hides the elements */
function showMenu(element) {
	/* We get the children of the div menu, the div with the elements has index 1 as it comes after the header */
	var children = element.children;
	/* We add/remove the class hide, to change the display */
	children[1].classList.toggle("hide");
	/* Also toggel the direction of the arrow, to show when the menu is open/closed */ 
	var icon = children[0].children[0];
	if (icon.innerHTML.localeCompare("keyboard_arrow_down")==0) {
		icon.innerHTML = "keyboard_arrow_right";
	} else {
		icon.innerHTML = "keyboard_arrow_down";
	}
}

/* Function that receives as argument a column/projects page and opens its options menu */
function displayProjectsMenu(element) {
	/* The menu has index 1 inside the children */
	var children = element.children;
	/* We add/remove the class show, to change display from none to block and viceversa */
	children[1].classList.toggle("show");
}

/* Function that receives as argument an element (task or column) and closes it */
function closeElement(element) {
    element.remove();
}

/* Function that changes the icon of a task to mark is as completed */
function complete(task) {
	if (task.innerHTML.localeCompare("radio_button_unchecked")==0) {
		task.innerHTML = "radio_button_checked";
	} else {
		task.innerHTML = "radio_button_unchecked";
	}
}

/* Variable that keeps track of the events overflowing in the my-events row */
overflow = 0;

$(document).ready(function() {
    makeDrag();
	/* When the left arrow is clicked the my-events row is scrolled to the left if possible */
	$("#left-arrow").click(function() {
		var left = $("#my-events").position().left;
		/* If the left value has been altered negatively you can scroll to the left to restore it */
		if (left < 0) {
			$("#my-events").animate({ "left": "+=28%" }, "slow" );
			overflow++;
		}
	});
		
	/* When the right arrow is clicked the my-events row is scrolled to the right if possible */
	$("#right-arrow").click(function(){
		/* If there is an overflow of events we can scroll to the right */
		if (overflow > 0) {
			$("#my-events").animate({ "left": "-=28%" }, "slow" );
			overflow--;
		}
	});
});

/* Function that allows the user to move tasks and columns around */
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

/* Function that marks an event as attended and moves it to the my-events row */
function attend(event) {
	/* Get the attend button and change the class and inner html to attending */
	var attend = event.children[5];
	attend.className = "attending";
	attend.innerHTML = "";
	var spanAttending = document.createElement("span");
	spanAttending.innerHTML = "Attending";
	spanAttending.classList.add("yes-att");
	attend.appendChild(spanAttending)
	var spanCancel = document.createElement("span");
	/* Add the button to be able to cancel the event */
	spanCancel.innerHTML = "Cancel";
	spanCancel.classList.add("cancel-att");
	attend.appendChild(spanCancel);
	/* Move event to my-events row */
	var myEvents = document.getElementById("my-events");
	myEvents.appendChild(event);
	/* Add event to side bar, creating a new element */
	var sideBar = document.createElement("div");
	sideBar.classList.add("element");
	/* Create events icon in sidebar */
	var icon = document.createElement("i");
	icon.classList.add("fas");
	icon.classList.add("fa-users");
	sideBar.appendChild(icon);
	/* Get the title of the event and add it to the sidebar */
	var p = document.createElement("p");
	var title = event.children[1];
	p.innerHTML = title.innerHTML;
	sideBar.appendChild(p);
	/* Append new element to the sidebar */
	var parentNode = document.getElementById("side-bar-events");
	parentNode.appendChild(sideBar);
	/* Update the overflow as we added an event to my-events */
	overflow++;
}

/* Cancel an event */
function cancel_attending(event) {
	var title = event.children[1].innerHTML;
	/* Remove event from my-events row and update overflow */
	event.remove();
	overflow--;
	/* Remove the event from the sidebar */
	var sideBar = document.getElementById("side-bar-events").children;
	var i;
	for (i = 0; i < sideBar.length; i++) {
		var eventName = sideBar[i].children[1].innerHTML;
		if (eventName.localeCompare(title)==0) {
			sideBar[i].remove();
		}
	}
}

/* Function that receives the id of a popup and displays it */
function show_popup(id) {
	var popup = document.getElementById(id);
	popup.style.display = "flex";
}

/* Function that hides the popup to close it */
function close_popup(popup) {
    popup.style.display = "none";
}

/* Function that creates a new label and adds it to the sidebar */
function createLabel(popup) {
	/* Get the value that the user has input */
	var newLabel = document.forms["create-label"]["label"].value;
	/* Create an element div for the sidebar */
	var label = document.createElement("div");
	label.classList.add("element");
	/* Create the tag icon */
	var icon = document.createElement("i");
	icon.classList.add('fas');
	icon.classList.add('fa-tag')
	label.appendChild(icon);
	/* Use the value input by the user */
	var p = document.createElement("p");
	p.innerHTML = newLabel;
	label.appendChild(p);
	/* Append element to sidebar */
	document.getElementById("labels").appendChild(label);
	popup.style.display = "none"; /* Hide popup */
}

/* Function that shows the current date as the date of creation and last updated in the create project form */
function updateDate() {
	var date = new Date();
	var nmonth = date.getMonth();
	var month;
	/* Convert the month to a string */
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
	/* Format all the values in a string and update the values in the popup */
	var time = month.toString() + " " + day.toString() + ", " + year.toString() + " " + hour.toString() + ":" + minutes.toString();
	document.getElementById("date-created").innerHTML = time;
	document.getElementById("last-update").innerHTML = time;
}

/* Function that creates a project and adds it to the list in the sidebar */
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

/* Function that creates a new column */
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

/* Function that changes the name of a project */
function renameProject(popup) {
	/* Take the value input by the user */
	var newName = document.forms["rename"]["new-name"].value;
	var h1 = document.getElementById("project-name");
	h1.innerHTML = newName;
	popup.style.display = "none"; /* Hide popup */
}

/* Variable that stores the column where a new task will be added */
var column;

/* Function to change the column where we will add new tasks */
function addToColumn(selectedColumn) {
	column = selectedColumn;
}

/* Function that creates a new task */
function createTask(popup) {
	/* Take name and description input by the user */
	var name = document.forms["create-task"]["task-name"].value;
	var description = document.forms["create-task"]["task-description"].value;
	/* Instead of creating the element from 0 we will use an intance of the ones already in the document and clone it */
	var taskInstance = document.getElementsByClassName("task")[0];
	var task = taskInstance.cloneNode(true);
	/* Change the title and description */
	var title = task.children[0].children[1];
	title.innerHTML = name;
	var p = task.children[1];
	p.innerHTML = description;
	/* Delete the tags of the instance */
	var tags = task.children[2];
	var i;
	for (i = 0; i < (tags.children.length-1); i++) {
		tags.children[i].remove();
	}
	/* Append child to the column last stored in the variable */
	column.appendChild(task);
	popup.style.display = "none"; /* Hide popu`*/
}

/* Variables to store the tags div where a tag will be added */
var tags;
var addElement; /* Reference node used in insert before */

/* Function that takes the available tags from the sidebar elements and displays them in the add-label popup */
function displayOptions(addButton, tagsDiv) {
	/* Uses the arguments to update the variables where the tag will be inserted */
	addElement = addButton;
	tags = tagsDiv;
	/* Iterate through all labels and add them, only if they aren't already added */
	var children = document.getElementById("labels").children;
	var options = document.getElementById("select-label");
	var i;
	/* We start at the index of the number of elements already in the form, -1 because we don't count the "Labels" option */
	for (i=(options.children.length-1); i < children.length; i++) {
		var label = document.createElement("option");
		var name = children[i].children[1].innerHTML;
		label.innerHTML = name;
		label.value = name;
		options.appendChild(label);
	}
}

/* Function that adds a label to a task */
function addLabel(popup) {
	/* Get the value selected by the user */
	var index = document.getElementById("select-label").selectedIndex;
	var name = document.getElementsByTagName("option")[index].value;
	/* Create tag element */
	var tag = document.createElement("div");
	tag.classList.add("tag");
	/* Get the color of the background from the color of the icon in the sidebar */
	var background;
	var labels = document.getElementById("labels").children;
	var i;
	for (i=0; i<labels.length; i++) {
		var label = labels[i].children[1].innerHTML;
		/* Compare the names of the labels to find the one we are adding */
		if (label.localeCompare(name)==0) {
			id = labels[i].children[0].id;
			/* Select the color if they have an specific one */
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
				/* If there isn't any specific color the default one is grey */
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
	/* Insert the node in the tags of the task specified in the variables */
	tags.insertBefore(tag, addElement);
	popup.style.display = "none"; /* Hide popup */
}