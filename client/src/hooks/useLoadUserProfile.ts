import { useDispatch } from 'react-redux';
import { getSpendilowUserProfile } from '../services/authenticated-users/authenticated-users-external-calls';
import { updateUserProfile } from '../redux/reducers/user/userProfileSlice';
import { ExternalCallResult } from '../shared/interfaces';
import { changeUserLoggedState } from '../redux/reducers/auth/userLoggedSlice';

export const useLoadUserProfile = async () => {
  const dispatch = useDispatch();

  const externalCallResult: ExternalCallResult | string = await getSpendilowUserProfile();

  dispatch(updateUserProfile(externalCallResult));
  dispatch(changeUserLoggedState(true));
};
