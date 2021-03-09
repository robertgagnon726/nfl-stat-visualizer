export const rgbGenerator = () => {
  let r = Math.floor(Math.random() * (255 + 1))
  let g = Math.floor(Math.random() * (255 + 1))
  let b = Math.floor(Math.random() * (255 + 1));

  return `${r},${g},${b}`
}