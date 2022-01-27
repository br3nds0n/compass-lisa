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

  async findAll (req, res) {
    const payload = req.query
    try {
      const result = await PersonService.findAll({
        _id: payload.id,
        modelo: payload.modelo,
        cor: payload.cor,
        ano: payload.ano,
        acessorios: payload.acessorios,
        quantidadePassageiros: payload.quantidadePassageiros,
        limit: payload.limit,
        skip: payload.skip
      })
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      const result = await PersonService.delete(id)
      return res.status(204).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async update (req, res) {
    const { id } = req.params
    const newPerson = req.body
    try {
      const result = await PersonService.update(id, newPerson)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

module.exports = new PersonController()
