const getListEntryIndex = clickedElement => {
	const clickedEntry = clickedElement.closest('.list-entry');
	const allEntriesInCurrentList = clickedEntry.parentElement.children;
	let foundIndex;
	for (let i = 0; i < allEntriesInCurrentList.length; i++) {
		foundIndex = allEntriesInCurrentList[i] === clickedEntry ? i : 'match not found';
		if (i === foundIndex) {
			break;
		}
	}
	return foundIndex;
};

const createUpDownButtons = () => {
	const buttonsContainer = createCustomNode('div', {
		icon: null,
		customClassname: 'up-down-container',
		saveOnClick: true,
	});
	const up = createCustomNode('button', {
		icon: '<i class="fas fa-angle-up"></i>',
		customClassname: 'up-list-btn',
		callbackFunc: moveListItem,
		saveOnClick: true,
	});
	const down = createCustomNode('button', {
		icon: '<i class="fas fa-angle-down"></i>',
		customClassname: 'down-list-btn',
		callbackFunc: moveListItem,
	});
	addElementsToContainer(buttonsContainer, [up, down]);
	return buttonsContainer;
};

const editModeRestore = (element, oldText, save) => {
	const listEntry = element.closest('.list-entry');
	const inputValue = listEntry.querySelector('input').value.trim();
	let userText;
	if (save && inputValue.trim().length > 0) {
		userText = inputValue;
	} else if (save) {
		userText = oldText;
		showModal('Warning!', { lowerText: 'You cant set entry to be empty!' });
	} else {
		userText = oldText;
	}
	const editedEntry = createListEntry(userText);
	// listEntry.parentElement.insertBefore(editedEntry, listEntry);
	listEntry.insertAdjacentElement('beforebegin', editedEntry);
	listEntry.remove();
};

const createEditModeButtons = oldText => {
	const confirm = createCustomNode('button', {
		icon: '<i class="fas fa-check"></i>',
		callbackFunc: () => editModeRestore(confirm, oldText, true),
		saveOnClick: true,
	});
	const decline = createCustomNode('button', {
		icon: '<i class="fas fa-times"></i>',
		callbackFunc: () => editModeRestore(decline, oldText, false),
		saveOnClick: true,
	});
	const wrapper = createCustomNode('section', {
		customClassname: 'edit-mode-buttons',
	});
	addElementsToContainer(wrapper, [confirm, createUpDownButtons(), decline]);
	return wrapper;
};

const createEditModeElements = userText => {
	const editModeWrapper = createCustomNode('div', {
		customClassname: 'edit-mode',
	});
	const listInput = createCustomNode('input', {
		input: userText,
	});
	const buttonsWrapper = createEditModeButtons(userText);
	addElementsToContainer(editModeWrapper, [listInput, buttonsWrapper]);
	return editModeWrapper;
};

const editModeLauncher = e => {
	const editButton = e.target;
	const listEntry = editButton.closest('.list-entry');
	const listEntryUserText = listEntry.querySelector('.user-entry-text').innerText;
	listEntry.innerHTML = '';
	listEntry.appendChild(createEditModeElements(listEntryUserText));
	listEntry.querySelector('input').click();
	listEntry.querySelector('input').focus();
};

const createEditButton = () =>
	createCustomNode('button', {
		icon: '<i class="fas fa-wrench"></i>',
		customClassname: 'entry-edit-button',
		callbackFunc: editModeLauncher,
	});

const moveListItem = e => {
	const buttonClassTypes = {
		up: 'up-list-btn',
		down: 'down-list-btn',
	};
	const clickedButton = e.target;
	const listArray = clickedButton.closest('.list-entry-container').children;
	const listItemIndex = getListEntryIndex(clickedButton);
	const clickedButtonType = clickedButton.closest('button').className;
	const clickedEntry = clickedButton.closest('.list-entry');

	if (listArray.length === 1) {
		showModal('Warning!', { lowerText: `Cant move entry when there is only one.` });
		return;
	} else if (
		listArray.length - 1 === listItemIndex &&
		clickedButtonType === buttonClassTypes.down
	) {
		clickedEntry.parentElement.insertBefore(
			clickedEntry,
			clickedEntry.parentElement.firstElementChild
		);
		return;
	} else if (listItemIndex === 0 && clickedButtonType === buttonClassTypes.up) {
		clickedEntry.parentElement.appendChild(clickedEntry);
		return;
	}

	switch (clickedButtonType) {
		case buttonClassTypes.up:
			clickedEntry.parentElement.insertBefore(
				clickedEntry,
				listArray[listItemIndex - 1]
			);
			break;
		case buttonClassTypes.down:
			clickedEntry.parentElement.insertBefore(
				listArray[listItemIndex].nextSibling,
				clickedEntry
			);
			break;
		default:
			return;
	}
};

const removeEntry = deleteButton => {
	deleteButton.closest('.list-entry').remove();
	saveChanges();
};

const createDeleteEntryButton = () => {
	const deleteButton = createCustomNode('button', {
		icon: '<i class="fas fa-trash-alt"></i>',
		customClassname: 'delete-entry-button',
	});
	deleteButton.addEventListener('click', e => {
		const thatButton = e.target;
		showModal('Confirmation needed', {
			lowerText: 'Are you sure you want to delete this entry?',
			yesNo: true,
			yesFunc: () => removeEntry(thatButton),
		});
	});
	return deleteButton;
};

const createEntryButtons = () => {
	const entryButtonsContainer = createCustomNode('section', {
		customClassname: 'list-entry-buttons',
	});
	addElementsToContainer(entryButtonsContainer, [
		createEditButton(),
		createUpDownButtons(),
		createDeleteEntryButton(),
	]);
	return entryButtonsContainer;
};

const createListEntry = userInputText => {
	const entryLine = createCustomNode('div', {
		customClassname: 'list-entry',
		draggable: true,
	});
	const entryText = createCustomNode('section', {
		customClassname: 'user-entry-text',
		text: userInputText,
	});
	addElementsToContainer(entryLine, [entryText, createEntryButtons()]);
	addDraggingFunc(entryLine);
	return entryLine;
};

const sortEntryList = clickedElement => {
	disableEditMode();
	const list = clickedElement
		.closest('.list-container')
		.querySelector('.list-entry-container');
	const entries = list.querySelectorAll('.user-entry-text');
	let entryArray = [];
	if (entries) {
		for (let i = 0; i < entries.length; i++) {
			entryArray.push(entries[i].innerText);
		}
	}
	entryArray.sort();
	list.innerHTML = '';
	for (let i = 0; i < entryArray.length; i++) {
		list.appendChild(createListEntry(entryArray[i]));
	}
	saveChanges();
};
