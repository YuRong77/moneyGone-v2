const fs = require('fs')
const XLSX = require('xlsx')
const axios = require('axios')

const downloadSheetsUrl =
  'https://docs.google.com/spreadsheets/d/1PGv7PdgHVPQP2gJJOE--qshY5B-EqO5fhBWsorqGmQs/export?format=xlsx'

const file = fs.createWriteStream(`${__dirname}/moneyGone.xlsx`)

function doRequest(url) {
  return new Promise((resolve, reject) => {
    axios(url, { responseType: 'stream' })
      .then((response) => {
        const pipe = response.data.pipe(file)
        resolve(pipe)
      })
      .catch((error) => {
        console.log('err', error)
        reject(error)
      })
  })
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const init = async () => {
  await doRequest(downloadSheetsUrl)
  await sleep(2000)
  let workbook = XLSX.readFile(`${__dirname}/moneyGone.xlsx`)
  let { SheetNames, Sheets } = workbook
  let localesMap = {}
  for (var i = 0; i < SheetNames.length; i++) {
    console.log('SheetNames[i]', SheetNames[i])
    let jsonSheet = XLSX.utils.sheet_to_json(Sheets[SheetNames[i]], {
      raw: false
    })

    jsonSheet.forEach((row) => {
      let { key, ...trans } = row
      for (let lang in trans) {
        localesMap[lang] = localesMap[lang] || {}
        localesMap[lang] = { ...localesMap[lang], [key]: trans[lang] }
      }
    })

    console.log('jsonSheet', jsonSheet)
    // console.log("localesMap", localesMap);
  }

  let path = `${__dirname}/lang`

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }

  for (let lang in localesMap) {
    let locale = localesMap[lang]
    fs.writeFileSync(`${path}/${lang}.json`, JSON.stringify(locale))
  }
}
init()
