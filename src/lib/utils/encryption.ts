import { Buffer } from 'buffer';

export interface EncryptedData {
    iv: string;
    encryptedData: string;
    key: string;
}

export class EncryptionService {
    private static async generateKey(): Promise<CryptoKey> {
        return window.crypto.subtle.generateKey(
            {
                name: 'AES-GCM',
                length: 256,
            },
            true,
            ['encrypt', 'decrypt']
        );
    }

    private static async exportKey(key: CryptoKey): Promise<string> {
        const exported = await window.crypto.subtle.exportKey('raw', key);
        return Buffer.from(exported).toString('base64');
    }

    private static async importKey(keyString: string): Promise<CryptoKey> {
        const keyBuffer = Buffer.from(keyString, 'base64');
        return window.crypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
    }

    public static async encrypt(data: ArrayBuffer): Promise<EncryptedData> {
        const key = await this.generateKey();
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encryptedData = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            key,
            data
        );

        return {
            iv: Buffer.from(iv).toString('base64'),
            encryptedData: Buffer.from(encryptedData).toString('base64'),
            key: await this.exportKey(key),
        };
    }

    public static async decrypt(encryptedData: EncryptedData): Promise<ArrayBuffer> {
        const key = await this.importKey(encryptedData.key);
        const iv = Buffer.from(encryptedData.iv, 'base64');
        const data = Buffer.from(encryptedData.encryptedData, 'base64');

        return window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            key,
            data
        );
    }
} 