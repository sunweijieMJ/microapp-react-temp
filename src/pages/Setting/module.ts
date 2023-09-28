import { NAMESPACE } from './action';
import reducer from './reducer';
import saga from './saga';

const module = {
  namespace: NAMESPACE,
  reducer,
  saga,
} as const;

export default module;
