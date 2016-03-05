import memoize from 'lru-memoize';
import { createValidator, required, email, minLength } from 'utils/validator';

const loginValidator = createValidator({
  email: [required, email],
  password: [required, minLength(6)]
});

export default memoize(10)(loginValidator);
