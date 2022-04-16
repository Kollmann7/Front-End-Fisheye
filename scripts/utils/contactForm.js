// eslint-disable-next-line no-unused-vars
class ContactForm {
  constructor(name) {
    this.submitButton = document.querySelector('#btn_contact_submit');
    this.contact_button = document.querySelector('.contact_button');
    this.close_button = document.querySelector('.close_button');
    this.name = name;
    this.manageEvent();
    this.displayPhotographerName();
  }

  manageEvent() {
    this.contact_button.addEventListener('click', (event) => this.displayModal(event));
    this.close_button.addEventListener('click', (event) => this.closeModal(event));
    this.submitButton.addEventListener('click', (event) => this.submitContactForm(event));
  }

  displayModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'block';
    document.querySelector('main').style.display = 'none';
    this.displayPhotographerName();
  }

  closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';

    document.querySelector('main').style.display = 'block';
  }

  displayPhotographerName() {
    const modalName = document.querySelector('.modal_title');
    modalName.textContent = `Contactez-moi ${this.name}`;
  }

  submitContactForm(e) {
    e.preventDefault();
    const firstName = document.querySelector('#firstNameInput');
    const lastName = document.querySelector('#lastNameInput');
    const email = document.querySelector('#emailInput');
    const message = document.querySelector('#messageInput');

    if (firstName.checkValidity()
      && lastName.checkValidity() && email.checkValidity() && message.checkValidity()) {
      this.closeModal();
    }
  }
}
