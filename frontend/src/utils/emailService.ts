type ContactEmailResponse = {
  success: boolean;
  message: string;
};

const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

const sendEmailJsTemplate = async (
  templateId: string,
  templateParams: Record<string, string>
) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !publicKey) {
    throw new Error('Email service public configuration is missing');
  }

  const response = await fetch(EMAILJS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: templateParams,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`EmailJS request failed: ${response.status} ${errorText}`);
  }
};

export const sendContactEmail = async (
  form: HTMLFormElement
): Promise<ContactEmailResponse> => {
  const formData = new FormData(form);
  const payload = {
    firstName: String(formData.get('firstName') || ''),
    lastName: String(formData.get('lastName') || ''),
    email: String(formData.get('email') || ''),
    countryCode: String(formData.get('countryCode') || ''),
    phone: String(formData.get('phone') || ''),
    message: String(formData.get('message') || ''),
  };

  if (!payload.firstName || !payload.email || !payload.phone || !payload.message) {
    throw new Error('firstName, email, phone, and message are required');
  }

  const contactTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID;

  if (!contactTemplateId || !autoReplyTemplateId) {
    throw new Error('Email templates are not configured for the frontend');
  }

  await sendEmailJsTemplate(contactTemplateId, payload);
  await sendEmailJsTemplate(autoReplyTemplateId, payload);

  return {
    success: true,
    message: 'Message sent successfully',
  };
};
