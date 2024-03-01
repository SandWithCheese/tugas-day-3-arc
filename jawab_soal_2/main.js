const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function readinput(query) {
  return new Promise((resolve) =>
    rl.question(query, (ans) => resolve(ans.trim()))
  )
}

async function main() {
  console.log("Selamat datang di permainan Muk Jji Pa!")
  console.log()

  while (true) {
    const start = await readinput(
      "Ketik (M) untuk main, (D) untuk melihat penjelasan permainan, (Q) untuk keluar dari permainan: "
    )
    console.log()

    if (start === "M") {
      console.log("Muk = Batu, Jji = Gunting, Ppa = Kertas")
      console.log("Contoh masukan: Muk")

      const playerHistory = []
      const botHistory = []

      let winner = null
      let currentTurnWinner = null

      while (winner === null) {
        console.log()
        const player = await readinput("Pemain, masukkan isyarat Anda: ")

        if (!["Muk", "Jji", "Ppa"].includes(player)) {
          console.log("Isyarat tidak valid")
          continue
        }

        const bot = ["Muk", "Jji", "Ppa"][Math.floor(Math.random() * 3)]

        console.log(`Bot: ${bot}`)
        console.log()

        if (currentTurnWinner === null) {
          if (
            (player === "Muk" && bot === "Jji") ||
            (player === "Jji" && bot === "Ppa") ||
            (player === "Ppa" && bot === "Muk")
          ) {
            currentTurnWinner = "player"
            playerHistory.push(player)
            botHistory.push(bot)
          } else if (player === bot) {
            playerHistory.push(player)
            botHistory.push(bot)
          } else {
            currentTurnWinner = "bot"
            playerHistory.push(player)
            botHistory.push(bot)
          }
        } else {
          if (currentTurnWinner === "player") {
            if (
              (player === "Muk" && bot === "Jji") ||
              (player === "Jji" && bot === "Ppa") ||
              (player === "Ppa" && bot === "Muk")
            ) {
              playerHistory.push(player)
              botHistory.push(bot)
            } else if (player === bot) {
              winner = "player"
              playerHistory.push(player)
              botHistory.push(bot)
            } else {
              currentTurnWinner = "bot"
              playerHistory.push(player)
              botHistory.push(bot)
            }
          } else {
            if (
              (player === "Muk" && bot === "Jji") ||
              (player === "Jji" && bot === "Ppa") ||
              (player === "Ppa" && bot === "Muk")
            ) {
              currentTurnWinner = "player"
              playerHistory.push(player)
              botHistory.push(bot)
            } else if (player === bot) {
              winner = "bot"
              playerHistory.push(player)
              botHistory.push(bot)
            } else {
              playerHistory.push(player)
              botHistory.push(bot)
            }
          }
        }

        if (currentTurnWinner === null) {
          console.log("Seri")
        } else {
          console.log("Pemenang sekarang:", currentTurnWinner)
        }
      }

      console.log()
      console.log("Hasil:")
      console.log("Player:", playerHistory.join(", "))
      console.log("Bot:", botHistory.join(", "))
      console.log()
      console.log(`Pemenang: ${winner}`)
    } else if (start === "D") {
      console.log(
        'Permainan dimulai dengan permainan batu-gunting-kertas, pemenangnya menjadi "si penyerang". Penyerang harus menyebutkan isyarat berikutnya (menyebutkan muk, jji, atau ppa) dan mengubah tangannya sesuai dengan isyarat yang disebutkannya, biasanya disebutkan dengan berteriak. Intinya adalah bagaimana membuat lawan main menggunakan isyarat yang sama dengan "si penyerang", maka "si penyerang" menang. Setelah para pemain mengubah tangannya, pemain yang menggunakan isyarat yang sama dengan "si penyerang" kalah, dan penyerang berikutnya adalah pengguna isyarat yang menang dengan peraturan Batu-Gunting-Kertas lalu proses diulang kembali.'
      )
    } else if (start === "Q") {
      break
    } else {
      console.log("Input tidak valid")
    }

    console.log()
  }

  console.log("Terima kasih telah bermain!")
  rl.close()
}

main()
