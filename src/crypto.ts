import { decodeArrayBuffer, decodeText, encodeArrayBuffer, encodeText } from './lib/buffer';

export async function encryptUnlockData(
  content: string,
): Promise<{
  iv: string;
  key: string;
  encrypted: string;
}> {
  const iv: ArrayBuffer = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
    'encrypt',
    'decrypt',
  ]);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    typeof content === 'string' ? encodeText(content) : content,
  );
  const exportkey = await crypto.subtle.exportKey('raw', key);

  return {
    iv: encodeArrayBuffer(iv),
    key: encodeArrayBuffer(exportkey),
    encrypted: encodeArrayBuffer(encrypted),
  };
}

export async function decryptUnlockData(data: {
  iv: string;
  key: string;
  encrypted: string;
}): Promise<{
  content: string;
}> {
  const importkey = await crypto.subtle.importKey(
    'raw',
    decodeArrayBuffer(data.key),
    'AES-GCM',
    true,
    ['decrypt'],
  );
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: decodeArrayBuffer(data.iv),
    },
    importkey,
    decodeArrayBuffer(data.encrypted),
  );
  return { content: decodeText(decrypted) };
}
