
const getDragElement = (container, y) => {
	const dragoverElements = [
		...container.querySelectorAll('.list-entry:not(.dragging)'),
	];
	return dragoverElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{
			offset: Number.NEGATIVE_INFINITY,
		}
	).element;
};

const addDraggingFunc = targetElement => {
	targetElement.addEventListener('dragstart', () => {
		targetElement.classList.add('dragging');

		targetElement.addEventListener('dragend', () => {
			targetElement.classList.remove('dragging');
			saveChanges();
		});
	});
};

const dragOverHandler = container => {
	const entries = container.getElementsByClassName('list-entry');
	container.addEventListener('dragover', e => {
		//console.log(getDragElement(container, e.clientY));
		//container.append(document.querySelector('.dragging'));
		e.preventDefault();
		const checkPos = getDragElement(container, e.clientY);
		const currentlyDragging = document.querySelector('.dragging');
		if (checkPos == null) {
			container.append(currentlyDragging);
		} else {
			container.insertBefore(currentlyDragging, checkPos);
		}
	});
};