/**
 * Membersihkan objek DTO untuk operasi PATCH / Partial Update:
 * Menghapus/mengabaikan field yang bernilai:
 * - undefined
 * - null
 * - string kosong ("") atau string yang hanya berisi spasi whitespace
 *
 * Dengan demikian, data lama di database tidak akan tertimpa menjadi kosong
 * jika pengguna mengirimkan nilai empty saat PATCH.
 */
export function cleanUpdateData<T extends Record<string, any>>(obj: T): Partial<T> {
  if (!obj || typeof obj !== 'object') return {};
  const cleaned: any = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null) {
      continue;
    }
    if (typeof val === 'string' && val.trim() === '') {
      continue;
    }
    cleaned[key] = val;
  }
  return cleaned;
}
