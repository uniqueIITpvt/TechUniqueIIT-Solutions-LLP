type ContactEmailResponse = {
  success: boolean;
  message: string;
};

export const sendContactEmail = async (form: HTMLFormElement) => {
  const formData = new FormData(form);
  const payload = {
    firstName: String(formData.get('firstName') || ''),
    lastName: String(formData.get('lastName') || ''),
    email: String(formData.get('email') || ''),
    countryCode: String(formData.get('countryCode') || ''),
    phone: String(formData.get('phone') || ''),
    message: String(formData.get('message') || ''),
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const response = await fetch(`${apiUrl}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ContactEmailResponse;

  if (!response.ok) {
    throw new Error(data.message || 'Failed to send message');
  }

  return data;
};
