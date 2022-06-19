const optionsContainer = document.createElement('section');
optionsContainer.classList.add('modal-container');
const showOptionsBtn = document.getElementById('options');
const optionsBox = document.createElement('div');
optionsBox.classList.add('option-box');

const clearLists = () => {
	mainListNodeContainer.innerHTML = '';
	saveChanges();
};

const restoreDefault = () => {
	clearLists();
	createDefaultLists();
	saveChanges();
};

const optionList = [
	{
		desc: 'Remove all lists',
		func: clearLists,
	},
	{
		desc: 'Restore default lists',
		func: restoreDefault,
	},
];

const createOption = (desc, func) => {
	const optionRow = createCustomNode('div', {
		customClassname: 'option-row',
		text: desc,
		callbackFunc: func,
	});
	return optionRow;
};

const optionsToClick = () => {
	return optionList.map(element => {
		return createOption(element.desc, element.func);
	});
};

optionsBox.append(...optionsToClick());
optionsContainer.append(optionsBox);

showOptionsBtn.addEventListener('click', () => {
	document.body.append(optionsContainer);
	optionsContainer.classList.add('backdrop-visible');
	optionsContainer.addEventListener('click', e => {
		if (e.target !== optionsContainer) {
			return;
		}
		optionsContainer.classList.remove('backdrop-visible');
		setTimeout(() => {
			optionsContainer.remove();
		}, 500);
	});
});
