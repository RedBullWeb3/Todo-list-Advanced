const addListButton = document.querySelector('#addList');
const newListNameElement = document.querySelector('#listName');

const getNewListName = () => {
	const newListName = newListNameElement.value;
	newListNameElement.value = '';
	return newListName;
};

const createListNodeEntryInput = () => {
	const ListNodeEntryInput = createCustomNode('section', {
		customClassname: 'list-nav',
	});
	const addButton = createCustomNode('button', {
		icon: '<i class="fas fa-sign-in-alt"></i>',
		customClassname: 'add-list-entry',
		saveOnClick: true,
		callbackFunc: () => {
			if (entryInput.value > '') {
				const entryContainer = addButton.parentElement;
				entryContainer.parentElement
					.querySelector('.list-entry-container')
					.appendChild(createListEntry(entryInput.value));
				entryInput.value = '';
			} else {
				showModal('Warning!', { lowerText: 'Cannot add an empty list entry' });
			}
		},
	});
	const sortList = createCustomNode('button', {
		icon: '<i class="fas fa-sort-alpha-down"></i>',
		customClassname: 'sort-list-button',
		callbackFunc: e => sortEntryList(e.target),
	});
	const entryInput = createCustomNode('input', { placeholder: 'New list entry' });
	clickElementOnEnterPress(entryInput, addButton);
	addElementsToContainer(ListNodeEntryInput, [entryInput, addButton, sortList]);
	return ListNodeEntryInput;
};

const createListDeleteButton = () =>
	createCustomNode('button', {
		icon: '<i class="fas fa-trash-alt"></i>',
		customClassname: 'delete-list-button',
		saveOnClick: true,
		callbackFunc: e => e.target.closest('.list-container').remove(),
	});

const createListEntryContainer = () => {
	const entryList = createCustomNode('main', {
		customClassname: 'list-entry-container',
	});
	dragOverHandler(entryList);
	return entryList;
};

const createListNodeHeader = listInputName => {
	const listHeader = document.createElement('header');
	const listName = createCustomNode('h2', { text: listInputName });
	addElementsToContainer(listHeader, [listName, createListDeleteButton()]);
	return listHeader;
};

const createListNode = userInputName => {
	if (userInputName > '') {
		const listContainer = createCustomNode('div', {
			customClassname: 'list-container',
		});
		const listHeader = createListNodeHeader(userInputName);
		addElementsToContainer(listContainer, [
			listHeader,
			createListNodeEntryInput(),
			createListEntryContainer(),
		]);
		return listContainer;
	} else {
		showModal('Warning!', { lowerText: 'List name cannot be empty' });
		return;
	}
};

clickElementOnEnterPress(newListNameElement, addListButton);
