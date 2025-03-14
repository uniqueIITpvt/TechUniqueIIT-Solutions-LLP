import emailjs from '@emailjs/browser';

export const sendContactEmail = async (form: HTMLFormElement) => {
  try {
    // Send notification email to admin
    const adminNotification = await emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      form,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    // Only send auto-reply if admin notification was successful
    if (adminNotification.status === 200) {
      const formData = new FormData(form);

      // Send auto-reply to user
      const autoReply = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID!,
        {
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          countryCode: formData.get('countryCode'),
          phone: formData.get('phone'),
          message: formData.get('message'),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      return { adminNotification, autoReply };
    }

    return { adminNotification };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
