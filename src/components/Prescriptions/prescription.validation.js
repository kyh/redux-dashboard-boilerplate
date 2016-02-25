import memoize from 'lru-memoize';
import { createValidator, required } from 'utils/validator';

const prescriptionValidator = createValidator({
  name: [required],
  pharmacy: [required]
});

export default memoize(10)(prescriptionValidator);
