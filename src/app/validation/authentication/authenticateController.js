const schema = require('../../schema/personSchema')

class AuthenticateController {
  async authenticate (req, res) {
    const { email, senha } = req.body

    const user = await schema.findOne({ email, senha })

    if (!user) { return res.status(400).json({ error: 'not found' }) }

    res.send({ user })
  }
}

module.exports = new AuthenticateController()
