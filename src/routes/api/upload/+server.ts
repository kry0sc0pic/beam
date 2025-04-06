import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import { authenticator } from 'otplib';
import type { RequestHandler } from './$types';
import { VITE_RESEND_API_KEY, VITE_TOTP_SECRET, VITE_TARGET_EMAIL } from '$env/static/private';

const resend = new Resend(VITE_RESEND_API_KEY);
const secret = VITE_TOTP_SECRET;

export const POST: RequestHandler = async ({ request }) => {
  try {
    console.log('Processing upload request...');
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const targetEmail = VITE_TARGET_EMAIL;

    if (!files || files.length === 0) {
      console.log('No files provided');
      return json({ error: 'No files provided' }, { status: 400 });
    }

    // Verify TOTP code
    console.log('Verifying TOTP code...');
    
    const isValid = authenticator.verify({
      token: formData.get('code') as string,
      secret,
    });

    if (!isValid) {
      console.log('Invalid authentication code');
      return json({ error: 'Invalid authentication code' }, { status: 401 });
    }
    console.log('TOTP code verified successfully');

    // Store the files metadata
    // In a real application, you would store this in a database
    const fileData = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString()
    }));

    // Send email with files
    console.log('Sending email with files...');
    const attachments = await Promise.all(files.map(async file => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer())
    })));

    const r = await resend.emails.send({
      from: 'Beam <beam@krishaay.dev>',
      to: targetEmail,
      subject: `[BEAM] New files received (${files.length} files)`,
      html: `
        <h1>New Files Received</h1>
        <p>You have received ${files.length} new file(s) via Beam:</p>
        <ul>
          ${files.map(file => `
            <li>${file.name} (${formatFileSize(file.size)})</li>
          `).join('')}
        </ul>
        <p>Files are attached to this email.</p>
      `,
      attachments
    });
    if(r.error === null) {
      console.log('Email sent successfully');

    return json({ 
      success: true, 
      message: 'Files uploaded and sent successfully', // Generate unique IDs for the files
    });
    } else {
      console.error(r.error.message);
      return json({
        success: false,
        message: "Failed to send."
      })
    }

  } catch (error) {
    console.error('Upload error:', error);
    return json({ error: 'Failed to upload files' }, { status: 500 });
  }
};

function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}