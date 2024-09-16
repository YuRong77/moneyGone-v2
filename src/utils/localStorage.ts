function toStringify(value: any) {
  if (typeof value === 'object') return JSON.stringify(value)
  return value
}

function toJsonParse(value: string | null) {
  try {
    return value ? JSON.parse(value) : null
  } catch {
    return value
  }
}

export const Storage = {
  set: (name: string, value: any) => localStorage.setItem(name, toStringify(value)),
  get: (name: string) => toJsonParse(localStorage.getItem(name)),
  remove: (name: string) => localStorage.removeItem(name)
}
