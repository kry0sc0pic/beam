import { json } from '@sveltejs/kit';
import { Resend } from 'resend';
import { authenticator } from 'otplib';
import type { RequestHandler } from './$types';
import { VITE_RESEND_API_KEY,VITE_TOTP_SECRET,VITE_TARGET_EMAIL  } from '$env/static/private'
import { EncryptionService } from '$lib/utils/encryption';

const resend = new Resend(VITE_RESEND_API_KEY);
const secret = VITE_TOTP_SECRET;

export const POST: RequestHandler = async ({ request }) => {
  try {
    console.log('Processing upload request...');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const encryptedData = formData.get('encryptedData') as string;
    const iv = formData.get('iv') as string;
    const key = formData.get('key') as string;
    const targetEmail = VITE_TARGET_EMAIL;

    if (!file || !encryptedData || !iv || !key) {
      console.log('Missing required fields');
      return json({ error: 'Missing required fields' }, { status: 400 });
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

    // Store the encrypted data and metadata
    // In a real application, you would store this in a database
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      encryptedData,
      iv,
      key,
      uploadedAt: new Date().toISOString()
    };

    // TODO: Store fileData in your database

    return json({ 
      success: true, 
      message: 'File uploaded successfully',
      fileId: 'unique-file-id' // Generate a unique ID for the file
    });

  } catch (error) {
    console.error('Upload error:', error);
    return json({ error: 'Failed to upload file' }, { status: 500 });
  }
};