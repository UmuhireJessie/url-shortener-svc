import SignUpValidation from '../validations/signupValidations'

export default async function signupValidate (req: any, res: any, next: any) {
  const { body } = req
  const { error } = await SignUpValidation(body)

  if (error) {
    const errorMessage: string = error.details.map((err: { message: string }) => err.message).join(' ')
    return res.status(400).json({ status: 'fail', message: errorMessage })
  }
  next()
}
