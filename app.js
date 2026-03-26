// Steam Market Helper v1.8.0 (MV3-friendly)
// - Автоматический расчёт комиссии на основе разницы между ценой продажи и полученной суммой
// - Убрано ручное указание процентов комиссии
// - Локализация: русский и английский
// - Прибыль рассчитывается на основе фактически полученной суммы
// - Возможность указать цену покупки 0 (бесплатный предмет)
// - Поддержка количества предметов в одной сделке
// - Групповые операции (выбор, продажа, удаление)
// - Расширенный поиск (по заметкам, датам, ценам)
// - Тёмная/светлая тема
// - Фильтрация и поиск
// - Сортировка таблицы
// - Горячие клавиши
// - Подтверждение удаления
// - Заметки к сделкам
// - Графики (4 вида) с поддержкой смены языка
// - Кнопка поддержки (донаты)

const APP = "steam-market-helper";
const VERSION = "1.3.2";

const STORAGE = {
  sync: {
    currency: "settings.currency",
    language: "settings.language",
    theme: "settings.theme"
  },
  local: {
    history: "history.rows"
  },
  legacy: {
    localStorageHistory: "steam_market_history_v2",
    localStorageCurrency: "steam_currency_v1",
    localStorageLanguage: "steam_language_v1"
  }
};

const LANGUAGES = {
  ru: {
    // Общие
    appName: "Steam Market Helper",
    currency: "Валюта",
    cancel: "Отмена",
    delete: "Удалить",

    // Тема
    theme: "Тема",
    themeLight: "Светлая",
    themeDark: "Тёмная",
    themeSystem: "Системная",

    // Попап
    openHistory: "📜 Открыть историю",
    description: "Добавляй покупки, потом указывай сколько получил на руки — прибыль посчитается автоматически",
    addPurchase: "➕ Добавить покупку",
    itemName: "📦 Название предмета",
    itemPlaceholder: "Напр. Case Revolution",
    buyPrice: "💰 Цена покупки",
    buyPriceHint: "Укажите 0 если предмет получен бесплатно",
    quantity: "🔢 Количество",
    quantityHint: "Сколько предметов куплено (по умолчанию 1)",
    currencyHint: "Валюта влияет только на отображение",
    syncNote: "☁️ Настройки синхронизируются через Chrome. История хранится локально — для переноса используй экспорт/импорт JSON.",
    resetFields: "🔄 Сбросить поля",

    // Модальное окно продажи
    sellTitle: "💰 Продажа предмета",
    sellPrice: "🏷️ Цена продажи",
    sellPriceHint: "Укажите цену, по которой продали предмет",
    receivedAmount: "💵 Сколько получил на руки *",
    receivedHint: "Фактическая сумма после продажи (обязательно)",
    feeCalculated: "📊 Комиссия рассчитывается автоматически",
    feeAmount: "Сумма комиссии",
    feePercent: "Процент комиссии",
    confirmSell: "✅ Продать",

    // Групповые операции
    bulkMode: "✅ Групповые операции",
    bulkModeExit: "❌ Выйти из группового режима",
    bulkSelected: "Выбрано:",
    bulkSelectAll: "Выбрать все",
    bulkDeselectAll: "Снять все",
    bulkSell: "💰 Продать выбранные",
    bulkDelete: "🗑️ Удалить выбранные",
    bulkSellTitle: "💰 Групповая продажа",
    bulkSellPriceHint: "Цена продажи одного предмета",
    bulkSellReceivedHint: "Сколько получено за один предмет",
    bulkFeeCalculated: "Комиссия с одной продажи",

    // Расширенный поиск
    searchInNotes: "🔍 В заметках",
    dateFrom: "Дата с",
    dateTo: "Дата по",
    customRange: "Свой диапазон",
    priceFrom: "Цена от",
    priceTo: "Цена до",
    priceType: "Тип цены",
    priceBuy: "Покупка",
    priceSell: "Продажа",
    priceProfit: "Прибыль",
    priceAll: "Все типы",
    priceRangeHint: "Фильтр по диапазону цен",

    // История
    historyTitle: "📊 История сделок",
    exportJSON: "💾 Экспорт JSON",
    importJSON: "📂 Импорт JSON",
    wipeAll: "🗑️ Очистить всё",

    // Фильтры
    searchPlaceholder: "Поиск по предмету...",
    filterAll: "Все",
    filterOpen: "Куплено",
    filterSold: "Продано",
    filterToday: "Сегодня",
    filterWeek: "Неделя",
    filterMonth: "Месяц",
    filterYear: "Год",

    // Сортировка
    sortAsc: "▲",
    sortDesc: "▼",

    // Заметки
    notes: "📝 Заметки",
    notesPlaceholder: "Добавить заметку...",
    notesSave: "Сохранить",
    notesCancel: "Отмена",

    // Таблица
    date: "Дата",
    time: "Время",
    item: "Предмет",
    totalBuy: "Всего",
    buy: "Цена/шт",
    sell: "Продажа/шт",
    received: "На руки/шт",
    fee: "Комиссия",
    profit: "Прибыль",
    margin: "Маржа",
    status: "Статус",
    actions: "Действия",

    // Статусы
    sold: "✅ Продано",
    bought: "⏳ Куплено",

    // Статистика
    totalItems: "📦 Всего предметов:",
    totalInvested: "💰 Всего инвестиций:",
    avgPricePerItem: "💰 Средняя цена:",
    totalProfit: "📈 Общая прибыль:",
    avgMargin: "📊 Средняя маржа:",
    soldCount: "✅ Продано:",

    // Графики
    charts: "📊 Графики и аналитика",
    profitChart: "🏆 Топ-10 прибыльных сделок",
    monthlyChart: "📅 Прибыль по месяцам",
    profitDistribution: "📊 Распределение по доходности",
    marginDynamics: "📈 Динамика маржи",
    noData: "Нет данных для отображения",
    lossMaking: "Убыточные",
    breakEven: "Безубыточные",
    profitable: "Прибыльные",

    // Уведомления
    alertNoItem: "Укажи название предмета",
    alertNegativePrice: "Цена покупки не может быть отрицательной",
    alertInvalidQuantity: "Количество должно быть больше 0",
    alertNoSellPrice: "Укажи цену продажи",
    alertNoReceived: "Укажи сколько получил на руки после продажи",
    alertReceivedGreaterThanSell: "Полученная сумма не может быть больше цены продажи",
    alertWrongFile: "Это не бэкап Steam Market Helper",
    alertNoOpenDeals: "Нет доступных для продажи сделок среди выбранных",
    alertBulkNoSelection: "Нет выбранных сделок",
    alertBulkSellSuccess: "✅ Продано {count} сделок",
    alertBulkDeleteConfirm: "Удалить {count} {cases}?",
    alertBulkDeleteSuccess: "✅ Удалено {count} сделок",
    confirmWipe: "Точно очистить историю?",
    confirmImport: "Импорт заменит текущую историю целиком. Продолжить?",
    confirmDeleteMessage: "Вы уверены, что хотите удалить эту сделку?",

    // Кнопки
    sellAction: "💰 Продать",

    // Донаты
    donate: "❤️ Поддержать проект",
    donateTitle: "❤️ Поддержать проект",
    donateDescription: "Если расширение помогает вам в трейдинге, вы можете поддержать его развитие. Любая помощь приветствуется!",
    donatePaypal: "PayPal",
    donatePaypalDesc: "Быстрый перевод картой или со счёта",
    donateCoffee: "Buy me a coffee",
    donateCoffeeDesc: "Разовое пожертвование",
    donatePatreon: "Patreon",
    donatePatreonDesc: "Регулярная поддержка",
    donateCrypto: "Криптовалюта",
    donateCryptoDesc: "BTC, ETH, USDT",
    donateThanks: "Спасибо, что пользуетесь расширением! ❤️",

    // Сайдбар
    sidebarHistory: "История",
    sidebarRateUs: "Rate Us",
    sidebarCharts: "Графики",
    sidebarDonate: "Донат",
    sidebarCalculator: "Калькулятор",
    sidebarHistoryTitle: "📊 История сделок",
    sidebarChartsTitle: "📈 Графики и аналитика",

    // Экспорт CSV
    exportCSV: "📊 Экспорт CSV",

    // Теги
    tags: "🏷️ Теги",
    tagsPlaceholder: "cs2, knife, rare...",
    tagsFilterAll: "Все теги",
    addTag: "Добавить тег",

    // Редактирование
    editTitle: "✏️ Редактировать сделку",
    editSave: "💾 Сохранить",
    editAction: "✏️",
    dupTitle: "📋 Дублировать сделку",

    // Undo удаления
    undoDelete: "↩ Отменить",
    deletedDeal: "Сделка удалена",

    // Последние сделки в popup
    recentDealsTitle: "📋 Последние сделки",
    noRecentDeals: "Нет добавленных сделок",

    // Рекомендация цены
    adviceBreakeven: "⚠️ В ноль",

    // Частичная продажа
    sellQuantity: "🔢 Сколько продаёшь",
    partialSellNote: "Остаток останется открытым",

    // Месяцы
    months: {
      1: "Янв", 2: "Фев", 3: "Мар", 4: "Апр", 5: "Май", 6: "Июн",
      7: "Июл", 8: "Авг", 9: "Сен", 10: "Окт", 11: "Ноя", 12: "Дек"
    }
  },

  en: {
    // Common
    appName: "Steam Market Helper",
    currency: "Currency",
    cancel: "Cancel",
    delete: "Delete",

    // Theme
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",

    // Popup
    openHistory: "📜 Open History",
    description: "Add purchases, then enter how much you received — profit calculated automatically",
    addPurchase: "➕ Add Purchase",
    itemName: "📦 Item Name",
    itemPlaceholder: "E.g. Case Revolution",
    buyPrice: "💰 Buy Price",
    buyPriceHint: "Enter 0 if item was free",
    quantity: "🔢 Quantity",
    quantityHint: "Number of items purchased (default 1)",
    currencyHint: "Currency only affects display",
    syncNote: "☁️ Settings sync via Chrome. History stored locally — use JSON export/import for backup.",
    resetFields: "🔄 Reset Fields",

    // Sell modal
    sellTitle: "💰 Sell Item",
    sellPrice: "🏷️ Sell Price",
    sellPriceHint: "Enter the price you sold the item for",
    receivedAmount: "💵 Amount Received *",
    receivedHint: "Actual amount after sale (required)",
    feeCalculated: "📊 Fee calculated automatically",
    feeAmount: "Fee amount",
    feePercent: "Fee percentage",
    confirmSell: "✅ Sell",

    // Bulk operations
    bulkMode: "✅ Bulk operations",
    bulkModeExit: "❌ Exit bulk mode",
    bulkSelected: "Selected:",
    bulkSelectAll: "Select all",
    bulkDeselectAll: "Deselect all",
    bulkSell: "💰 Sell selected",
    bulkDelete: "🗑️ Delete selected",
    bulkSellTitle: "💰 Bulk sell",
    bulkSellPriceHint: "Sell price per item",
    bulkSellReceivedHint: "Amount received per item",
    bulkFeeCalculated: "Fee per sale",

    // Advanced search
    searchInNotes: "🔍 In notes",
    dateFrom: "Date from",
    dateTo: "Date to",
    customRange: "Custom range",
    priceFrom: "Price from",
    priceTo: "Price to",
    priceBuy: "Buy",
    priceSell: "Sell",
    priceProfit: "Profit",
    priceAll: "All types",
    priceRangeHint: "Filter by price range",

    // History
    historyTitle: "📊 Trade History",
    exportJSON: "💾 Export JSON",
    importJSON: "📂 Import JSON",
    wipeAll: "🗑️ Clear All",

    // Filters
    searchPlaceholder: "Search by item...",
    filterAll: "All",
    filterOpen: "Bought",
    filterSold: "Sold",
    filterToday: "Today",
    filterWeek: "Week",
    filterMonth: "Month",
    filterYear: "Year",

    // Sorting
    sortAsc: "▲",
    sortDesc: "▼",

    // Notes
    notes: "📝 Notes",
    notesPlaceholder: "Add note...",
    notesSave: "Save",
    notesCancel: "Cancel",

    // Table
    date: "Date",
    time: "Time",
    item: "Item",
    totalBuy: "Total",
    buy: "Price/ea",
    sell: "Sell/ea",
    received: "Received/ea",
    fee: "Fee",
    profit: "Profit",
    margin: "Margin",
    status: "Status",
    actions: "Actions",

    // Statuses
    sold: "✅ Sold",
    bought: "⏳ Bought",

    // Statistics
    totalItems: "📦 Total items:",
    totalInvested: "💰 Total invested:",
    avgPricePerItem: "💰 Avg price:",
    totalProfit: "📈 Total profit:",
    avgMargin: "📊 Avg margin:",
    soldCount: "✅ Sold:",

    // Charts
    charts: "📊 Charts & Analytics",
    profitChart: "🏆 Top 10 Profitable Deals",
    monthlyChart: "📅 Monthly Profit",
    profitDistribution: "📊 Profit Distribution",
    marginDynamics: "📈 Margin Dynamics",
    noData: "No data to display",
    lossMaking: "Loss Making",
    breakEven: "Break Even",
    profitable: "Profitable",

    // Alerts
    alertNoItem: "Please enter item name",
    alertNegativePrice: "Buy price cannot be negative",
    alertInvalidQuantity: "Quantity must be greater than 0",
    alertNoSellPrice: "Please enter sell price",
    alertNoReceived: "Please enter amount received after sale",
    alertReceivedGreaterThanSell: "Received amount cannot be greater than sell price",
    alertWrongFile: "This is not a Steam Market Helper backup",
    alertNoOpenDeals: "No open deals available for sale among selected",
    alertBulkNoSelection: "No deals selected",
    alertBulkSellSuccess: "✅ Sold {count} deals",
    alertBulkDeleteConfirm: "Delete {count} {cases}?",
    alertBulkDeleteSuccess: "✅ Deleted {count} deals",
    confirmWipe: "Clear history?",
    confirmImport: "Import will replace current history. Continue?",
    confirmDeleteMessage: "Are you sure you want to delete this deal?",

    // Buttons
    sellAction: "💰 Sell",

    // Donate
    donate: "❤️ Support project",
    donateTitle: "❤️ Support project",
    donateDescription: "If the extension helps you in trading, you can support its development. Any help is welcome!",
    donatePaypal: "PayPal",
    donatePaypalDesc: "Fast transfer by card or account",
    donateCoffee: "Buy me a coffee",
    donateCoffeeDesc: "One-time donation",
    donatePatreon: "Patreon",
    donatePatreonDesc: "Monthly support",
    donateCrypto: "Cryptocurrency",
    donateCryptoDesc: "BTC, ETH, USDT",
    donateThanks: "Thank you for using the extension! ❤️",

    // Sidebar
    sidebarHistory: "History",
    sidebarRateUs: "Rate Us",
    sidebarCharts: "Charts",
    sidebarDonate: "Donate",
    sidebarCalculator: "Calc",
    sidebarHistoryTitle: "📊 Trade History",
    sidebarChartsTitle: "📈 Charts & Analytics",

    // Export CSV
    exportCSV: "📊 Export CSV",

    // Tags
    tags: "🏷️ Tags",
    tagsPlaceholder: "cs2, knife, rare...",
    tagsFilterAll: "All tags",
    addTag: "Add tag",

    // Edit
    editTitle: "✏️ Edit Deal",
    editSave: "💾 Save",
    editAction: "✏️",
    dupTitle: "📋 Duplicate deal",

    // Undo
    undoDelete: "↩ Undo",
    deletedDeal: "Deal deleted",

    // Recent deals in popup
    recentDealsTitle: "📋 Recent Deals",
    noRecentDeals: "No deals added yet",

    // Price advice
    adviceBreakeven: "⚠️ Break even",

    // Partial sell
    sellQuantity: "🔢 Quantity to sell",
    partialSellNote: "Remainder stays open",

    // Months
    months: {
      1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
      7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
    }
  }
};
const $ = (id) => document.getElementById(id);

function toNum(v) {
  const n = Number(String(v ?? "").replace(",", ".").trim());
  return Number.isFinite(n) ? n : 0;
}

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function currencySymbol(code) {
  switch (code) {
    case "UAH": return "₴";
    case "RUB": return "₽";
    case "USD": return "$";
    case "EUR": return "€";
    case "KZT": return "₸";
    case "PLN": return "zł";
    default: return "";
  }
}

function money(n, currencyCode) {
  const cur = currencyCode || state.currency || "UAH";
  return `${round2(n).toFixed(2)} ${currencySymbol(cur)}`;
}

function nowParts() {
  const d = new Date();
  const pad = (x) => String(x).padStart(2, "0");
  const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  return { date, time };
}

function uid() {
  try {
    if (crypto && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch {}
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Функция для склонения существительных
function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

// Функция для подсветки текста
function highlightText(text, query) {
  if (!query || !text) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// ---------- Локализация ----------
let currentLanguage = "ru";

function t(key, replacements = {}) {
  const keys = key.split(".");
  let value = LANGUAGES[currentLanguage];
  
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      // Fallback to Russian
      let fallback = LANGUAGES.ru;
      for (const fk of keys) {
        fallback = fallback?.[fk];
      }
      value = fallback || key;
      break;
    }
  }
  
  if (typeof value === 'string' && Object.keys(replacements).length > 0) {
    return value.replace(/{(\w+)}/g, (match, p1) => replacements[p1] || match);
  }
  
  return value || key;
}

function setLanguage(lang) {
  if (lang === "ru" || lang === "en") {
    currentLanguage = lang;
    saveLanguage(lang);
    updateUILanguage();
    
    setTimeout(() => {
      updateCharts();
    }, 100);
  }
}

function updateUILanguage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });
  
  document.querySelectorAll("[data-i18n-hint]").forEach(el => {
    const key = el.getAttribute("data-i18n-hint");
    if (el.classList.contains("hint")) {
      el.textContent = t(key);
    }
  });
  
  if (document.title.includes("Калькулятор")) {
    document.title = t("appName") + " — " + (currentLanguage === "ru" ? "Калькулятор" : "Calculator");
  } else {
    document.title = t("appName") + " — " + (currentLanguage === "ru" ? "История" : "History");
  }
  
  // Кнопка группового режима
  const bulkBtn = $("bulkModeBtn");
  if (bulkBtn) {
    bulkBtn.textContent = state.bulkMode ? t("bulkModeExit") : t("bulkMode");
  }

  // Кнопка доната в popup (нет сайдбара — просто текст)
  const donateBtnPopup = $("donateBtn");
  if (donateBtnPopup && !document.getElementById("labelDonate")) {
    donateBtnPopup.textContent = t("donate");
  }

  // Подписи сайдбара — обновляем напрямую по id
  const sidebarLabelMap = {
    labelHistory:    "sidebarHistory",
    labelCharts:     "sidebarCharts",
    labelDonate:     "sidebarDonate",
    labelRateUs:     "sidebarRateUs",
    labelCalculator: "sidebarCalculator",
  };
  for (const [elId, key] of Object.entries(sidebarLabelMap)) {
    const el = document.getElementById(elId);
    if (el) el.textContent = t(key);
  }

  // title на кнопках сайдбара
  const sidebarHistoryBtn = $("sidebarHistoryBtn");
  if (sidebarHistoryBtn) sidebarHistoryBtn.title = t("sidebarHistoryTitle");
  const sidebarChartsBtn = $("sidebarChartsBtn");
  if (sidebarChartsBtn) sidebarChartsBtn.title = t("sidebarChartsTitle");

  // Подзаголовок топбара
  const topbarSubtitle = $("topbarSubtitle");
  if (topbarSubtitle) {
    const activeBtn = document.querySelector(".sidebar-btn.active[data-section]");
    const activeSection = activeBtn ? activeBtn.dataset.section : "history";
    topbarSubtitle.textContent = t(activeSection === "charts" ? "sidebarChartsTitle" : "sidebarHistoryTitle");
  }
  
  setTimeout(() => {
    updateCharts();
  }, 50);
}

function setupLanguageUI() {
  const langSelect = $("languageSelect");
  if (!langSelect) return;
  
  langSelect.value = currentLanguage;
  
  langSelect.addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
}

// ---------- Тема ----------
let currentTheme = "system";

async function loadTheme() {
  const got = await storageGet("sync", ["settings.theme"]);
  currentTheme = got["settings.theme"] || "system";
  applyTheme();
}

async function saveTheme(theme) {
  currentTheme = theme;
  await storageSet("sync", { "settings.theme": theme });
  applyTheme();
}

function applyTheme() {
  const html = document.documentElement;
  
  if (currentTheme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    html.setAttribute("data-theme", currentTheme);
  }
  
  setTimeout(() => {
    updateCharts();
  }, 100);
}

function setupThemeUI() {
  const themeSelect = $("themeSelect");
  if (!themeSelect) return;
  
  themeSelect.value = currentTheme;
  
  themeSelect.addEventListener("change", (e) => {
    saveTheme(e.target.value);
  });
  
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (currentTheme === "system") {
      applyTheme();
    }
  });
}

// ---------- Storage wrapper ----------
function hasChromeStorage() {
  return typeof chrome !== "undefined" && chrome.storage && chrome.storage.local && chrome.storage.sync;
}

function storageGet(area, keys) {
  return new Promise((resolve) => {
    if (!hasChromeStorage()) {
      const out = {};
      const arr = Array.isArray(keys) ? keys : [keys];
      for (const k of arr) {
        const raw = localStorage.getItem(k);
        try { out[k] = raw ? JSON.parse(raw) : undefined; } catch { out[k] = undefined; }
      }
      resolve(out);
      return;
    }
    chrome.storage[area].get(keys, (items) => resolve(items || {}));
  });
}

function storageSet(area, obj) {
  return new Promise((resolve) => {
    if (!hasChromeStorage()) {
      for (const [k, v] of Object.entries(obj)) localStorage.setItem(k, JSON.stringify(v));
      resolve();
      return;
    }
    chrome.storage[area].set(obj, () => resolve());
  });
}

// ---------- App state ----------
const state = {
  currency: "UAH",
  rows: [],
  sellTargetId: null,
  notesTargetId: null,
  editTargetId: null,
  bulkMode: false,
  selectedDeals: new Set(),
  bulkTargetIds: [],
  searchInNotes: false,
  dateFrom: null,
  dateTo: null,
  filterTag: "all",
  currentPage: 1,
  pageSize: 10
};

// ---------- Migration from old localStorage keys ----------
async function migrateLegacyIfNeeded() {
  const cur = await storageGet("local", [STORAGE.local.history]);
  const existing = cur[STORAGE.local.history];
  if (Array.isArray(existing) && existing.length) return;

  let legacyRows = [];
  try {
    const raw = localStorage.getItem(STORAGE.legacy.localStorageHistory);
    const arr = raw ? JSON.parse(raw) : [];
    if (Array.isArray(arr)) legacyRows = arr;
  } catch {}

  if (legacyRows.length) {
    const migratedRows = legacyRows.map(r => ({ ...r, quantity: r.quantity || 1 }));
    await storageSet("local", { [STORAGE.local.history]: migratedRows });
  }

  try {
    const rawCur = localStorage.getItem(STORAGE.legacy.localStorageCurrency);
    if (rawCur) await storageSet("sync", { [STORAGE.sync.currency]: rawCur });
  } catch {}
  
  try {
    const rawLang = localStorage.getItem(STORAGE.legacy.localStorageLanguage);
    if (rawLang) await storageSet("sync", { [STORAGE.sync.language]: rawLang });
  } catch {}
}

async function loadSettings() {
  const got = await storageGet("sync", [STORAGE.sync.currency, STORAGE.sync.language]);
  state.currency = got[STORAGE.sync.currency] || "UAH";
  
  const savedLang = got[STORAGE.sync.language];
  if (savedLang === "en" || savedLang === "ru") {
    currentLanguage = savedLang;
  }
}

async function saveCurrency(code) {
  state.currency = code;
  await storageSet("sync", { [STORAGE.sync.currency]: code });
}

async function saveLanguage(lang) {
  await storageSet("sync", { [STORAGE.sync.language]: lang });
}

async function loadHistory() {
  const got = await storageGet("local", [STORAGE.local.history]);
  const rows = got[STORAGE.local.history];
  state.rows = Array.isArray(rows) ? rows : [];
}

async function saveHistory(rows) {
  state.rows = rows;
  await storageSet("local", { [STORAGE.local.history]: rows });
}

// ---------- UI: History ----------
function openHistory() {
  const url = chrome.runtime?.getURL("history.html") || "history.html";
  window.open(url, "_blank");
}

// ---------- UI: Custom currency dropdown ----------
function currencyLabel(code) {
  return `${currencySymbol(code)} ${code}`;
}

function closeCurrencyMenu() {
  const menu = $("currencyMenu");
  const btn = $("currencyBtn");
  if (menu) menu.classList.add("hidden");
  if (btn) btn.setAttribute("aria-expanded", "false");
}

function openCurrencyMenu() {
  const menu = $("currencyMenu");
  const btn = $("currencyBtn");
  if (menu) menu.classList.remove("hidden");
  if (btn) btn.setAttribute("aria-expanded", "true");
}

function setupCurrencyUI() {
  const hidden = $("currency");
  const btn = $("currencyBtn");
  const label = $("currencyBtnLabel");
  const menu = $("currencyMenu");
  const wrap = $("currencySelect");
  
  if (!hidden || !btn || !label || !menu || !wrap) return;

  const sync = () => {
    hidden.value = state.currency;
    label.textContent = currencyLabel(state.currency);
    menu.querySelectorAll(".cselect-item").forEach((it) => {
      const code = it.getAttribute("data-currency");
      it.setAttribute("aria-selected", code === state.currency ? "true" : "false");
    });
  };

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (menu.classList.contains("hidden")) {
      openCurrencyMenu();
    } else {
      closeCurrencyMenu();
    }
  };

  btn.removeEventListener("click", toggle);
  btn.addEventListener("click", toggle);

  menu.addEventListener("wheel", (e) => e.stopPropagation());

  menu.addEventListener("click", async (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const code = t.getAttribute("data-currency");
    if (!code) return;
    await saveCurrency(code);
    sync();
    renderHistory();
    closeCurrencyMenu();
  });

  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Node)) return;
    if (!wrap.contains(e.target)) {
      closeCurrencyMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCurrencyMenu();
      closeSellModal();
      closeNotesModal();
      closeBulkSellModal();
      closeDonateModal();
    }
  });

  closeCurrencyMenu();
  sync();
}

// ---------- Main actions ----------
function resetFields() {
  if ($("itemName")) $("itemName").value = "";
  if ($("buyPrice")) $("buyPrice").value = "";
  if ($("itemQuantity")) $("itemQuantity").value = "1";
  if ($("itemTags")) $("itemTags").value = "";
}

async function addToHistory() {
  const item = ($("itemName")?.value ?? "").trim();
  const buy = toNum($("buyPrice")?.value);
  const quantity = toNum($("itemQuantity")?.value) || 1;
  const currency = $("currency")?.value || state.currency;
  const tags = parseTagsInput($("itemTags")?.value || "");

  if (!item) { alert(t("alertNoItem")); return; }
  if (buy < 0) { alert(t("alertNegativePrice")); return; }
  if (quantity < 1) { alert(t("alertInvalidQuantity")); return; }

  const { date, time } = nowParts();
  const rows = [...state.rows];
  rows.unshift({
    id: uid(), date, time, item, buy, quantity, tags,
    sell: null, sellerGets: null, feeAmount: null,
    feePercent: null, profit: null, margin: null,
    status: "open", currency, notes: ""
  });

  await saveHistory(rows);
  renderHistory();
  renderRecentDealsPopup();
  notifyHistoryUpdated();
  resetFields();
  maybeShowRateUs();
}

function calculateFromSellerGets(buy, sellerGets) {
  const profit = round2(sellerGets - buy);
  const margin = buy > 0 
    ? round2((profit / buy) * 100) 
    : (profit > 0 ? 100 : (profit < 0 ? -100 : 0));
  
  return { profit, margin };
}

// ---------- Sell modal ----------
function openSellModal(id) {
  const r = state.rows.find((x) => x.id === id);
  if (!r) return;

  state.sellTargetId = id;
  const qty = r.quantity || 1;
  const totalBuy = (r.buy || 0) * qty;

  $("sellItemLabel").textContent = `${r.item} | ${t("buy")} ${money(r.buy, r.currency)}/шт | Всего: ${money(totalBuy, r.currency)}`;

  // Поле количества
  const qtyInput = $("sellModalQuantity");
  if (qtyInput) {
    qtyInput.value = qty;
    qtyInput.max = qty;
  }
  const qtyMax = $("sellQtyMax");
  if (qtyMax) qtyMax.textContent = `/ ${qty}`;

  // Скрываем поле кол-ва если 1 штука
  const qtyLabel = $("sellQuantityLabel");
  if (qtyLabel) qtyLabel.style.display = qty > 1 ? "" : "none";

  $("sellModalPrice").value = "";
  $("sellModalReceived").value = "";

  if ($("calculatedFeeAmount")) $("calculatedFeeAmount").textContent = "—";
  if ($("calculatedFeePercent")) $("calculatedFeePercent").textContent = "—";

  $("sellModal").classList.remove("hidden");
  $("sellModalPrice").focus();

  $("sellModalPrice").addEventListener("input", updateCalculatedFee);
  $("sellModalReceived").addEventListener("input", updateCalculatedFee);

  closeCurrencyMenu();
}

function updateCalculatedFee() {
  const sellPrice = toNum($("sellModalPrice").value);
  const received = toNum($("sellModalReceived").value);
  
  const feeAmountEl = $("calculatedFeeAmount");
  const feePercentEl = $("calculatedFeePercent");
  
  if (!feeAmountEl || !feePercentEl) return;
  
  if (sellPrice > 0 && received > 0 && received < sellPrice) {
    const feeAmount = round2(sellPrice - received);
    const feePercent = round2((feeAmount / sellPrice) * 100);
    
    feeAmountEl.textContent = money(feeAmount, state.currency);
    feePercentEl.textContent = feePercent.toFixed(2) + "%";
  } else {
    feeAmountEl.textContent = "—";
    feePercentEl.textContent = "—";
  }
}

function closeSellModal() {
  state.sellTargetId = null;
  $("sellModal").classList.add("hidden");
  
  if ($("sellModalPrice")) {
    $("sellModalPrice").removeEventListener("input", updateCalculatedFee);
  }
  if ($("sellModalReceived")) {
    $("sellModalReceived").removeEventListener("input", updateCalculatedFee);
  }
}

async function confirmSell() {
  if (!state.sellTargetId) return;

  const sellInput = toNum($("sellModalPrice").value);
  const sellerGets = toNum($("sellModalReceived").value);

  if (sellInput <= 0) { alert(t("alertNoSellPrice")); return; }
  if (sellerGets <= 0) { alert(t("alertNoReceived")); return; }
  if (sellerGets > sellInput) { alert(t("alertReceivedGreaterThanSell")); return; }

  const idx = state.rows.findIndex((x) => x.id === state.sellTargetId);
  if (idx < 0) return;
  const r = state.rows[idx];

  const totalQty = r.quantity || 1;
  const sellQty = Math.min(Math.max(1, Math.floor(toNum($("sellModalQuantity")?.value) || totalQty)), totalQty);

  const { profit, margin } = calculateFromSellerGets(r.buy, sellerGets);
  const feeAmount = round2(sellInput - sellerGets);
  const feePercent = round2((feeAmount / sellInput) * 100);

  const rows = [...state.rows];

  if (sellQty >= totalQty) {
    // Продаём всё — обычное поведение
    rows[idx] = {
      ...r,
      sell: sellInput, sellerGets, feeAmount, feePercent,
      profit, margin, status: "sold"
    };
  } else {
    // Частичная продажа — разбиваем запись на две
    const { date, time } = nowParts();

    // Проданная часть — новая запись
    const soldEntry = {
      ...r,
      id: uid(), date, time,
      quantity: sellQty,
      sell: sellInput, sellerGets, feeAmount, feePercent,
      profit, margin, status: "sold"
    };

    // Остаток — уменьшаем количество, статус остаётся open
    rows[idx] = {
      ...r,
      quantity: totalQty - sellQty,
      sell: null, sellerGets: null, feeAmount: null,
      feePercent: null, profit: null, margin: null,
      status: "open"
    };

    // Вставляем проданную запись сразу после оставшейся
    rows.splice(idx + 1, 0, soldEntry);
  }

  await saveHistory(rows);
  closeSellModal();
  renderHistory();
}

// ---------- Заметки ----------
function openNotesModal(id) {
  const r = state.rows.find((x) => x.id === id);
  if (!r) return;
  
  state.notesTargetId = id;
  $("notesModalText").value = r.notes || "";
  $("notesModal").classList.remove("hidden");
  $("notesModalText").focus();
}

function closeNotesModal() {
  state.notesTargetId = null;
  $("notesModal").classList.add("hidden");
}

async function saveNotes() {
  if (!state.notesTargetId) return;
  
  const notes = $("notesModalText").value.trim();
  const idx = state.rows.findIndex((x) => x.id === state.notesTargetId);
  
  if (idx >= 0) {
    const rows = [...state.rows];
    rows[idx] = { ...rows[idx], notes };
    await saveHistory(rows);
    renderHistory();
  }
  
  closeNotesModal();
}

// ---------- Групповые операции ----------
function toggleBulkMode() {
  state.bulkMode = !state.bulkMode;
  state.selectedDeals.clear();
  
  const checkboxHeader = document.getElementById('checkboxHeader');
  if (checkboxHeader) {
    checkboxHeader.style.display = state.bulkMode ? 'table-cell' : 'none';
  }
  
  renderHistory();
  
  const bulkBtn = document.getElementById('bulkModeBtn');
  if (bulkBtn) {
    bulkBtn.textContent = state.bulkMode ? t("bulkModeExit") : t("bulkMode");
  }
  
  const bulkPanel = document.getElementById('bulkActionsPanel');
  if (bulkPanel) {
    bulkPanel.classList.toggle('hidden', !state.bulkMode);
  }
}

function toggleSelectDeal(id) {
  if (state.selectedDeals.has(id)) {
    state.selectedDeals.delete(id);
  } else {
    state.selectedDeals.add(id);
  }
  renderHistory();
  updateBulkSelectionInfo();
}

function selectAllDeals() {
  const visibleRows = filterRows(state.rows);
  visibleRows.forEach(r => state.selectedDeals.add(r.id));
  renderHistory();
  updateBulkSelectionInfo();
}

function deselectAllDeals() {
  state.selectedDeals.clear();
  renderHistory();
  updateBulkSelectionInfo();
}

function updateBulkSelectionInfo() {
  const infoEl = document.getElementById("bulkSelectionInfo");
  if (infoEl) {
    const count = state.selectedDeals.size;
    infoEl.textContent = `${t("bulkSelected")} ${count} ${getNoun(count, t("deal"), t("deals2"), t("deals5"))}`;
  }
  
  const hasSelection = state.selectedDeals.size > 0;
  const bulkSellBtn = document.getElementById("bulkSellBtn");
  const bulkDeleteBtn = document.getElementById("bulkDeleteBtn");
  
  if (bulkSellBtn) bulkSellBtn.disabled = !hasSelection;
  if (bulkDeleteBtn) bulkDeleteBtn.disabled = !hasSelection;
}

function openBulkSellModal() {
  const selectedIds = Array.from(state.selectedDeals);
  const selectedDeals = state.rows.filter(r => selectedIds.includes(r.id) && r.status === 'open');
  
  if (selectedDeals.length === 0) {
    alert(t("alertNoOpenDeals"));
    return;
  }
  
  state.bulkTargetIds = selectedDeals.map(d => d.id);
  
  const totalItems = selectedDeals.reduce((sum, d) => sum + (d.quantity || 1), 0);
  const totalBuy = selectedDeals.reduce((sum, d) => sum + ((d.buy || 0) * (d.quantity || 1)), 0);
  const avgPrice = totalBuy / totalItems;
  
  document.getElementById("bulkSellInfo").innerHTML = `
    <strong>${selectedDeals.length}</strong> ${getNoun(selectedDeals.length, t("deal"), t("deals2"), t("deals5"))}, 
    <strong>${totalItems}</strong> ${getNoun(totalItems, t("item"), t("items2"), t("items5"))}, 
    ${t("totalBuy")} ${money(totalBuy, state.currency)}<br>
    ${t("avgPricePerItem")} ${money(avgPrice, state.currency)}
  `;
  
  document.getElementById("bulkSellModal").classList.remove("hidden");
  document.getElementById("bulkSellPrice").focus();
  
  document.getElementById("bulkSellPrice").value = '';
  document.getElementById("bulkSellReceived").value = '';
  document.getElementById("bulkCalculatedFee").textContent = '—';
  document.getElementById("bulkCalculatedPercent").textContent = '—';
}

function closeBulkSellModal() {
  state.bulkTargetIds = [];
  document.getElementById("bulkSellModal").classList.add("hidden");
}

function updateBulkCalculatedFee() {
  const sellPrice = toNum(document.getElementById("bulkSellPrice").value);
  const received = toNum(document.getElementById("bulkSellReceived").value);
  
  const feeEl = document.getElementById("bulkCalculatedFee");
  const percentEl = document.getElementById("bulkCalculatedPercent");
  
  if (sellPrice > 0 && received > 0 && received < sellPrice) {
    const fee = round2(sellPrice - received);
    const percent = round2((fee / sellPrice) * 100);
    
    feeEl.textContent = money(fee, state.currency);
    percentEl.textContent = percent.toFixed(2) + '%';
  } else {
    feeEl.textContent = '—';
    percentEl.textContent = '—';
  }
}

async function confirmBulkSell() {
  if (state.bulkTargetIds.length === 0) return;
  
  const sellPrice = toNum(document.getElementById("bulkSellPrice").value);
  const received = toNum(document.getElementById("bulkSellReceived").value);
  
  if (sellPrice <= 0) {
    alert(t("alertNoSellPrice"));
    return;
  }
  
  if (received <= 0) {
    alert(t("alertNoReceived"));
    return;
  }
  
  if (received > sellPrice) {
    alert(t("alertReceivedGreaterThanSell"));
    return;
  }
  
  const feeAmount = round2(sellPrice - received);
  const feePercent = round2((feeAmount / sellPrice) * 100);
  
  const rows = [...state.rows];
  let updatedCount = 0;
  
  rows.forEach((r, idx) => {
    if (state.bulkTargetIds.includes(r.id) && r.status === 'open') {
      const { profit, margin } = calculateFromSellerGets(r.buy, received);
      rows[idx] = {
        ...r,
        sell: sellPrice,
        sellerGets: received,
        feeAmount: feeAmount,
        feePercent: feePercent,
        profit: profit,
        margin: margin,
        status: "sold"
      };
      updatedCount++;
    }
  });
  
  await saveHistory(rows);
  
  state.selectedDeals.clear();
  state.bulkTargetIds = [];
  closeBulkSellModal();
  
  const checkboxHeader = document.getElementById('checkboxHeader');
  if (checkboxHeader) {
    checkboxHeader.style.display = 'none';
  }
  
  renderHistory();
  
  alert(t("alertBulkSellSuccess", { count: updatedCount }));
}

async function confirmBulkDelete() {
  const selectedIds = Array.from(state.selectedDeals);
  const count = selectedIds.length;
  
  if (count === 0) {
    alert(t("alertBulkNoSelection"));
    return;
  }
  
  if (!confirm(t("alertBulkDeleteConfirm", { 
    count: count, 
    cases: getNoun(count, t("deal"), t("deals2"), t("deals5")) 
  }))) return;
  
  const rows = state.rows.filter(r => !selectedIds.includes(r.id));
  await saveHistory(rows);
  
  state.selectedDeals.clear();
  
  const checkboxHeader = document.getElementById('checkboxHeader');
  if (checkboxHeader) {
    checkboxHeader.style.display = 'none';
  }
  
  renderHistory();
  
  alert(t("alertBulkDeleteSuccess", { count: count }));
}

// ---------- Фильтрация и расширенный поиск ----------
let filterStatus = "all";
let filterDate = "all";
let searchQuery = "";

function filterRows(rows) {
  return rows.filter(r => {
    // Фильтр по статусу
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    
    // Фильтр по дате (быстрый)
    if (filterDate !== "all") {
      const dealDate = new Date(r.date);
      const today = new Date();
      const diffTime = today - dealDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      switch (filterDate) {
        case "today": if (diffDays > 1) return false; break;
        case "week": if (diffDays > 7) return false; break;
        case "month": if (diffDays > 30) return false; break;
        case "year": if (diffDays > 365) return false; break;
      }
    }
    
    // Фильтр по пользовательскому диапазону дат
    if (state.dateFrom || state.dateTo) {
      const dealDate = new Date(r.date);
      if (state.dateFrom) {
        const fromDate = new Date(state.dateFrom);
        if (dealDate < fromDate) return false;
      }
      if (state.dateTo) {
        const toDate = new Date(state.dateTo);
        toDate.setHours(23, 59, 59);
        if (dealDate > toDate) return false;
      }
    }
    
    // Фильтр по тегу
    if (state.filterTag && state.filterTag !== "all") {
      if (!Array.isArray(r.tags) || !r.tags.includes(state.filterTag)) return false;
    }

    // Поиск по тексту
    if (searchQuery) {
      const itemMatch = r.item.toLowerCase().includes(searchQuery.toLowerCase());
      const notesMatch = state.searchInNotes && r.notes && r.notes.toLowerCase().includes(searchQuery.toLowerCase());
      if (!itemMatch && !notesMatch) return false;
    }
    
    return true;
  });
}

function resetPage() { state.currentPage = 1; }

function setupFilterUI() {
  const searchInput = $("searchInput");
  const filterStatusSelect = $("filterStatus");
  const filterDateSelect = $("filterDate");
  const searchInNotesCheckbox = $("searchInNotes");
  const dateFromInput = $("dateFrom");
  const dateToInput = $("dateTo");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      resetPage(); renderHistory();
    });
  }
  
  if (filterStatusSelect) {
    filterStatusSelect.addEventListener("change", (e) => {
      filterStatus = e.target.value;
      resetPage(); renderHistory();
    });
  }
  
  if (filterDateSelect) {
    filterDateSelect.addEventListener("change", (e) => {
      filterDate = e.target.value;
      if (filterDate === "custom") {
        $("customDateRange")?.classList.remove("hidden");
      } else {
        $("customDateRange")?.classList.add("hidden");
        state.dateFrom = null;
        state.dateTo = null;
      }
      resetPage(); renderHistory();
    });
  }
  
  if (searchInNotesCheckbox) {
    searchInNotesCheckbox.addEventListener("change", (e) => {
      state.searchInNotes = e.target.checked;
      resetPage(); renderHistory();
    });
  }
  
  if (dateFromInput) {
    dateFromInput.addEventListener("change", (e) => {
      state.dateFrom = e.target.value;
      resetPage(); renderHistory();
    });
  }
  
  if (dateToInput) {
    dateToInput.addEventListener("change", (e) => {
      state.dateTo = e.target.value;
      resetPage(); renderHistory();
    });
  }
  
  const filterTagSelect = document.getElementById("filterTag");
  if (filterTagSelect) {
    filterTagSelect.addEventListener("change", (e) => {
      state.filterTag = e.target.value;
      resetPage(); renderHistory();
    });
  }
}

// ---------- Сортировка таблицы ----------
let sortColumn = "date";
let sortDirection = "desc";

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    let valA, valB;
    
    switch (sortColumn) {
      case "date":
        valA = a.date + " " + a.time;
        valB = b.date + " " + b.time;
        break;
      case "item":
        valA = a.item || "";
        valB = b.item || "";
        break;
      case "buy":
        valA = a.buy || 0;
        valB = b.buy || 0;
        break;
      case "sell":
        valA = a.sell || 0;
        valB = b.sell || 0;
        break;
      case "received":
        valA = a.sellerGets || 0;
        valB = b.sellerGets || 0;
        break;
      case "profit":
        valA = (a.profit || 0) * (a.quantity || 1);
        valB = (b.profit || 0) * (b.quantity || 1);
        break;
      case "margin":
        valA = a.margin || 0;
        valB = b.margin || 0;
        break;
      default:
        valA = a.date + " " + a.time;
        valB = b.date + " " + b.time;
    }
    
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
}

function setupSortUI() {
  const headers = document.querySelectorAll("#historyTable th[data-sort]");
  
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const column = header.getAttribute("data-sort");
      
      if (sortColumn === column) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortColumn = column;
        sortDirection = "asc";
      }
      
      resetPage(); renderHistory();
    });
  });
}

function updateSortIndicators() {
  const headers = document.querySelectorAll("#historyTable th[data-sort]");
  
  headers.forEach(header => {
    const column = header.getAttribute("data-sort");
    const indicator = header.querySelector(".sort-indicator");
    
    if (indicator) {
      if (column === sortColumn) {
        indicator.textContent = sortDirection === "asc" ? t("sortAsc") : t("sortDesc");
      } else {
        indicator.textContent = "";
      }
    }
  });
}

// ---------- Горячие клавиши ----------
function setupHotkeys() {
  document.addEventListener("keydown", (e) => {
    // Escape — закрываем любую открытую модалку
    if (e.key === "Escape") {
      if ($("sellModal") && !$("sellModal").classList.contains("hidden"))       { closeSellModal();     return; }
      if ($("editModal") && !$("editModal").classList.contains("hidden"))       { closeEditModal();     return; }
      if ($("notesModal") && !$("notesModal").classList.contains("hidden"))     { closeNotesModal();    return; }
      if ($("donateModal") && !$("donateModal").classList.contains("hidden"))   { closeDonateModal();   return; }
      if ($("bulkSellModal") && !$("bulkSellModal").classList.contains("hidden")) { closeBulkSellModal(); return; }
    }

    // Не реагируем если фокус в поле ввода
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    // Используем e.code — работает независимо от раскладки клавиатуры
    switch (e.code) {
      case "KeyN":
        if ($("itemName") && $("buyPrice")) {
          $("itemName").focus();
        }
        break;

      case "KeyH":
        // В popup — открываем историю, на странице истории — фокус в поиск
        if ($("searchInput")) {
          $("searchInput").focus();
          e.preventDefault();
        } else {
          openHistory();
        }
        break;

      case "KeyS":
        if ($("searchInput")) {
          $("searchInput").focus();
          e.preventDefault();
        }
        break;

      case "KeyB":
        if ($("bulkModeBtn")) {
          toggleBulkMode();
        }
        break;
    }
  });

  // Enter в поле покупки — добавить сделку
  $("buyPrice")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addToHistory();
  });

  // Ctrl+Enter в модалке продажи — подтвердить
  $("sellModalPrice")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.ctrlKey) confirmSell();
  });
}

// ---------- Undo удаления ----------
let undoTimer = null;
let pendingDeleteId = null;
let pendingDeleteRows = null;

function showDeleteConfirm(id) {
  // Сохраняем состояние для undo
  pendingDeleteId = id;
  pendingDeleteRows = [...state.rows];

  // Удаляем сразу
  const rows = state.rows.filter((x) => x.id !== id);
  saveHistory(rows);
  renderHistory();

  // Показываем тост с кнопкой отмены
  showUndoToast();
}

function showUndoToast() {
  // Убираем предыдущий тост если есть
  const existing = document.getElementById("undoToast");
  if (existing) existing.remove();
  if (undoTimer) clearTimeout(undoTimer);

  const toast = document.createElement("div");
  toast.id = "undoToast";
  toast.className = "undo-toast";
  toast.innerHTML = `
    <span class="undo-toast-text">${t("deletedDeal")}</span>
    <button class="undo-toast-btn" id="undoDeleteBtn">${t("undoDelete")}</button>
    <div class="undo-toast-progress"></div>
  `;
  document.body.appendChild(toast);

  // Анимация появления
  requestAnimationFrame(() => toast.classList.add("undo-toast-visible"));

  document.getElementById("undoDeleteBtn").addEventListener("click", () => {
    if (pendingDeleteRows) {
      saveHistory(pendingDeleteRows);
      renderHistory();
    }
    dismissUndoToast();
  });

  undoTimer = setTimeout(dismissUndoToast, 5000);
}

function dismissUndoToast() {
  if (undoTimer) { clearTimeout(undoTimer); undoTimer = null; }
  pendingDeleteId = null;
  pendingDeleteRows = null;
  const toast = document.getElementById("undoToast");
  if (toast) {
    toast.classList.remove("undo-toast-visible");
    setTimeout(() => toast.remove(), 300);
  }
}



// ---------- Рекомендация цены продажи ----------
// Steam комиссия: 13% (10% Steam + 3% разработчик)
const STEAM_FEE = 0.13;

function calcMinSellPrice(buyPrice, targetProfitPct = 0) {
  // Чтобы получить buyPrice * (1 + targetProfitPct/100) на руки,
  // нужно выставить: желаемое_на_руки / (1 - STEAM_FEE)
  const wantOnHand = buyPrice * (1 + targetProfitPct / 100);
  return round2(wantOnHand / (1 - STEAM_FEE));
}

function updatePriceAdvice() {
  const adviceBox = document.getElementById("priceAdvice");
  if (!adviceBox) return;

  const buy = toNum(document.getElementById("buyPrice")?.value);

  if (!buy || buy <= 0) {
    adviceBox.classList.add("hidden");
    return;
  }

  adviceBox.classList.remove("hidden");

  const cur = $("currency")?.value || state.currency;
  const values = {
    adviceBreakeven: calcMinSellPrice(buy, 0),
    adviceTarget10:  calcMinSellPrice(buy, 10),
    adviceTarget25:  calcMinSellPrice(buy, 25),
    adviceTarget50:  calcMinSellPrice(buy, 50),
  };

  for (const [id, val] of Object.entries(values)) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.textContent = money(val, cur);
    el.title = "Нажми чтобы скопировать";
    el.onclick = () => {
      navigator.clipboard?.writeText(String(val)).catch(() => {});
      el.textContent = "✓ Скопировано";
      setTimeout(() => { el.textContent = money(val, cur); }, 1200);
    };
  }
}


function getAllTags() {
  const tags = new Set();
  state.rows.forEach(r => (r.tags || []).forEach(tag => tags.add(tag)));
  return [...tags].sort();
}

function updateTagFilterUI() {
  const select = document.getElementById("filterTag");
  if (!select) return;
  const current = state.filterTag;
  const tags = getAllTags();
  select.innerHTML = `<option value="all">${t("tagsFilterAll")}</option>`;
  tags.forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = `🏷️ ${tag}`;
    if (tag === current) opt.selected = true;
    select.appendChild(opt);
  });
  if (current !== "all") select.value = current;
}

function parseTagsInput(val) {
  return val.split(/[,;\s]+/).map(s => s.trim().toLowerCase()).filter(Boolean);
}

// ---------- Редактирование сделок ----------
function openEditModal(id) {
  const r = state.rows.find(x => x.id === id);
  if (!r) return;
  state.editTargetId = id;

  document.getElementById("editItemName").value = r.item || "";
  document.getElementById("editBuyPrice").value = r.buy ?? "";
  document.getElementById("editQuantity").value = r.quantity || 1;
  document.getElementById("editTags").value = (r.tags || []).join(", ");
  document.getElementById("editNotes").value = r.notes || "";

  document.getElementById("editModal").classList.remove("hidden");
  document.getElementById("editItemName").focus();
}

function closeEditModal() {
  state.editTargetId = null;
  document.getElementById("editModal").classList.add("hidden");
}

async function confirmEdit() {
  if (!state.editTargetId) return;
  const idx = state.rows.findIndex(x => x.id === state.editTargetId);
  if (idx < 0) return;

  const item = document.getElementById("editItemName").value.trim();
  if (!item) { alert(t("alertNoItem")); return; }

  const buy = toNum(document.getElementById("editBuyPrice").value);
  if (buy < 0) { alert(t("alertNegativePrice")); return; }

  const quantity = toNum(document.getElementById("editQuantity").value) || 1;
  if (quantity < 1) { alert(t("alertInvalidQuantity")); return; }

  const tags = parseTagsInput(document.getElementById("editTags").value);
  const notes = document.getElementById("editNotes").value.trim();

  const rows = [...state.rows];
  const old = rows[idx];

  // Пересчитываем прибыль если изменилась цена покупки и сделка закрыта
  let profit = old.profit;
  let margin = old.margin;
  if (old.status === "sold" && old.sellerGets != null && buy !== old.buy) {
    const result = calculateFromSellerGets(buy, old.sellerGets);
    profit = result.profit;
    margin = result.margin;
  }

  rows[idx] = { ...old, item, buy, quantity, tags, notes, profit, margin };
  await saveHistory(rows);
  closeEditModal();
  renderHistory();
}

// ---------- Синхронизация между popup и history ----------
function notifyHistoryUpdated() {
  // Записываем timestamp в storage — history.html его поймает через onChanged
  if (typeof chrome !== "undefined" && chrome.storage) {
    chrome.storage.local.set({ "_historyUpdatedAt": Date.now() });
  }
}

function listenForHistoryUpdates() {
  if (typeof chrome === "undefined" || !chrome.storage?.onChanged) return;
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes["_historyUpdatedAt"]) {
      loadHistory().then(() => {
        renderHistory();
        renderRecentDealsPopup();
      });
    }
  });
}

// ---------- Дублирование сделки ----------
async function duplicateDeal(id) {
  const r = state.rows.find(x => x.id === id);
  if (!r) return;

  const { date, time } = nowParts();
  const copy = {
    ...r,
    id: uid(), date, time,
    sell: null, sellerGets: null, feeAmount: null,
    feePercent: null, profit: null, margin: null,
    status: "open"
  };

  const rows = [...state.rows];
  // Вставляем копию сразу после оригинала
  const idx = rows.findIndex(x => x.id === id);
  rows.splice(idx + 1, 0, copy);

  await saveHistory(rows);
  renderHistory();
  renderRecentDealsPopup();
}

// ---------- Автодополнение названий ----------
function setupAutocomplete() {
  const input = $("itemName");
  const list = document.getElementById("itemSuggestions");
  if (!input || !list) return;

  let activeIdx = -1;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { hideList(); return; }

    // Уникальные названия из истории, отсортированные по частоте
    const freq = {};
    state.rows.forEach(r => {
      const name = r.item || "";
      if (name.toLowerCase().includes(q)) freq[name] = (freq[name] || 0) + 1;
    });

    const matches = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([name]) => name);

    if (!matches.length) { hideList(); return; }

    activeIdx = -1;
    list.innerHTML = matches.map((name, i) =>
      `<li class="autocomplete-item" data-idx="${i}">${highlightText(name, input.value.trim())}</li>`
    ).join("");
    list.classList.remove("hidden");

    list.querySelectorAll(".autocomplete-item").forEach(li => {
      li.addEventListener("mousedown", (e) => {
        e.preventDefault();
        input.value = matches[parseInt(li.dataset.idx)];
        hideList();
        updatePriceAdvice();
        document.getElementById("buyPrice")?.focus();
      });
    });
  });

  input.addEventListener("keydown", (e) => {
    const items = list.querySelectorAll(".autocomplete-item");
    if (!items.length || list.classList.contains("hidden")) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, items.length - 1);
      updateActive(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, 0);
      updateActive(items);
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      input.value = items[activeIdx].textContent;
      hideList();
      document.getElementById("buyPrice")?.focus();
    } else if (e.key === "Escape") {
      hideList();
    }
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !list.contains(e.target)) hideList();
  });

  function hideList() {
    list.classList.add("hidden");
    activeIdx = -1;
  }

  function updateActive(items) {
    items.forEach((li, i) => li.classList.toggle("active", i === activeIdx));
    if (activeIdx >= 0) items[activeIdx].scrollIntoView({ block: "nearest" });
  }
}

// ---------- Rate Us ----------
function maybeShowRateUs() {
  // Уже показывали — не показываем снова
  const shown = localStorage.getItem("smh_rateUsShown");
  if (shown) return;

  const total = state.rows.length;
  const threshold = parseInt(localStorage.getItem("smh_rateUsThreshold") || "0");

  // Устанавливаем порог один раз — случайное число от 5 до 20
  if (!threshold) {
    const rand = Math.floor(Math.random() * 16) + 5; // 5..20
    localStorage.setItem("smh_rateUsThreshold", String(rand));
    return;
  }

  if (total < threshold) return;

  // Показываем тост
  const existing = document.getElementById("rateUsToast");
  if (existing) return;

  const toast = document.createElement("div");
  toast.id = "rateUsToast";
  toast.className = "rate-us-toast";
  toast.innerHTML = `
    <div class="rate-us-content">
      <span class="rate-us-stars">⭐⭐⭐⭐⭐</span>
      <div class="rate-us-text">
        <strong>Нравится расширение?</strong>
        <span>Оставь отзыв — это очень помогает!</span>
      </div>
    </div>
    <div class="rate-us-actions">
      <a class="rate-us-btn primary" href="https://chromewebstore.google.com/detail/steam-market-helper/pmcknffccjjjacpjlpnkpodgbdnmojej/reviews" target="_blank" id="rateUsYes">⭐ Оценить</a>
      <button class="rate-us-btn ghost" id="rateUsLater">Позже</button>
      <button class="rate-us-btn ghost" id="rateUsNever">Не показывать</button>
    </div>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("rate-us-toast-visible"));

  document.getElementById("rateUsYes").addEventListener("click", () => {
    localStorage.setItem("smh_rateUsShown", "1");
    dismissRateUs();
  });

  document.getElementById("rateUsLater").addEventListener("click", () => {
    // Сдвигаем порог ещё на 5-10 сделок
    const next = total + Math.floor(Math.random() * 6) + 5;
    localStorage.setItem("smh_rateUsThreshold", String(next));
    dismissRateUs();
  });

  document.getElementById("rateUsNever").addEventListener("click", () => {
    localStorage.setItem("smh_rateUsShown", "1");
    dismissRateUs();
  });
}

function dismissRateUs() {
  const toast = document.getElementById("rateUsToast");
  if (!toast) return;
  toast.classList.remove("rate-us-toast-visible");
  setTimeout(() => toast.remove(), 300);
}

// ---------- Боковое меню ----------
function initSidebar() {
  document.querySelectorAll(".sidebar-btn[data-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;

      document.querySelectorAll(".sidebar-btn[data-section]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".content-section").forEach((s) => s.classList.remove("active-section"));
      const target = document.getElementById("section" + section.charAt(0).toUpperCase() + section.slice(1));
      if (target) target.classList.add("active-section");

      const sub = document.getElementById("topbarSubtitle");
      if (sub) sub.textContent = t(section === "charts" ? "sidebarChartsTitle" : "sidebarHistoryTitle");

      if (section === "charts") {
        setTimeout(() => { updateCharts(); }, 150);
      }
    });
  });

}


function openDonateModal() {
  const modal = document.getElementById('donateModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeDonateModal() {
  const modal = document.getElementById('donateModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function setupDonateModal() {
  const modal = document.getElementById('donateModal');
  if (!modal) return;
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeDonateModal();
    }
  });
  
  const closeBtn = modal.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeDonateModal);
  }
}

// ---------- Графики ----------
let monthlyChart = null;
let profitChart = null;
let categoryChart = null;
let marginChart = null;

function waitForChartJs(callback, maxAttempts = 50) {
  let attempts = 0;
  
  const check = () => {
    if (typeof Chart !== 'undefined') {
      console.log("✅ Chart.js загружен!");
      callback();
      return;
    }
    
    if (window.chartJsPromise) {
      window.chartJsPromise.then(() => {
        console.log("✅ Chart.js загружен через промис");
        callback();
      }).catch(() => {
        if (attempts < maxAttempts) {
          attempts++;
          console.log(`⏳ Ожидание Chart.js... попытка ${attempts}/${maxAttempts}`);
          setTimeout(check, 200);
        } else {
          showChartError();
        }
      });
      return;
    }
    
    if (attempts < maxAttempts) {
      attempts++;
      console.log(`⏳ Ожидание Chart.js... попытка ${attempts}/${maxAttempts}`);
      setTimeout(check, 200);
    } else {
      showChartError();
    }
  };
  
  function showChartError() {
    console.error("❌ Chart.js не загрузился после 50 попыток");
    
    const errorEl = document.getElementById('chartError');
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.innerHTML = '❌ Chart.js не загрузился. <button id="retryChartBtn">Повторить</button>';
      
      const retryBtn = document.getElementById('retryChartBtn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          errorEl.style.display = 'none';
          location.reload();
        });
      }
    }
    
    const loadingEl = document.getElementById('chartLoading');
    if (loadingEl) loadingEl.style.display = 'none';
    
    const canvases = ['monthlyChart', 'profitChart', 'categoryChart', 'marginChart'];
    canvases.forEach(id => {
      const canvas = document.getElementById(id);
      if (canvas && canvas.parentNode) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '14px system-ui';
        ctx.fillStyle = '#ff6b6b';
        ctx.textAlign = 'center';
        ctx.fillText('❌ Chart.js не загружен', canvas.width/2, canvas.height/2);
        ctx.font = '12px system-ui';
        ctx.fillStyle = '#a9b4cc';
        ctx.fillText('Проверьте интернет и обновите страницу', canvas.width/2, canvas.height/2 + 25);
      }
    });
  }
  
  check();
}

function updateCharts() {
  // Проверяем, есть ли canvas для графиков на странице
  const hasCharts = 
    document.getElementById("monthlyChart") ||
    document.getElementById("profitChart") ||
    document.getElementById("categoryChart") ||
    document.getElementById("marginChart");
  
  if (!hasCharts) {
    console.log("ℹ️ Графики не требуются на этой странице");
    return;
  }
  
  console.log("📊 updateCharts called with language:", currentLanguage);
  
  const loadingEl = document.getElementById('chartLoading');
  if (loadingEl) loadingEl.style.display = 'block';
  
  if (typeof Chart === 'undefined') {
    console.log("Chart.js ещё не загружен, ждём...");
    waitForChartJs(() => {
      buildCharts();
    });
    return;
  }
  
  buildCharts();
}

function buildCharts() {
  console.log("🔨 buildCharts started with language:", currentLanguage);
  
  const computedStyle = getComputedStyle(document.documentElement);
  const textColor = computedStyle.getPropertyValue('--text').trim();
  const mutedColor = computedStyle.getPropertyValue('--muted').trim();
  const borderColor = computedStyle.getPropertyValue('--border').trim();
  const cardColor = computedStyle.getPropertyValue('--card').trim();
  
  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const tooltipBackground = cardColor;
  const tooltipTextColor = textColor;
  
  const loadingEl = document.getElementById('chartLoading');
  if (loadingEl) loadingEl.style.display = 'none';
  
  const monthlyCanvas = document.getElementById("monthlyChart");
  const profitCanvas = document.getElementById("profitChart");
  const categoryCanvas = document.getElementById("categoryChart");
  const marginCanvas = document.getElementById("marginChart");
  
  if (!monthlyCanvas && !profitCanvas && !categoryCanvas && !marginCanvas) {
    console.log("❌ No chart canvases found");
    return;
  }
  
  const soldRows = state.rows.filter(r => r.status === "sold");
  console.log(`📦 Sold items: ${soldRows.length}`);
  
  if (soldRows.length === 0) {
    console.log("ℹ️ No sold items, showing empty charts");
    
    const canvases = [monthlyCanvas, profitCanvas, categoryCanvas, marginCanvas];
    canvases.forEach(canvas => {
      if (canvas && canvas.parentNode) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '14px system-ui';
        ctx.fillStyle = mutedColor;
        ctx.textAlign = 'center';
        ctx.fillText(t("noData"), canvas.width/2, canvas.height/2);
        ctx.font = '12px system-ui';
        ctx.fillStyle = mutedColor;
        ctx.fillText(t("soldCount") + ' 0', canvas.width/2, canvas.height/2 + 25);
      }
    });
    return;
  }

  try {
    if (monthlyChart) { monthlyChart.destroy(); monthlyChart = null; }
    if (profitChart) { profitChart.destroy(); profitChart = null; }
    if (categoryChart) { categoryChart.destroy(); categoryChart = null; }
    if (marginChart) { marginChart.destroy(); marginChart = null; }

    // 1. ГРАФИК ПРИБЫЛИ ПО МЕСЯЦАМ
    if (monthlyCanvas) {
      const monthlyData = {};
      soldRows.forEach(r => {
        const month = r.date.substring(0, 7);
        const profit = (r.profit || 0) * (r.quantity || 1);
        if (!monthlyData[month]) {
          monthlyData[month] = { profit: 0, count: 0 };
        }
        monthlyData[month].profit += profit;
        monthlyData[month].count += r.quantity || 1;
      });
      
      const months = Object.keys(monthlyData).sort();
      const monthlyProfits = months.map(m => monthlyData[m].profit);
      const monthLabels = months.map(m => {
        const [year, month] = m.split("-");
        return `${t("months")[parseInt(month)]} ${year}`;
      });
      
      const monthlyCtx = monthlyCanvas.getContext("2d");
      
      monthlyChart = new Chart(monthlyCtx, {
        type: "bar",
        data: {
          labels: monthLabels,
          datasets: [{
            label: t("totalProfit"),
            data: monthlyProfits,
            backgroundColor: monthlyProfits.map(p => p >= 0 ? "rgba(75, 192, 75, 0.6)" : "rgba(255, 99, 132, 0.6)"),
            borderColor: monthlyProfits.map(p => p >= 0 ? "rgb(40, 167, 40)" : "rgb(220, 53, 69)"),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          color: textColor,
          plugins: {
            title: { 
              display: true, 
              text: t("monthlyChart"), 
              color: textColor,
              font: { size: 14, weight: '500' }
            },
            legend: { 
              labels: { 
                color: textColor,
                font: { size: 12 }
              } 
            },
            tooltip: {
              backgroundColor: tooltipBackground,
              titleColor: tooltipTextColor,
              bodyColor: tooltipTextColor,
              borderColor: borderColor,
              borderWidth: 1,
              callbacks: {
                label: (context) => {
                  const month = months[context.dataIndex];
                  return [
                    t("totalProfit") + ': ' + money(context.raw, state.currency),
                    t("soldCount") + ': ' + monthlyData[month].count
                  ];
                }
              }
            }
          },
          scales: {
            y: {
              ticks: { 
                callback: value => money(value, state.currency),
                color: textColor,
                font: { size: 11 }
              },
              grid: { color: gridColor }
            },
            x: {
              ticks: { 
                color: textColor,
                font: { size: 11 }
              },
              grid: { color: gridColor }
            }
          }
        }
      });
    }

    // 2. ГРАФИК ТОП-10 ПРИБЫЛЬНЫХ СДЕЛОК
    if (profitCanvas) {
      const topProfits = [...soldRows]
        .map(r => ({ ...r, totalProfit: (r.profit || 0) * (r.quantity || 1) }))
        .sort((a, b) => b.totalProfit - a.totalProfit)
        .slice(0, 10);
      
      const profitCtx = profitCanvas.getContext("2d");
      
      profitChart = new Chart(profitCtx, {
        type: "bar",
        data: {
          labels: topProfits.map(r => r.item.substring(0, 15) + (r.item.length > 15 ? "..." : "")),
          datasets: [{
            label: t("profit"),
            data: topProfits.map(r => r.totalProfit),
            backgroundColor: topProfits.map(r => r.totalProfit >= 0 ? "rgba(75, 192, 75, 0.6)" : "rgba(255, 99, 132, 0.6)"),
            borderColor: topProfits.map(r => r.totalProfit >= 0 ? "rgb(40, 167, 40)" : "rgb(220, 53, 69)"),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          color: textColor,
          plugins: {
            title: { 
              display: true, 
              text: t("profitChart"), 
              color: textColor,
              font: { size: 14, weight: '500' }
            },
            legend: { 
              labels: { 
                color: textColor,
                font: { size: 12 }
              } 
            },
            tooltip: {
              backgroundColor: tooltipBackground,
              titleColor: tooltipTextColor,
              bodyColor: tooltipTextColor,
              borderColor: borderColor,
              borderWidth: 1,
              callbacks: {
                label: (context) => {
                  const deal = topProfits[context.dataIndex];
                  return [
                    t("profit") + ': ' + money(context.raw, state.currency),
                    t("buy") + ': ' + money(deal.buy, state.currency) + ' x' + (deal.quantity || 1),
                    t("margin") + ': ' + round2(deal.margin || 0) + '%'
                  ];
                }
              }
            }
          },
          scales: {
            x: {
              ticks: { 
                callback: value => money(value, state.currency),
                color: textColor,
                font: { size: 11 }
              },
              grid: { color: gridColor }
            },
            y: {
              ticks: { 
                color: textColor,
                font: { size: 11 }
              },
              grid: { color: gridColor }
            }
          }
        }
      });
    }

    // 3. ГРАФИК РАСПРЕДЕЛЕНИЯ ПО ДОХОДНОСТИ
    if (categoryCanvas) {
      const ranges = {
        [t("profitable") + ' >100%']: soldRows.filter(r => r.margin > 100).length,
        [t("profitable") + ' 50-100%']: soldRows.filter(r => r.margin > 50 && r.margin <= 100).length,
        [t("profitable") + ' 0-50%']: soldRows.filter(r => r.margin > 0 && r.margin <= 50).length,
        [t("lossMaking")]: soldRows.filter(r => r.margin < 0).length,
        [t("breakEven")]: soldRows.filter(r => r.margin === 0).length
      };
      
      const filteredRanges = {};
      Object.entries(ranges).forEach(([key, value]) => {
        if (value > 0) filteredRanges[key] = value;
      });
      
      const categoryCtx = categoryCanvas.getContext("2d");
      
      categoryChart = new Chart(categoryCtx, {
        type: "doughnut",
        data: {
          labels: Object.keys(filteredRanges),
          datasets: [{
            data: Object.values(filteredRanges),
            backgroundColor: [
              'rgba(40, 167, 40, 0.8)',
              'rgba(75, 192, 75, 0.6)',
              'rgba(144, 238, 144, 0.6)',
              'rgba(220, 53, 69, 0.8)',
              'rgba(108, 117, 125, 0.6)'
            ],
            borderWidth: 1,
            borderColor: borderColor
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          color: textColor,
          plugins: {
            title: { 
              display: true, 
              text: t("profitDistribution"), 
              color: textColor,
              font: { size: 14, weight: '500' }
            },
            legend: { 
              labels: { 
                color: textColor,
                font: { size: 12 }
              } 
            },
            tooltip: {
              backgroundColor: tooltipBackground,
              titleColor: tooltipTextColor,
              bodyColor: tooltipTextColor,
              borderColor: borderColor,
              borderWidth: 1,
              callbacks: {
                label: (context) => {
                  const total = soldRows.length;
                  const value = context.raw;
                  const percent = ((value / total) * 100).toFixed(1);
                  return `${context.label}: ${value} (${percent}%)`;
                }
              }
            }
          }
        }
      });
    }

    // 4. ГРАФИК ДИНАМИКИ МАРЖИ
    if (marginCanvas) {
      const recentDeals = [...soldRows]
        .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))
        .slice(0, 20)
        .reverse();
      
      const marginCtx = marginCanvas.getContext("2d");
      
      marginChart = new Chart(marginCtx, {
        type: "line",
        data: {
          labels: recentDeals.map((r, i) => {
            const date = new Date(r.date);
            return `${date.getDate()}.${date.getMonth()+1}`;
          }),
          datasets: [{
            label: t("margin"),
            data: recentDeals.map(r => r.margin || 0),
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: "rgba(54, 162, 235, 0.1)",
            tension: 0.1,
            fill: true,
            pointBackgroundColor: recentDeals.map(r => (r.margin || 0) >= 0 ? "rgb(40, 167, 40)" : "rgb(220, 53, 69)")
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          color: textColor,
          plugins: {
            title: { 
              display: true, 
              text: t("marginDynamics"), 
              color: textColor,
              font: { size: 14, weight: '500' }
            },
            legend: { 
              labels: { 
                color: textColor,
                font: { size: 12 }
              } 
            },
            tooltip: {
              backgroundColor: tooltipBackground,
              titleColor: tooltipTextColor,
              bodyColor: tooltipTextColor,
              borderColor: borderColor,
              borderWidth: 1,
              callbacks: {
                label: (context) => {
                  const deal = recentDeals[context.dataIndex];
                  const totalProfit = (deal.profit || 0) * (deal.quantity || 1);
                  return [
                    t("margin") + ': ' + round2(context.raw || 0) + '%',
                    deal.item + ' x' + (deal.quantity || 1),
                    t("profit") + ': ' + money(totalProfit, state.currency)
                  ];
                }
              }
            }
          },
          scales: {
            y: {
              ticks: { 
                callback: value => value + '%',
                color: textColor,
                font: { size: 11 }
              },
              grid: { color: gridColor }
            },
            x: {
              ticks: { 
                color: textColor,
                font: { size: 11 }
              },
              grid: { color: gridColor }
            }
          }
        }
      });
    }
    
    console.log("🎉 All charts built successfully with language:", currentLanguage);
    
  } catch (error) {
    console.error("❌ Error building charts:", error);
    
    const errorEl = document.getElementById('chartError');
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.textContent = '❌ ' + t("alertWrongFile") + ': ' + error.message;
    }
  }
}

// ---------- Функция обновления статистики ----------
function updateStats() {
  const rows = state.rows || [];
  
  const totalItems = rows.reduce((sum, r) => sum + (r.quantity || 1), 0);
  const totalInvested = rows.reduce((sum, r) => sum + ((r.buy || 0) * (r.quantity || 1)), 0);
  const totalProfit = rows.reduce((sum, r) => sum + ((r.profit || 0) * (r.quantity || 1)), 0);
  
  const soldRows = rows.filter(r => r.status === "sold");
  const soldItems = soldRows.reduce((sum, r) => sum + (r.quantity || 1), 0);
  
  const avgMargin = soldRows.length > 0 
    ? soldRows.reduce((sum, r) => sum + (r.margin || 0), 0) / soldRows.length 
    : 0;
  
  const avgPricePerItem = totalItems > 0 ? totalInvested / totalItems : 0;
  
  const statsTotalInvested = document.getElementById("statsTotalInvested");
  const statsTotalProfit = document.getElementById("statsTotalProfit");
  const statsAvgMargin = document.getElementById("statsAvgMargin");
  const statsSoldCount = document.getElementById("statsSoldCount");
  const statsTotalCount = document.getElementById("statsTotalCount");
  const statsTotalItems = document.getElementById("statsTotalItems");
  const statsAvgPrice = document.getElementById("statsAvgPrice");
  
  if (statsTotalInvested) {
    statsTotalInvested.textContent = money(totalInvested, state.currency);
  }
  if (statsTotalProfit) {
    statsTotalProfit.textContent = money(totalProfit, state.currency);
  }
  if (statsAvgMargin) {
    statsAvgMargin.textContent = round2(avgMargin).toFixed(1) + "%";
  }
  if (statsSoldCount) {
    statsSoldCount.textContent = soldItems;
  }
  if (statsTotalCount) {
    statsTotalCount.textContent = totalItems;
  }
  if (statsTotalItems) {
    statsTotalItems.textContent = totalItems;
  }
  if (statsAvgPrice) {
    statsAvgPrice.textContent = money(avgPricePerItem, state.currency);
  }
}

// ---------- Render ----------
function renderHistory() {
  const tbody = document.querySelector("#historyTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  let rows = filterRows(state.rows || []);
  rows = sortRows(rows);

  // Пагинация
  const total = rows.length;
  const pageSize = state.pageSize;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (state.currentPage > totalPages) state.currentPage = totalPages;
  const start = (state.currentPage - 1) * pageSize;
  const pageRows = rows.slice(start, start + pageSize);

  for (const r of pageRows) {
    const tr = document.createElement("tr");
    const quantity = r.quantity || 1;
    
    if (state.bulkMode && state.selectedDeals.has(r.id)) {
      tr.classList.add('selected-row');
    }

    const td = (text, cls) => {
      const el = document.createElement("td");
      if (cls) el.className = cls;
      el.textContent = text;
      return el;
    };

    // Чекбокс для группового режима
    if (state.bulkMode) {
      const checkboxTd = document.createElement("td");
      checkboxTd.style.width = '30px';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = state.selectedDeals.has(r.id);
      checkbox.addEventListener('change', () => toggleSelectDeal(r.id));
      checkboxTd.appendChild(checkbox);
      tr.appendChild(checkboxTd);
    }

    tr.appendChild(td(r.date || ""));
    tr.appendChild(td(r.time || ""));
    tr.appendChild(td(r.item || ""));
    tr.appendChild(td(String(quantity), "num"));

    tr.appendChild(td(money(r.buy || 0, r.currency), "num"));
    tr.appendChild(td(money((r.buy || 0) * quantity, r.currency), "num"));
    tr.appendChild(td(r.status === "sold" ? money(r.sell || 0, r.currency) : "—", "num"));
    tr.appendChild(td(r.status === "sold" ? money(r.sellerGets || 0, r.currency) : "—", "num"));
    tr.appendChild(td(r.status === "sold" ? money(r.feeAmount || 0, r.currency) : "—", "num"));
    tr.appendChild(td(r.status === "sold" ? String(round2(r.feePercent ?? 0)) : "—", "num"));
    tr.appendChild(td(r.status === "sold" ? money((r.profit || 0) * quantity, r.currency) : "—", "num"));
    tr.appendChild(td(r.status === "sold" ? String(round2(r.margin ?? 0)) + "%" : "—", "num"));

    tr.appendChild(td(r.status === "sold" ? t("sold") : t("bought")));

    // Теги в строке таблицы (перед действиями)
    const tagsTd = document.createElement("td");
    if (r.tags && r.tags.length) {
      r.tags.forEach(tag => {
        const chip = document.createElement("span");
        chip.className = "tag-chip";
        chip.textContent = tag;
        chip.dataset.action = "filterTag";
        chip.dataset.tag = tag;
        tagsTd.appendChild(chip);
      });
    }
    tr.appendChild(tagsTd);

    const actions = document.createElement("td");
    actions.className = "actions-td";

    if (!state.bulkMode) {
      if (r.status === "open") {
        const sellBtn = document.createElement("button");
        sellBtn.type = "button";
        sellBtn.textContent = t("sellAction");
        sellBtn.dataset.action = "sell";
        sellBtn.dataset.id = r.id;
        actions.appendChild(sellBtn);
      }

      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.textContent = t("editAction");
      editBtn.dataset.action = "edit";
      editBtn.dataset.id = r.id;
      editBtn.title = t("editTitle");
      actions.appendChild(editBtn);

      const dupBtn = document.createElement("button");
      dupBtn.type = "button";
      dupBtn.textContent = "📋";
      dupBtn.dataset.action = "dup";
      dupBtn.dataset.id = r.id;
      dupBtn.title = t("dupTitle");
      actions.appendChild(dupBtn);

      const notesBtn = document.createElement("button");
      notesBtn.type = "button";
      if (r.notes) {
        notesBtn.innerHTML = "📝";
        if (searchQuery && state.searchInNotes && r.notes.toLowerCase().includes(searchQuery.toLowerCase())) {
          notesBtn.title = `Найдено в заметках: ${r.notes.substring(0, 50)}...`;
          notesBtn.classList.add("has-match");
        } else {
          notesBtn.title = r.notes || t("notes");
        }
      } else {
        notesBtn.innerHTML = "📄";
        notesBtn.title = t("notes");
      }
      notesBtn.dataset.action = "notes";
      notesBtn.dataset.id = r.id;
      actions.appendChild(notesBtn);

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.textContent = "🗑";
      delBtn.dataset.action = "del";
      delBtn.dataset.id = r.id;
      delBtn.title = t("delete");
      actions.appendChild(delBtn);
    }

    tr.appendChild(actions);
    tbody.appendChild(tr);
  }
  
  updateStats();
  updateSortIndicators();
  updateTagFilterUI();
  renderRecentDealsPopup();
  renderPagination(total);
  
  setTimeout(() => {
    updateCharts();
  }, 100);
}

// Delegated actions
function setupHistoryTableActions() {
  const table = $("historyTable");
  if (!table) return;

  table.addEventListener("click", async (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;

    const action = t.dataset.action;
    const id = t.dataset.id;
    if (!action || !id) return;

    if (action === "sell") {
      openSellModal(id);
    } else if (action === "edit") {
      openEditModal(id);
    } else if (action === "dup") {
      duplicateDeal(id);
    } else if (action === "notes") {
      openNotesModal(id);
    } else if (action === "del") {
      showDeleteConfirm(id);
    } else if (action === "filterTag") {
      const tag = t.dataset.tag;
      if (tag) {
        state.filterTag = tag;
        updateTagFilterUI();
        renderHistory();
      }
    }
  });
}

// ---------- Пагинация ----------
function renderPagination(total) {
  const container = document.getElementById("paginationBar");
  if (!container) return;

  const pageSize = state.pageSize;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const cur = state.currentPage;

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  // Диапазон отображаемых записей
  const from = Math.min((cur - 1) * pageSize + 1, total);
  const to = Math.min(cur * pageSize, total);

  // Строим список страниц с «...»
  const pages = buildPageList(cur, totalPages);

  container.innerHTML = `
    <div class="pagination">
      <button class="pg-btn pg-prev" ${cur <= 1 ? "disabled" : ""} data-page="${cur - 1}">‹</button>
      <div class="pg-pages">
        ${pages.map(p => p === "…"
          ? `<span class="pg-ellipsis">…</span>`
          : `<button class="pg-btn pg-num ${p === cur ? "pg-active" : ""}" data-page="${p}">${p}</button>`
        ).join("")}
      </div>
      <button class="pg-btn pg-next" ${cur >= totalPages ? "disabled" : ""} data-page="${cur + 1}">›</button>
      <span class="pg-info">${from}–${to} из ${total}</span>
      <select class="pg-size" title="Записей на странице">
        ${[5, 10, 20].map(n =>
          `<option value="${n}" ${n === pageSize ? "selected" : ""}>${n} / стр.</option>`
        ).join("")}
      </select>
    </div>
  `;

  container.querySelectorAll(".pg-btn[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.currentPage = parseInt(btn.dataset.page);
      renderHistory();
      // Скроллим к верху таблицы
      document.getElementById("historyTable")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  container.querySelector(".pg-size")?.addEventListener("change", (e) => {
    state.pageSize = parseInt(e.target.value);
    state.currentPage = 1;
    renderHistory();
  });
}

function buildPageList(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  pages.push(1);
  if (cur > 3) pages.push("…");
  for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) pages.push(p);
  if (cur < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

// ---------- JSON Export/Import ----------
// ---------- Последние сделки в popup ----------
function renderRecentDealsPopup() {
  const container = document.getElementById("recentDealsPopup");
  if (!container) return;

  const recent = [...state.rows].slice(0, 5);
  if (!recent.length) {
    container.innerHTML = `<p class="recent-empty">${t("noRecentDeals")}</p>`;
    return;
  }

  container.innerHTML = recent.map(r => {
    const statusClass = r.status === "sold" ? "recent-sold" : "recent-open";
    const profitText = r.profit != null
      ? money(r.profit * (r.quantity || 1), r.currency)
      : "—";
    const profitClass = r.profit > 0 ? "profit-pos" : r.profit < 0 ? "profit-neg" : "";
    const tagsHtml = (r.tags || []).map(tag =>
      `<span class="tag-chip tag-chip-sm">${tag}</span>`).join("");
    return `
      <div class="recent-row ${statusClass}">
        <div class="recent-item">${r.item}${tagsHtml ? `<span class="recent-tags">${tagsHtml}</span>` : ""}</div>
        <div class="recent-meta">
          <span>${money(r.buy || 0, r.currency)}</span>
          <span class="${profitClass}">${profitText}</span>
          <span class="recent-status">${r.status === "sold" ? "✅" : "⏳"}</span>
        </div>
      </div>`;
  }).join("");
}

function exportJSON() {
  const payload = {
    app: APP,
    version: VERSION,
    exportedAt: new Date().toISOString(),
    settings: {
      currency: state.currency,
      language: currentLanguage,
      theme: currentTheme
    },
    history: state.rows
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const stamp = new Date().toISOString().slice(0,10);
  a.download = `steam-market-helper_backup_v${VERSION}_${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportCSV() {
  const headers = [
    "date", "time", "item", "quantity",
    "buy", "totalBuy", "sell", "received",
    "feeAmount", "feePercent", "profit", "margin",
    "status", "currency", "tags", "notes"
  ];

  const escape = (val) => {
    const s = String(val ?? "");
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const rows = [headers.join(",")];
  for (const r of state.rows) {
    const qty = r.quantity || 1;
    rows.push([
      r.date, r.time, r.item, qty,
      r.buy ?? "", round2((r.buy || 0) * qty),
      r.sell ?? "", r.sellerGets ?? "",
      r.feeAmount ?? "", r.feePercent ?? "",
      r.profit != null ? round2(r.profit * qty) : "",
      r.margin ?? "",
      r.status, r.currency || state.currency,
      (r.tags || []).join("|"),
      r.notes || ""
    ].map(escape).join(","));
  }

  const blob = new Blob(["\uFEFF" + rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `steam-market-helper_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importJSONFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    let data = null;
    try {
      data = JSON.parse(String(reader.result || ""));
    } catch {
      alert(t("alertWrongFile"));
      return;
    }

    if (!data || data.app !== APP || !Array.isArray(data.history)) {
      alert(t("alertWrongFile"));
      return;
    }

    const ok = confirm(t("confirmImport"));
    if (!ok) return;

    const rows = data.history.filter(r => r && typeof r === "object");
    await saveHistory(rows);

    if (data.settings?.currency) await saveCurrency(String(data.settings.currency));
    if (data.settings?.language) {
      await saveLanguage(data.settings.language);
      currentLanguage = data.settings.language;
    }
    if (data.settings?.theme) {
      await saveTheme(data.settings.theme);
    }

    await loadSettings();
    await loadHistory();
    setupCurrencyUI();
    updateUILanguage();
    renderHistory();
  };

  reader.readAsText(file, "utf-8");
}

// Глобальный объект для отладки
window.debug = {
  state: () => state,
  rows: () => state.rows,
  sold: () => state.rows.filter(r => r.status === "sold"),
  charts: () => {
    console.log("monthlyChart:", monthlyChart);
    console.log("profitChart:", profitChart);
    console.log("categoryChart:", categoryChart);
    console.log("marginChart:", marginChart);
  },
  update: () => updateCharts(),
  destroy: () => {
    if (monthlyChart) monthlyChart.destroy();
    if (profitChart) profitChart.destroy();
    if (categoryChart) categoryChart.destroy();
    if (marginChart) marginChart.destroy();
    console.log("Charts destroyed");
  },
  test: () => {
    console.log("=== DEBUG INFO ===");
    console.log("Chart.js loaded:", typeof Chart !== 'undefined');
    console.log("Current language:", currentLanguage);
    console.log("Total rows:", state.rows.length);
    console.log("Sold rows:", state.rows.filter(r => r.status === "sold").length);
    console.log("Canvas monthly:", document.getElementById("monthlyChart"));
    console.log("Canvas profit:", document.getElementById("profitChart"));
    console.log("Canvas category:", document.getElementById("categoryChart"));
    console.log("Canvas margin:", document.getElementById("marginChart"));
  }
};

// ---------- Init ----------
async function init() {
  console.log("Initializing app...");
  
  await migrateLegacyIfNeeded();
  await loadSettings();
  await loadTheme();
  await loadHistory();

  setupCurrencyUI();
  setupLanguageUI();
  setupThemeUI();
  setupFilterUI();
  setupSortUI();
  setupHotkeys();
  setupHistoryTableActions();
  setupDonateModal();
  setupAutocomplete();
  initSidebar();
  listenForHistoryUpdates();
  updateUILanguage();

  $("addBtn")?.addEventListener("click", addToHistory);
  $("clearBtn")?.addEventListener("click", resetFields);
  $("buyPrice")?.addEventListener("input", updatePriceAdvice);

  $("toggleHistoryBtn")?.addEventListener("click", openHistory);
  $("openPopupHint")?.addEventListener("click", () => {
    if (currentLanguage === "ru") {
      alert("Открой калькулятор, нажав на иконку расширения в панели Chrome.");
    } else {
      alert("Open calculator by clicking the extension icon in Chrome toolbar.");
    }
  });

  $("exportJsonBtn")?.addEventListener("click", exportJSON);
  $("exportCsvBtn")?.addEventListener("click", exportCSV);
  $("importJsonFile")?.addEventListener("change", importJSONFile);

  $("editSave")?.addEventListener("click", confirmEdit);
  $("editCancel")?.addEventListener("click", closeEditModal);

  $("wipeHistoryBtn")?.addEventListener("click", async () => {
    if (!confirm(t("confirmWipe"))) return;
    await saveHistory([]);
    renderHistory();
  });

  $("sellCancel")?.addEventListener("click", closeSellModal);
  $("sellConfirm")?.addEventListener("click", confirmSell);
  
  $("notesSave")?.addEventListener("click", saveNotes);
  $("notesCancel")?.addEventListener("click", closeNotesModal);

  // Донаты
  const donateBtn = document.getElementById('donateBtn');
  if (donateBtn) {
    donateBtn.addEventListener('click', openDonateModal);
  }

  // Групповые операции
  $("bulkModeBtn")?.addEventListener("click", toggleBulkMode);
  $("bulkSelectAllBtn")?.addEventListener("click", selectAllDeals);
  $("bulkDeselectAllBtn")?.addEventListener("click", deselectAllDeals);
  $("bulkSellBtn")?.addEventListener("click", openBulkSellModal);
  $("bulkDeleteBtn")?.addEventListener("click", confirmBulkDelete);
  $("bulkSellConfirm")?.addEventListener("click", confirmBulkSell);
  $("bulkSellCancel")?.addEventListener("click", closeBulkSellModal);
  
  $("bulkSellPrice")?.addEventListener("input", updateBulkCalculatedFee);
  $("bulkSellReceived")?.addEventListener("input", updateBulkCalculatedFee);

  window.addEventListener("scroll", () => {
    closeCurrencyMenu();
  });

  renderHistory();
  renderRecentDealsPopup();
  
  setTimeout(() => {
    updateCharts();
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  init().catch((e) => console.error("Init error:", e));
});