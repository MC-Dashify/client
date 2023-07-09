import AppData from './data';

const Profile = {
  /**
   * Get all profiles from AppData
   * @returns {Array<Object>}
   * @example
   * Profile.getAll();
   * // [
   * //   {
   * //     id: 'uuid',
   * //     name: 'Foo',
   * //     host: 'foo.com',
   * //     port: 25565,
   * //     key: 'bar',
   * //     isSecureConnection: false,
   * //     refreshInterval: 5,
   * //   },
   * //   ...
   * // ]
   **/
  getAll: () => {
    return AppData.get('profiles') || [];
  },

  /**
   * Get specified profile from AppData
   * @param {string} id
   * @returns {Object}
   * @example
   * Profile.get('uuid');
   * // {
   * //   id: 'uuid',
   * //   name: 'Foo',
   * //   host: 'foo.com',
   * //   port: 25565,
   * //   key: 'bar',
   * //   isSecureConnection: false,
   * //   refreshInterval: 5,
   * // }
   * // or undefined
   **/
  get: (id) => {
    const profiles = Profile.getAll();
    return profiles.find((profile) => profile.id === id);
  },

  /**
   * Add profile to AppData
   * @param {Object} profile
   * @returns {void}
   * @example
   * Profile.add({
   *  id: 'uuid',
   * name: 'Foo',
   * host: 'foo.com',
   * port: 25565,
   * key: 'bar',
   * isSecureConnection: false,
   * });
   **/
  add: (profile) => {
    const profiles = Profile.getAll();
    profiles.push(profile);
    // localStorage.setItem('profiles', JSON.stringify(profiles));
    AppData.set('profiles', profiles);
  },

  /**
   * Update profile in AppData
   * @param {string} id
   * @param {Object} editedProfile
   * @returns {void}
   * @example
   * Profile.update('uuid', {
   * id: 'uuid',
   * name: 'Foo',
   * host: 'foo.com',
   * port: 25565,
   * key: 'bar',
   * isSecureConnection: false,
   * });
   **/
  update: (id, editedProfile) => {
    const profiles = Profile.getAll();
    const index = profiles.findIndex((p) => p.id === id);
    profiles[index] = editedProfile;
    // localStorage.setItem('profiles', JSON.stringify(profiles));
    AppData.set('profiles', profiles);
  },

  /**
   * Delete profile from AppData
   * @param {string} id
   * @returns {void}
   * @example
   * Profile.delete('uuid');
   * */
  delete: (id) => {
    const profiles = Profile.getAll();
    const index = profiles.findIndex((profile) => profile.id === id);
    profiles.splice(index, 1);
    // localStorage.setItem('profiles', JSON.stringify(profiles));
    AppData.set('profiles', profiles);
  }
};

export default Profile;
