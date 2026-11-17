import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, phone } = body;

    // Validation
    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (typeof email !== 'string' || !email.trim() || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 });
    }
    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    if (phone && typeof phone !== 'string') {
      return NextResponse.json({ error: 'Invalid phone format' }, { status: 400 });
    }

    // Length constraints
    if (name.length > 100) {
      return NextResponse.json({ error: 'Name cannot exceed 100 characters' }, { status: 400 });
    }
    if (email.length > 254) {
      return NextResponse.json({ error: 'Email cannot exceed 254 characters' }, { status: 400 });
    }
    if (phone && phone.length > 30) {
      return NextResponse.json({ error: 'Phone cannot exceed 30 characters' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message cannot exceed 5000 characters' }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone ? phone.trim() : '';
    const trimmedMessage = message.trim();

    // Sanitize for HTML body
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safePhone = trimmedPhone ? escapeHtml(trimmedPhone) : 'Not provided';
    const safeMessage = escapeHtml(trimmedMessage).replace(/\r?\n/g, '<br/>');

    // Prevent header injection and limit subject length
    const subjectName = trimmedName.replace(/[\r\n]+/g, ' ').slice(0, 80);

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', 
      to: ['sk3356337@gmail.com'], 
      subject: `New Contact Message from ${subjectName}`,
      text: `New Message from Acme Contact Form\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nPhone: ${trimmedPhone || 'Not provided'}\n\nMessage:\n${trimmedMessage}`,
      html: `
        <h2>New Message from Acme Contact Form</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Message:</strong><br/>${safeMessage}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
