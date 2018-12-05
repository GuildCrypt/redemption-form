import { getWeb3, CouldNotEnableEthereumError, NoEthereumWalletDetectedError } from './lib/web3.js'

const contractAddressHex = 'a307b905140c82b37f2d7d806ef9d8858d30ac87'
const abi =  [{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_tokenURI","type":"string"}],"name":"setTokenURI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"sunsetInitiatedAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nextTokenId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"sunsetLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"initiateSunset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_tokenURI","type":"string"},{"name":"_sunsetLength","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_redemptionCodeHash","type":"bytes32"}],"name":"submitRedemptionCodeHash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"redemptionCodeHashSubmittedAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"redemptionCodeHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}]


let gc0
let redemptionCodeHashHex

getWeb3().then((web3) => {
  gc0 = web3.eth.contract(abi).at(`0x${contractAddressHex}`)
  checkOwner()
}, (error) => {
  if (error instanceof CouldNotEnableEthereumError) {
    alert('Could not enable Ethereum.')
    abort()
  } else if (error instanceof NoEthereumWalletDetectedError) {
    alert('No Ethereum wallet detected. Please install Metamask.')
    window.location.href = 'https://metamask.io/'
  } else {
    alert('Something went wrong. Please contact us at contact@guildcrypt.com')
    abort()
  }
})


const $tokenId = document.getElementById('tokenId')
const $identificationForm = document.getElementById('identification-form')
const $redemptionCode = document.getElementById('redemption-code')
const $redemptionCodeTxt = document.getElementById('redemption-code-txt')
const $redemptionCodeTxtDownload = document.getElementById('redemption-code-txt-download')
const $fileName = document.getElementById('file-name')
const $redemptionCodeCheckbox = document.getElementById('redemption-code-checkbox')
const $submitRedemptionCodeHash = document.getElementById('submit-redemption-code-hash')

if(document.location.hash) {
  $tokenId.value = document.location.hash.substr(1)
}


$identificationForm.onsubmit = generateRedemptionCode
$submitRedemptionCodeHash.onclick = submitRedemptionCodeHash


function zeroPadAscii(ascii, length) {
  return `${'0'.repeat(length - ascii.length)}${ascii}`
}

const fields = ['birthYearAscii', 'birthMonthAscii', 'birthDayAscii', 'lastNameAscii', 'firstNameAscii']
const divider = '\r\r-------------------------------\r\r'

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

async function checkOwner() {
  const tokenId = getTokenId()
  gc0.ownerOf(tokenId, (err, owner) => {
    if (owner !== web3.eth.accounts[0]) {
      if(confirm(`Token ${tokenId} belongs to ${owner} but you are using ${web3.eth.accounts[0]}. Switch accounts and try again.`)) {
        reload()
      } else {
        abort()
      }
    }
  })
}

function reload() {
  window.location.reload()
}

function abort() {
  window.location.href = 'https://guildcrypt.com/'
}

function getTokenId() {
  const tokenId = parseInt($tokenId.value)
  if (tokenId === NaN) {
    alert('Invalid token id')
    abort()
  } else {
    return tokenId
  }
}

async function generateRedemptionCode(event) {
  event.preventDefault()
  $redemptionCode.style.display = 'none'
  const formData = new FormData($identificationForm)

  const tokenId = getTokenId()

  const nonce = new Uint8Array(32)
  crypto.getRandomValues(nonce)
  const redemptionCodePojo = {
    nonce: nonce
  }
  fields.forEach((field) => {
    redemptionCodePojo[field] = formData.get(field)
  })
  redemptionCodePojo['birthYearAscii'] = zeroPadAscii(redemptionCodePojo['birthYearAscii'], 4)
  redemptionCodePojo['birthMonthAscii'] = zeroPadAscii(redemptionCodePojo['birthMonthAscii'], 2)
  redemptionCodePojo['birthDayAscii'] = zeroPadAscii(redemptionCodePojo['birthDayAscii'], 2)

  const redemptionCodeEncoding = redeemer.getRedemptionCodeEncoding(redemptionCodePojo)
  const redemptionCodeHash = new Uint8Array(await crypto.subtle.digest('SHA-256', redemptionCodeEncoding))

  const redemptionCodeEncodingBase2048English = base2048.english.encode(redemptionCodeEncoding)
  const redemptionCodeEncodingHex = toHexString(redemptionCodeEncoding)
  redemptionCodeHashHex = toHexString(redemptionCodeHash)
  const nonceHex = toHexString(nonce)

  const idPojo = {
  }
  fields.forEach((field) => {
    idPojo[field] = redemptionCodePojo[field]
  })

  const redemptionCodeJson = JSON.stringify({
    'version': "0",
    'tokenId': `${tokenId}`,
    'id': idPojo,
    redemptionCodeEncodingBase2048English,
    nonceHex,
    redemptionCodeEncodingHex,
    redemptionCodeHashHex
  }, null, 2)

  const epoch = Math.floor(((new Date).getTime())/ 1000)
  const fileName = `gc-${tokenId}-${epoch}.gc.json.txt`

  $fileName.innerText = fileName
  $redemptionCodeTxt.innerText = redemptionCodeJson

  $redemptionCodeTxtDownload.download = fileName
  $redemptionCodeTxtDownload.href= `data:text/plain;charset=utf-8,${redemptionCodeJson}`

  $redemptionCode.style.display = 'block'
}

function submitRedemptionCodeHash() {
  if (!$redemptionCodeCheckbox.checked) {
    alert('Please verify you have backed up your redemption code information.')
    return
  }
  const tokenId = getTokenId()
  const redemptionCodeHashHexPrefixed = `0x${redemptionCodeHashHex}`
  if(!confirm(`Submit token id ${tokenId} redemption code hash ${redemptionCodeHashHexPrefixed}? This will destroy your token and cannot be undone`)) {
    return
  } else {
    gc0.submitRedemptionCodeHash(tokenId, redemptionCodeHashHexPrefixed, (err) => {
      if (err) {
        alert(err.message)
      } else{
        alert('Redemption code submitted! Contact the tokenizer to redeem your asset')
        abort()
      }
    })
  }
}
