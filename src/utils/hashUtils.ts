// utils/hashUtils.ts
export const hashPasswordWithSHA256 = async (password: string): Promise<string> => {
    // Szöveg átalakítása UTF-8 byte array-é
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    // SHA-256 hash generálása
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // ArrayBuffer átalakítása Base64 string-é
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
    
    return hashBase64;
  };