import AppData from './data';

const Profile = {
  /**
   * Get all profiles from AppData
   * @returns {Array<Object>}
   * @example
   * Profile.getAll();
   * // [
   * //   {
   * //     uuid: 'uuid',
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
   * //   uuid: 'uuid',
   * //   name: 'Foo',
   * //   host: 'foo.com',
   * //   port: 25565,
   * //   key: 'bar',
   * //   isSecureConnection: false,
   * // }
   * // or undefined
   **/
  get: (uuid) => {
    const profiles = Profile.getAll();
    return profiles.find((profile) => profile.uuid === uuid);
  },

  /**
   * Add profile to AppData
   * @param {Object} profile
   * @returns {void}
   * @example
   * Profile.add({
   *  uuid: 'uuid',
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
    AppData.set('profiles', profiles);
  },

  /**
   * Update profile in AppData
   * @param {string} uuid
   * @param {Object} editedProfile
   * @returns {void}
   * @example
   * Profile.update('uuid', {
   * uuid: 'uuid',
   * name: 'Foo',
   * host: 'foo.com',
   * port: 25565,
   * key: 'bar',
   * isSecureConnection: false,
   * });
   **/
  update: (uuid, editedProfile) => {
    const profiles = Profile.getAll();
    const index = profiles.findIndex((p) => p.uuid === uuid);
    profiles[index] = editedProfile;
    AppData.set('profiles', profiles);
  },

  /**
   * Delete profile from AppData
   * @param {string} uuid
   * @returns {void}
   * @example
   * Profile.delete('uuid');
   * */
  delete: (uuid) => {
    const profiles = Profile.getAll();
    const index = profiles.findIndex((profile) => profile.uuid === uuid);
    profiles.splice(index, 1);
    AppData.set('profiles', profiles);
  }
};

export default Profile;
