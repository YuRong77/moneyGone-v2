export const priceFormat = (value: number | undefined) => {
  if (!value) return 0
  return new Intl.NumberFormat('zh-TW', {
    style: 'decimal',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}
