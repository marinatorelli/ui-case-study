function share(){
	/*Gets the modal*/
	document.getElementById("share-popup").style.display="block";
}
function closeModal(){
	document.getElementById("share-popu").style.display="none";
}

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