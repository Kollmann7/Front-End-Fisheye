const submitButton = document.querySelector('#btn_contact_submit');

submitButton.addEventListener('click', (e) => submitContactForm(e));

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    document.querySelector('main').style.display = 'none';
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    document.querySelector('main').style.display = 'block';
}

function displayPhotographerName(name){
    const modalName = document.querySelector('.modal_title');
    modalName.textContent= `Contactez-moi ${name}`;

}

function submitContactForm(e) {
	e.preventDefault();
	const firstName = document.querySelector('#firstNameInput');
	const lastName = document.querySelector('#lastNameInput');
	const email = document.querySelector('#emailInput');
	const message = document.querySelector('#messageInput');

	if (firstName.checkValidity() && lastName.checkValidity() && email.checkValidity() && message.checkValidity() )

	{
		closeModal();
	}
}