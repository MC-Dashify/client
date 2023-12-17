class LocalStorage {
  constructor() {}

  static setItem(key, item) {
    if (typeof window === "undefined") return;

    const data = JSON.stringify({
      data: item,
    });

    localStorage.setItem(key, Buffer.from(data).toString("base64"));
  }

  static getItem(key) {
    if (typeof window === "undefined") return null;

    const data = localStorage.getItem(key);
    if (!data) return null;

    try {
      const decoded = Buffer.from(data, "base64").toString("utf-8");
      const { data: item } = JSON.parse(decoded);

      return item;
    } catch (err) {
      console.error(err);

      return null;
    }
  }

  static removeItem(key) {
    if (typeof window === "undefined") return;

    localStorage.removeItem(key);
  }
}

export default LocalStorage;
