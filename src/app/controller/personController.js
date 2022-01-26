const PersonService = require('../service/personService')

class PersonController {
  async create (req, res) {
    try {
      const result = await PersonService.create(req.body)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

module.exports = new PersonController()
