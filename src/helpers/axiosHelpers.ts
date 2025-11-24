function legacyEncode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

function isURLSearchParams(value: Record<string, any>): value is URLSearchParams {
  return typeof URLSearchParams !== 'undefined' && value instanceof URLSearchParams;
}

/**
 * Serialize params in legacy axios style.
 * This was removed in axios v0.28.0 and has been added here for backward compatibility.
 *
 * Usage: axios.create({ paramsSerializer: { serialize: legacyParamsSerializer } })
 *
 * See: https://github.com/axios/axios/pull/4734
 *
 * @param {Object} params - The parameters to serialize
 * @returns {string} The serialized query string
 */
export function legacyParamsSerializer(params: Record<string, any>): string {
  if (!params) {
    return '';
  }

  if (isURLSearchParams(params)) {
    return params.toString();
  }

  const parts: string[] = [];

  Object.keys(params).forEach((rawKey: string) => {
    let val: any = params[rawKey];
    if (val === null || typeof val === 'undefined') {
      return;
    }

    let key: string = rawKey;

    if (Array.isArray(val)) {
      key = key + '[]';
    } else {
      val = [val];
    }

    val.forEach((v: any) => {
      if (v === null || typeof v === 'undefined') {
        return;
      }
      if (v instanceof Date) {
        v = v.toISOString();
      } else if (v && typeof v === 'object') {
        v = JSON.stringify(v);
      }
      parts.push(legacyEncode(key) + '=' + legacyEncode(v));
    });
  });

  return parts.join('&');
}
