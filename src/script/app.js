const mainListNodeContainer = document.querySelector('#listsContainer');

addListButton.addEventListener('click', () => {
	const getListName = getNewListName();
	if (getListName.trim() > '') {
		mainListNodeContainer.appendChild(createListNode(getListName));
		saveChanges();
	} else {
		showModal('Warning!', { lowerText: `You can't enter a list with empty name.` });
		return;
	}
});

const createFullList = (listName, nodeList = 0) => {
	const newList = createListNode(listName);
	const listEntryContainer = newList.querySelector('.list-entry-container');
	mainListNodeContainer.appendChild(newList);
	for (let i = 0; i < nodeList.length; i++) {
		listEntryContainer.appendChild(createListEntry(nodeList[i]));
	}
};

const createListObject = (listName, ...entries) => {
	const obj = {
		name: listName,
		entries: entries,
	};
	return obj;
};

const getEntriesText = parentList => {
	let textList = [];
	parentList.querySelectorAll('.list-entry').forEach(element => {
		textList.push(element.querySelector('.user-entry-text').innerText);
	});
	return textList;
};

const createDefaultLists = () => {
	const lists = [
		createListObject(
			'Super fun list name',
			'This is entry test number two',
			'You can edit and move entries'
		),
		createListObject(
			'Try',
			'Using',
			'Sort feature',
			'On this list',
			'Check links at the bottom to check out more of my projects'
		),
		createListObject(
			'Third list, wow',
			'You can create as many lists as you like',
			'Lists are stored in your browser memory :O'
		),
	];
	lists.forEach(list => {
		createFullList(list.name, list.entries);
	});
};

if (localStorage.getItem('lists')) {
	const lists = JSON.parse(localStorage.getItem('lists'));
	console.log('loaded from local storage', lists);
	mainListNodeContainer.innerHTML = '';
	for (let i = 0; i < lists.length; i++) {
		createFullList(lists[i].listName, lists[i].listEntries);
	}
} else {
	createDefaultLists();
}
