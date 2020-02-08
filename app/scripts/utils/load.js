export async function loadJson(url) {
  const res = await fetch(url)
  return res.json()
}

export async function loadImage(src, callback) {
  return new Promise(res => {
    const img = new Image()
    img.onload = () => res(img)
    img.src = src
    if (callback) {
      callback(img)
    }
  })
}
