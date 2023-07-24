import AppData from './data';

const supportedThemes = {
  dark: 'dark',
  light: 'light',
  auto: 'auto'
}

const Theme = {
  /**
   * Get theme from AppData
   * @returns {string}
   * @example
   * Theme.get();
   * // 'dark'
   * // or 'light'
   * // or 'auto'
   **/
  get: () => {
    return AppData.get('theme') || supportedThemes.auto;
  },

  /**
   * Update profile in AppData
   * @param {string} uuid
   * @param {Object} editedProfile
   * @returns {void}
   * @example
   * Profile.update(supportedThemes.dark);
   * Profile.update('dark');
   **/
  update: (mode) => {
    if (Object.values(supportedThemes).includes(mode))
      AppData.set('theme', mode);
    else
      throw new Error(`Unsupported theme mode: ${mode}`);
  },

  /**
   * Delete profile from AppData
   * @param {string} uuid
   * @returns {void}
   * @example
   * Theme.delete();
   * */
  delete: () => {
    AppData.set('theme', undefined);
  }
};

export default Theme;
export { supportedThemes };
