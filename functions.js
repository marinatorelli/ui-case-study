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
	var newLabel = document.forms["label-form"]["label"].value;
	var label = document.createElement("div");
	label.classList.add("element");
	var icon = document.createElement("i");
	icon.classList.add('fas');
	icon.classList.add('fa-tag')
	label.appendChild(icon);
	var p = document.createElement("p");
	p.innerHTML = newLabel;
	label.appendChild(p);
	var menu = document.getElementById("labels").appendChild(label);
	popup.style.display = "none";
}