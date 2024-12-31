import profileValidation from '../validations/profileValidations'

export default async function profileValidate (req: any, res: any, next: any) {
  const { body } = req
  const { error } = await profileValidation(body)
  if (error) {
    return res.status(400).json({ status: 'fail', message: error.message })
  }
  next()
}
