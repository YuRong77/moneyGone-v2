export const langList = [
  { text: '繁體中文', value: 'zh-TW' },
  { text: '简体中文', value: 'zh-CN' },
  { text: 'English', value: 'en-US' },
  { text: '日本語', value: 'ja-JP' }
]

export const getLangText = (lang: string | undefined) => {
  const Lang = langList.find((item) => item.value === lang)
  if (Lang) return Lang.text
  return ''
}
