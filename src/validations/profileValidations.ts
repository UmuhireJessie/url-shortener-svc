import joi from "joi";

async function profileValidation(data: any) {
  const schema = joi.object({
    firstName: joi.string().min(3).label("firstName"),
    lastName: joi.string().min(3).label("lastName"),
    email: joi.string().email().label("email"),
  });
  return await schema.validate(data, {
    abortEarly: false,
  });
}

export default profileValidation;
