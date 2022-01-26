function isValid (cpf) {
  let addition = 0
  let rest

  if (cpf === '00000000000' && cpf.length !== 11) return false

  for (let i = 1; i <= 9; i++) addition = addition + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  rest = (addition * 10) % 11

  if ((rest === 10) || (rest === 11)) rest = 0
  if (addition !== parseInt(cpf.substring(9, 10))) return false

  addition = 0
  for (let i = 1; i <= 10; i++) addition = addition + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  rest = (addition * 10) % 11

  if ((rest === 10) || (rest === 11)) rest = 0
  if (rest !== parseInt(cpf.substring(10, 11))) return false
  return true
}

module.exports = isValid
