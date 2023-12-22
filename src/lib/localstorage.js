class LocalStorage {
  constructor() {}

  /**
   * 데이터를 {"data": 데이터} 형식으로 저장하는 것은 타입을 최대한
   * 보존하기 위함입니다.
   */

  static setItem(key, item) {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, JSON.stringify({ data: item }));
  }

  static getItem(key) {
    if (typeof window === "undefined") return null;

    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item).data;
    } catch (e) {
      return null;
    }
  }

  static removeItem(key) {
    if (typeof window === "undefined") return;

    localStorage.removeItem(key);
  }

  static clear() {
    if (typeof window === "undefined") return;

    localStorage.clear();
  }
}

export default LocalStorage;
