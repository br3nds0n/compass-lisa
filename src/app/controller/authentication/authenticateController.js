const bcrypt = require('bcryptjs')
const schema = require('../../schema/personSchema')

const generateToken = require('../../helper/generateToken')

class AuthenticateController {
  async authenticate (req, res) {
    const { email, senha } = req.body
    const user = await schema.findOne({ email }).select('+senha')

    if (!user) {
      return res.status(400).json({ error: 'user not found' })
    }

    if (!await bcrypt.compare(senha, user.senha)) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    user.senha = undefined

    res.send({
      user,
      token: generateToken({ id: user.id })
    })
  }
}

module.exports = new AuthenticateController()
