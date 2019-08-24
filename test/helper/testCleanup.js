module.exports = async function cleanup(model) {
  await model.destroy({ where: {} })
}
