const modalBackdrop = document.querySelector('.modal-container');

const toggleBackdrop = toggle => {
	if (toggle) {
		modalBackdrop.classList.add('backdrop-visible');
	} else {
		modalBackdrop.classList.remove('backdrop-visible');
	}
};

const disableModal = () => {
	const modal = document.querySelector('.modal-box');
	modal.classList.add('modal-remove');
	setTimeout(() => {
		modal.remove();
		toggleBackdrop(false);
	}, 100);
};

const modalGenerator = (title, modal) => {
	if (title) {
		const modalElement = createCustomNode('div', { customClassname: 'modal-box' });
		const titleElement = createCustomNode('h2', { text: title });
		modalElement.append(titleElement);
		const modalAction = createCustomNode('div', { customClassname: 'modal-action' });

		if (modal && modal.lowerText) {
			const modalText = createCustomNode('p', { text: modal.lowerText });
			modalElement.append(modalText);
		}
		if (modal && modal.yesNo) {
			const yesBtn = createCustomNode('button', {
				customClassname: 'btn-danger',
				text: 'Yes',
			});
			const noBtn = createCustomNode('button', {
				customClassname: 'btn-normal',
				text: 'No',
			});
			noBtn.addEventListener('click', disableModal);
			if (modal.yesFunc) {
				yesBtn.addEventListener('click', (e, button) => {
					modal.yesFunc(e, button);
					disableModal();
				});
			}
			addElementsToContainer(modalAction, [yesBtn, noBtn]);
		} else {
			const cancel = createCustomNode('button', {
				customClassname: 'btn-normal',
				text: 'Ok',
			});
			cancel.addEventListener('click', disableModal);
			modalAction.append(cancel);
		}
		modalElement.append(modalAction);
		return modalElement;
	}
};

const showModal = (title, modal) => {
	toggleBackdrop(true);
	const newModal = modalGenerator(title, modal);
	modalBackdrop.append(newModal);
	newModal.querySelector('.modal-action').lastElementChild.focus();
};

modalBackdrop.addEventListener('click', e =>
	e.target === modalBackdrop ? disableModal() : 0
);
