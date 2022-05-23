import { createContext, useContext, useMemo } from 'react';
import {
  node, shape, string, instanceOf,
} from 'prop-types';

export const profileContext = createContext();

function ProfileProvider({ profileData, children }) {
  const profileDataMemo = useMemo(() => ({ profileData }), []);
  return (
    <profileContext.Provider value={profileDataMemo}>
      { children }
    </profileContext.Provider>
  );
}

ProfileProvider.propTypes = {
  profileData: shape({
    dateFormat: string,
    currencyLabel: string,
    currentCoutry: string,
    countries: instanceOf(Array),
  }),
  children: node,
};

ProfileProvider.defaultProps = {
  profileData: {},
  children: {},
};

export function useProfile() {
  const context = useContext(profileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export default ProfileProvider;
