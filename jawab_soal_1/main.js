const axios = require("axios")

const url = "https://seleksi-sea-2023.vercel.app/api/movies"

async function main() {
  const response = await axios.get(url)
  const movies = response.data
  console.log(movies)
}

main()
