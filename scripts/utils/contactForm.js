export default class ContactForm {
  constructor(name) {
    this.submitButton = document.querySelector('#btn_contact_submit');
    this.contact_button = document.querySelector('.contact_button');
    this.close_button = document.querySelector('.close_button');
    this.name = name;
    this.manageEvent();
    this.displayPhotographerName();
    this.contactModal = document.getElementById('contact_modal');
  }

  manageEvent() {
    this.contact_button.addEventListener('click', (event) => this.displayModal(event));
    this.close_button.addEventListener('click', (event) => this.closeModal(event));
    this.submitButton.addEventListener('click', (event) => this.submitContactForm(event));
    this.close_button.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.closeModal(event);
      }
    });
  }

  displayModal() {
    this.contactModal.style.display = 'block';
    document.querySelector('main').style.display = 'none';
    this.displayPhotographerName();
  }

  closeModal() {
    this.contactModal.style.display = 'none';
    document.querySelector('main').style.display = 'block';
  }

  displayPhotographerName() {
    const modalName = document.querySelector('.modal_title');
    modalName.textContent = `Contactez-moi ${this.name}`;
  }

  submitContactForm(e) {
    e.preventDefault();
    const firstName = document.querySelector('#firstNameInput');
    console.log(firstName.value);
    const lastName = document.querySelector('#lastNameInput');
    console.log(lastName.value);
    const email = document.querySelector('#emailInput');
    console.log(email.value);
    const message = document.querySelector('#messageInput');

    if (
      firstName.checkValidity()
      && lastName.checkValidity()
      && email.checkValidity()
      && message.checkValidity()
    ) {
      this.closeModal();
    }
  }
}
