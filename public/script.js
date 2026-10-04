document.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const form = document.getElementById('quoteForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('name')?.toString().trim() || 'Client';
      const phone = formData.get('phone')?.toString().trim() || 'Not provided';
      const email = formData.get('email')?.toString().trim() || 'Not provided';
      const projectType = formData.get('projectType')?.toString().trim() || 'Not specified';
      const message = formData.get('message')?.toString().trim() || 'No additional details provided';

      const whatsappNumber = '918130232125';
      const recipientEmail = 'mcelevationprojectss@gmail.com';

      const whatsappText = `Hello MC Elevation Projects,%0A%0ANew enquiry received:%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}%0AProject Type: ${encodeURIComponent(projectType)}%0ARequirement: ${encodeURIComponent(message)}`;

      const emailSubject = encodeURIComponent('New Interior Project Enquiry');
      const emailBody = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nProject Type: ${projectType}\n\nRequirement:\n${message}`
      );

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
      const mailtoUrl = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

      window.open(whatsappUrl, '_blank');
      window.location.href = mailtoUrl;

      status.textContent = `Thank you, ${name}. Your enquiry has been sent to WhatsApp and email.`;
      form.reset();
    });
  }
});
