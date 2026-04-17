import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import {
  Home,
  DollarSign,
  GraduationCap,
  SquareCheck,
  Activity,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  Award,
  Flame,
  CircleCheck,
  Circle,
  Trophy,
  Coffee,
  WineOff,
  Utensils,
  CircleX,
  Scale,
  Target,
  ChevronDown,
  ChevronUp,
  PieChart,
  Calculator,
  Zap,
  Camera,
  Droplet,
  Moon,
  Footprints,
  Star,
  FolderOpen,
  Calendar,
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Link as LinkIcon,
  MessageCircle,
  FileText,
  CircleAlert,
  Pen,
  Save,
  Eraser,
  Flag,
  StickyNote,
  Pin,
  ShoppingBag,
  Tag,
  Package,
  ChevronRight,
} from "lucide-react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

// --- FIREBASE INIT ---
const firebaseConfig =
  typeof __firebase_config !== "undefined"
    ? JSON.parse(__firebase_config)
    : {
        apiKey: "AIzaSyDa_LJdkiCOwMJEyn_Lz35iCNotNaT4XxA",
        authDomain: "mi-dashboard-personal.firebaseapp.com",
        projectId: "mi-dashboard-personal",
        storageBucket: "mi-dashboard-personal.firebasestorage.app",
        messagingSenderId: "1007065073137",
        appId: "1:1007065073137:web:e0deb3418d4902ed88b050",
      };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== "undefined" ? __app_id : "mi-mega-app";

// --- CONTEXTO GLOBAL ---
const AppContext = createContext();

// --- DATOS INICIALES (MOCK) ---
const initialFinances = { transactions: [] };
const initialAcademic = { total: 40, passed: 22, inProgress: 4 };
const initialTasks = [];
const initialHealth = { records: {} };

const FOOD_DB = [
  { id: "pollo", name: "Pechuga de Pollo", p: 23, c: 0, f: 1.5 },
  { id: "carne_magra", name: "Carne Magra (Vaca)", p: 21, c: 0, f: 5 },
  { id: "huevo", name: "Huevo entero", p: 12.5, c: 0, f: 9.5 },
  { id: "atun", name: "Atún al natural", p: 25, c: 0, f: 1 },
  { id: "whey", name: "Whey Protein", p: 75, c: 5, f: 3 },
  { id: "leche_desc", name: "Leche Descremada", p: 3.5, c: 5, f: 0 },
  { id: "arroz", name: "Arroz Blanco (Crudo)", p: 7, c: 80, f: 1 },
  { id: "fideos", name: "Fideos (Crudos)", p: 12, c: 75, f: 1.5 },
  { id: "avena", name: "Avena Tradicional", p: 13, c: 60, f: 7 },
  { id: "banana", name: "Banana", p: 1.1, c: 23, f: 0.3 },
];

const emptyMeal = { name: "", protein: "", carbs: "", fat: "" };
const initialMealPlan = {
  domingo: {
    desayuno: emptyMeal,
    almuerzo: emptyMeal,
    merienda: emptyMeal,
    cena: emptyMeal,
  },
  lunes: {
    desayuno: { name: "Avena y café", protein: "12", carbs: "45", fat: "8" },
    almuerzo: {
      name: "Pollo con arroz",
      protein: "35",
      carbs: "50",
      fat: "10",
    },
    merienda: { name: "Yogur y fruta", protein: "10", carbs: "25", fat: "5" },
    cena: { name: "Pescado y ensalada", protein: "30", carbs: "10", fat: "15" },
  },
  martes: {
    desayuno: emptyMeal,
    almuerzo: emptyMeal,
    merienda: emptyMeal,
    cena: emptyMeal,
  },
  miercoles: {
    desayuno: emptyMeal,
    almuerzo: emptyMeal,
    merienda: emptyMeal,
    cena: emptyMeal,
  },
  jueves: {
    desayuno: emptyMeal,
    almuerzo: emptyMeal,
    merienda: emptyMeal,
    cena: emptyMeal,
  },
  viernes: {
    desayuno: emptyMeal,
    almuerzo: emptyMeal,
    merienda: emptyMeal,
    cena: emptyMeal,
  },
  sabado: {
    desayuno: emptyMeal,
    almuerzo: emptyMeal,
    merienda: emptyMeal,
    cena: emptyMeal,
  },
};

const MOTIVATIONAL_PHRASES = [
  "¡Excelente trabajo! 💪",
  "Un fardito a la vez. ¡Vamos! 👕",
  "¡Boom! Sumando ganancias. 🔥",
];

// --- COMPONENTES GLOBALES ---
const Card = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-3xl shadow-sm border border-slate-100 p-5 ${className}`}
  >
    {children}
  </div>
);
const ProgressBar = ({ progress, color = "bg-emerald-500", size = "h-3" }) => (
  <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${size}`}>
    <div
      className={`${color} h-full rounded-full transition-all duration-1000 ease-out`}
      style={{ width: `${progress}%` }}
    />
  </div>
);
const LevelBar = () => {
  const { currentLevel, totalXP, xpInCurrentLevel, levelProgress } =
    useContext(AppContext);
  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden mb-6">
      <Star
        size={80}
        className="absolute -right-4 -top-4 text-white opacity-10"
        fill="currentColor"
      />
      <div className="flex justify-between items-end mb-2 relative z-10">
        <div>
          <p className="text-xs font-black uppercase tracking-wider opacity-80">
            Nivel Actual
          </p>
          <p className="text-3xl font-black">{currentLevel}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold opacity-90">{totalXP} XP Totales</p>
          <p className="text-[10px] font-medium opacity-75">
            {200 - xpInCurrentLevel} XP para subir
          </p>
        </div>
      </div>
      <ProgressBar progress={levelProgress} color="bg-white" size="h-2" />
    </div>
  );
};

// --- SUB-COMPONENTE: FILA DE PRENDA ---
const ClothingItemRow = ({ bundle, item }) => {
  const { user, todayStr, showToast } = useContext(AppContext);
  const [localName, setLocalName] = useState(item.name || "");
  const [localPrice, setLocalPrice] = useState(item.sellPrice || "");

  useEffect(() => {
    setLocalName(item.name || "");
    setLocalPrice(item.sellPrice || "");
  }, [item.name, item.sellPrice]);

  const saveField = async (field, value) => {
    if (!user) return;
    const updatedItems = bundle.items.map((i) =>
      i.id === item.id ? { ...i, [field]: value } : i
    );
    await setDoc(
      doc(
        db,
        "artifacts",
        appId,
        "users",
        user.uid,
        "clothing_bundles",
        bundle.id
      ),
      { items: updatedItems },
      { merge: true }
    ).catch((e) => console.error(e));
  };

  const toggleItemSold = async () => {
    if (!user) return;
    if (!item.isSold && !localPrice) {
      showToast("⚠️ ¡Ponle un precio de venta antes de marcarla como vendida!");
      return;
    }
    const newIsSold = !item.isSold;
    const updatedItems = bundle.items.map((i) =>
      i.id === item.id
        ? { ...i, isSold: newIsSold, dateSold: newIsSold ? todayStr : null }
        : i
    );
    try {
      await setDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "clothing_bundles",
          bundle.id
        ),
        { items: updatedItems },
        { merge: true }
      );
      if (newIsSold) {
        await setDoc(
          doc(
            db,
            "artifacts",
            appId,
            "users",
            user.uid,
            "finances",
            `inc_${item.id}`
          ),
          {
            type: "income",
            amount: parseFloat(localPrice),
            category: "Ventas de ropa",
            date: todayStr,
            timestamp: Date.now(),
            description: `Venta: ${localName || "Prenda sin nombre"}`,
          }
        );
        showToast(`¡Excelente venta! +$${localPrice} registrados.`);
      } else {
        await deleteDoc(
          doc(
            db,
            "artifacts",
            appId,
            "users",
            user.uid,
            "finances",
            `inc_${item.id}`
          )
        );
        showToast("Venta cancelada. Ingreso retirado.");
      }
    } catch (err) {
      showToast("Error al registrar venta.");
    }
  };

  return (
    <div
      className={`flex items-center gap-2 p-1.5 rounded-xl transition-all border bg-white shadow-sm ${
        item.isSold ? "border-transparent opacity-60" : "border-slate-200"
      }`}
    >
      <button
        onClick={toggleItemSold}
        className={`active:scale-90 transition-transform p-1 shrink-0 ${
          item.isSold
            ? "text-emerald-500"
            : "text-slate-300 hover:text-emerald-400"
        }`}
      >
        {item.isSold ? <CircleCheck size={24} /> : <Circle size={24} />}
      </button>
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={() => saveField("name", localName)}
          placeholder="Especifica la prenda..."
          className={`flex-1 w-full bg-slate-50 font-bold text-xs outline-none focus:bg-white focus:ring-1 focus:ring-indigo-300 border border-transparent rounded px-2 py-1.5 ${
            item.isSold ? "line-through text-slate-500" : "text-slate-800"
          }`}
          disabled={item.isSold}
        />
        <div className="relative w-24 shrink-0">
          <span className="absolute left-1.5 top-1.5 text-slate-400 font-bold text-[10px]">
            $
          </span>
          <input
            type="number"
            value={localPrice}
            onChange={(e) => setLocalPrice(e.target.value)}
            onBlur={() => saveField("sellPrice", localPrice)}
            placeholder="Venta"
            className="w-full bg-indigo-50/50 border border-indigo-100 rounded pl-4 pr-1 py-1.5 font-black text-indigo-700 outline-none focus:ring-1 focus:ring-indigo-500 text-xs text-right disabled:opacity-70"
            disabled={item.isSold}
          />
        </div>
      </div>
    </div>
  );
};

// --- VISTAS PRINCIPALES ---
const HomeView = () => {
  const {
    currentLevel,
    balance,
    pendingTasksCount,
    netProfitRopa,
    academicProgress,
    nextEvent,
    levelProgress,
    xpInCurrentLevel,
    totalXP,
    todayHealth,
    trainedToday,
    dailyMealScore,
    setActiveTab,
  } = useContext(AppContext);
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="flex justify-between items-center bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mt-2">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            {new Date().getHours() < 12
              ? "Buenos días ☀️"
              : new Date().getHours() < 19
              ? "Buenas tardes 🌤️"
              : "Buenas noches 🌙"}
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-wider mt-1">
            Hoy es{" "}
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 text-orange-600 p-3 rounded-2xl flex flex-col items-center justify-center shadow-inner border border-orange-200">
          <Trophy size={22} className="mb-0.5 text-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-wider">
            Nivel {currentLevel}
          </span>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => setActiveTab("finance")}
          className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl p-5 text-white shadow-md cursor-pointer active:scale-95 transition-transform relative overflow-hidden group"
        >
          <DollarSign
            size={80}
            className="absolute -right-4 -bottom-4 opacity-20 text-emerald-900 group-hover:scale-110 transition-transform"
          />
          <div className="flex items-center gap-1.5 mb-3 opacity-90">
            <Activity size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Balance
            </span>
          </div>
          <p className="text-2xl font-black leading-none">
            ${balance.toLocaleString()}
          </p>
        </div>
        <div
          onClick={() => setActiveTab("tasks")}
          className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl p-5 text-white shadow-md cursor-pointer active:scale-95 transition-transform relative overflow-hidden group"
        >
          <SquareCheck
            size={80}
            className="absolute -right-4 -bottom-4 opacity-20 text-blue-900 group-hover:scale-110 transition-transform"
          />
          <div className="flex items-center gap-1.5 mb-3 opacity-90">
            <Target size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Tareas Hoy
            </span>
          </div>
          <p className="text-2xl font-black leading-none">
            {pendingTasksCount}{" "}
            <span className="text-sm font-medium opacity-80">pend.</span>
          </p>
        </div>
        <div
          onClick={() => setActiveTab("finance")}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-5 text-white shadow-md cursor-pointer active:scale-95 transition-transform relative overflow-hidden group"
        >
          <ShoppingBag
            size={80}
            className="absolute -right-4 -bottom-4 opacity-20 text-indigo-900 group-hover:scale-110 transition-transform"
          />
          <div className="flex items-center gap-1.5 mb-3 opacity-90">
            <TrendingUp size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Ropa (Neto)
            </span>
          </div>
          <p className="text-xl font-black leading-none">
            {netProfitRopa > 0 ? "+" : ""}${netProfitRopa.toLocaleString()}
          </p>
        </div>
        <div
          onClick={() => setActiveTab("academic")}
          className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-5 text-white shadow-md cursor-pointer active:scale-95 transition-transform relative overflow-hidden group"
        >
          <GraduationCap
            size={80}
            className="absolute -right-4 -bottom-4 opacity-20 text-slate-950 group-hover:scale-110 transition-transform"
          />
          <div className="flex items-center gap-1.5 mb-3 opacity-90">
            <Award size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Carrera
            </span>
          </div>
          <p className="text-2xl font-black leading-none">
            {academicProgress}%
          </p>
        </div>
      </div>
      {nextEvent && (
        <Card
          className="bg-rose-50 border-rose-100 flex items-center justify-between cursor-pointer active:scale-95 transition-transform shadow-sm"
          onClick={() => setActiveTab("tasks")}
        >
          <div className="flex items-center gap-4">
            <div className="bg-rose-500 text-white p-3.5 rounded-2xl shadow-sm">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-0.5">
                Siguiente Evento
              </p>
              <p className="font-bold text-slate-800 leading-tight">
                {nextEvent.title}
              </p>
              <p className="text-xs font-bold text-slate-500 mt-1">
                {nextEvent.date.split("-").reverse().join("/")}
              </p>
            </div>
          </div>
          <ChevronRight size={20} className="text-rose-300" />
        </Card>
      )}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
        <Star
          size={100}
          className="absolute -right-10 -bottom-10 text-slate-50 opacity-50"
          fill="currentColor"
        />
        <div className="flex justify-between items-center mb-3 relative z-10">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <Star className="text-amber-400" fill="currentColor" size={18} />{" "}
            Experiencia Actual
          </h3>
          <span className="text-xs font-bold text-slate-400">
            {200 - xpInCurrentLevel} XP para subir
          </span>
        </div>
        <div className="relative z-10">
          <ProgressBar
            progress={levelProgress}
            color="bg-gradient-to-r from-amber-400 to-orange-500"
            size="h-2.5"
          />
          <p className="text-[10px] font-black text-slate-400 text-right mt-2 uppercase tracking-wider">
            {totalXP} XP Totales
          </p>
        </div>
      </div>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <Activity className="text-rose-500" /> Estado Físico Hoy
          </h2>
          <button
            onClick={() => setActiveTab("health")}
            className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
          >
            Ver Detalles
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-3 flex items-center gap-3">
            <div className="bg-blue-100 p-2.5 rounded-xl text-blue-500">
              <Droplet size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                Agua
              </p>
              <p className="font-black text-slate-700 text-sm mt-0.5">
                {todayHealth?.water || 0}/8{" "}
                <span className="text-[10px] font-medium text-slate-400">
                  vasos
                </span>
              </p>
            </div>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-3 flex items-center gap-3">
            <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-500">
              <PieChart size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                Dieta
              </p>
              <p className="font-black text-slate-700 text-sm mt-0.5">
                {dailyMealScore}%{" "}
                <span className="text-[10px] font-medium text-slate-400">
                  logrado
                </span>
              </p>
            </div>
          </div>
          <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-3 flex items-center gap-3">
            <div className="bg-orange-100 p-2.5 rounded-xl text-orange-500">
              <Target size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest">
                Físico
              </p>
              <p
                className={`font-black text-sm mt-0.5 ${
                  trainedToday ? "text-orange-600" : "text-slate-400"
                }`}
              >
                {trainedToday ? "Completado" : "Pendiente"}
              </p>
            </div>
          </div>
          <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-3 flex items-center gap-3">
            <div className="bg-rose-100 p-2.5 rounded-xl text-rose-500">
              <WineOff size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest">
                Alcohol
              </p>
              <p
                className={`font-black text-sm mt-0.5 ${
                  todayHealth?.noAlcohol === true
                    ? "text-emerald-500"
                    : todayHealth?.noAlcohol === false
                    ? "text-rose-500"
                    : "text-slate-400"
                }`}
              >
                {todayHealth?.noAlcohol === true
                  ? "Cero Gotas"
                  : todayHealth?.noAlcohol === false
                  ? "Permitido"
                  : "Pendiente"}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const FinanceView = () => {
  const {
    user,
    todayStr,
    finances,
    clothingBundles,
    balance,
    totalInvestedRopa,
    totalRevenueRopa,
    netProfitRopa,
    projectedRevenueRopa,
    itemsSoldTotalRopa,
    itemsCountTotalRopa,
    showToast,
  } = useContext(AppContext);
  const [financeTab, setFinanceTab] = useState("general");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Club Chenque");
  const [type, setType] = useState("income");
  const categories = [
    "Club Chenque",
    "CEFC",
    "Club Gimnasia",
    "Ventas de ropa",
    "Comida",
    "Transporte",
    "Otros",
  ];

  const [bundleName, setBundleName] = useState("");
  const [bundleCost, setBundleCost] = useState("");
  const [bundleCount, setBundleCount] = useState("");
  const [bundleDate, setBundleDate] = useState(todayStr);
  const [expandedBundles, setExpandedBundles] = useState({});

  const toggleBundle = (id) =>
    setExpandedBundles((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || !user) return;
    try {
      await setDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "finances",
          Date.now().toString()
        ),
        {
          type,
          amount: parseFloat(amount),
          category,
          date: todayStr,
          timestamp: Date.now(),
        }
      );
      setAmount("");
      showToast(
        type === "income" ? "¡Ingreso registrado! 💰" : "Gasto registrado."
      );
    } catch (err) {
      showToast("Error al guardar.");
    }
  };

  const deleteTx = async (id) => {
    if (user)
      await deleteDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "finances",
          id.toString()
        )
      );
  };

  const handleAddBundle = async (e) => {
    e.preventDefault();
    if (!bundleName || !bundleCost || !bundleCount || !user) return;
    const uCost = Math.round(parseFloat(bundleCost) / parseInt(bundleCount));
    const initialItems = Array.from(
      { length: parseInt(bundleCount) },
      (_, i) => ({
        id: Date.now().toString() + "_" + i,
        name: "",
        sellPrice: "",
        isSold: false,
      })
    );

    const selectedTimestamp = new Date(bundleDate + "T12:00:00").getTime();
    const bundleId =
      selectedTimestamp.toString() + "_" + Date.now().toString().slice(-4);

    try {
      await setDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "clothing_bundles",
          bundleId
        ),
        {
          name: bundleName,
          totalCost: parseFloat(bundleCost),
          itemCount: parseInt(bundleCount),
          unitCost: uCost,
          items: initialItems,
          timestamp: selectedTimestamp,
          date: bundleDate,
        }
      );
      await setDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "finances",
          `exp_${bundleId}`
        ),
        {
          type: "expense",
          amount: parseFloat(bundleCost),
          category: "Ventas de ropa",
          date: bundleDate,
          timestamp: selectedTimestamp,
          description: `Compra Fardo: ${bundleName}`,
        }
      );
      setBundleName("");
      setBundleCost("");
      setBundleCount("");
      setBundleDate(todayStr);
      showToast(
        `¡Fardo guardado! Costo unitario base: $${uCost.toLocaleString()}.`
      );
    } catch (err) {
      showToast("Error al guardar fardo.");
    }
  };

  const deleteBundle = async (id) => {
    if (user) {
      await deleteDoc(
        doc(db, "artifacts", appId, "users", user.uid, "clothing_bundles", id)
      );
      showToast("Fardo eliminado.");
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <DollarSign className="text-emerald-500" size={28} /> Finanzas
      </h1>
      <div className="flex gap-2 p-1 bg-slate-200/50 rounded-2xl">
        <button
          onClick={() => setFinanceTab("general")}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2 ${
            financeTab === "general"
              ? "bg-white text-emerald-600 shadow-sm"
              : "text-slate-500"
          }`}
        >
          📈 General
        </button>
        <button
          onClick={() => setFinanceTab("ropa")}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2 ${
            financeTab === "ropa"
              ? "bg-white text-indigo-500 shadow-sm"
              : "text-slate-500"
          }`}
        >
          👕 Ropa
        </button>
      </div>

      {financeTab === "general" ? (
        <div className="animate-in fade-in duration-200 space-y-6">
          <div className="bg-slate-800 rounded-3xl p-6 text-white text-center shadow-lg">
            <p className="text-slate-400 font-medium mb-1">Balance Actual</p>
            <h2
              className={`text-4xl font-black ${
                balance >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              ${balance.toLocaleString()}
            </h2>
          </div>
          <Card>
            <h3 className="font-bold text-slate-800 mb-4">Nueva Transacción</h3>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setType("income")}
                  className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${
                    type === "income"
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Ingreso
                </button>
                <button
                  type="button"
                  onClick={() => setType("expense")}
                  className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${
                    type === "expense"
                      ? "bg-white text-rose-600 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Gasto
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 font-bold">
                  $
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-4 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  required
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className={`w-full text-white rounded-xl py-3.5 font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2 ${
                  type === "income"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-rose-500 hover:bg-rose-600"
                }`}
              >
                <Plus size={20} /> Guardar
              </button>
            </form>
          </Card>
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 px-1">
              Movimientos Recientes
            </h3>
            {finances.transactions.length === 0 ? (
              <p className="text-slate-500 text-center py-4">
                No hay movimientos.
              </p>
            ) : (
              finances.transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-xl ${
                        tx.type === "income"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {tx.type === "income" ? (
                        <TrendingUp size={20} />
                      ) : (
                        <TrendingDown size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 leading-tight">
                        {tx.category}
                      </p>
                      <p className="text-xs text-slate-400">
                        {tx.description ||
                          tx.date.split("-").reverse().join("/")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold ${
                        tx.type === "income"
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"}$
                      {tx.amount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => deleteTx(tx.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-200 space-y-6">
          {/* NUEVO BALANCE MACRO */}
          <div className="bg-indigo-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
            <ShoppingBag
              size={120}
              className="absolute -right-4 -bottom-4 text-indigo-800 opacity-30"
            />
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-4 relative z-10">
              Balance Global de Ropa
            </h2>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 relative z-10 mb-5">
              <div>
                <p className="text-[10px] text-indigo-200 font-bold uppercase mb-0.5">
                  Total Invertido
                </p>
                <p className="font-black text-xl text-white">
                  ${totalInvestedRopa.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-indigo-200 font-bold uppercase mb-0.5">
                  Total Recuperado
                </p>
                <p className="font-black text-xl text-emerald-400">
                  ${totalRevenueRopa.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-indigo-200 font-bold uppercase mb-0.5">
                  Ganancia Neta (Bolsillo)
                </p>
                <p
                  className={`font-black text-xl ${
                    netProfitRopa >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {netProfitRopa > 0 ? "+" : ""}$
                  {netProfitRopa.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-indigo-200 font-bold uppercase mb-0.5">
                  Por Cobrar (Proyectado)
                </p>
                <p className="font-black text-xl text-amber-300">
                  ${projectedRevenueRopa.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Barra de progreso de Retorno de Inversión (ROI) */}
            <div className="relative z-10 border-t border-indigo-500/50 pt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-indigo-100 uppercase tracking-wider">
                  Recuperación de Inversión
                </span>
                <span className="text-xs font-black">
                  {Math.min(
                    Math.round(
                      (totalRevenueRopa / (totalInvestedRopa || 1)) * 100
                    ),
                    100
                  )}
                  %
                </span>
              </div>
              <ProgressBar
                progress={Math.min(
                  (totalRevenueRopa / (totalInvestedRopa || 1)) * 100,
                  100
                )}
                color={
                  totalRevenueRopa >= totalInvestedRopa
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }
                size="h-2"
              />
            </div>
          </div>

          <Card>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
              <Package size={18} className="text-indigo-500" /> Comprar Nuevo
              Fardo
            </h3>
            <form onSubmit={handleAddBundle} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="date"
                  value={bundleDate}
                  onChange={(e) => setBundleDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 font-bold text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-32 shrink-0"
                />
                <input
                  type="text"
                  value={bundleName}
                  onChange={(e) => setBundleName(e.target.value)}
                  placeholder="Nombre (Ej. Fardo USA)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-3.5 text-slate-400 font-bold text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    value={bundleCost}
                    onChange={(e) => setBundleCost(e.target.value)}
                    placeholder="Costo Total"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-3 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
                <input
                  type="number"
                  value={bundleCount}
                  onChange={(e) => setBundleCount(e.target.value)}
                  placeholder="Cant. Prendas"
                  className="flex-[0.8] bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 rounded-xl shadow-md active:scale-95 transition-transform"
                >
                  <Plus size={20} />
                </button>
              </div>
            </form>
          </Card>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-slate-800">
                Balances Individuales
              </h3>
              <span className="text-xs font-bold text-slate-400">
                {clothingBundles.length} fardos
              </span>
            </div>
            {clothingBundles.length === 0 ? (
              <p className="text-center text-slate-400 py-6 font-medium bg-white rounded-2xl border border-dashed border-slate-200">
                Aún no hay fardos cargados.
              </p>
            ) : (
              clothingBundles.map((bundle) => {
                const soldInBundle = bundle.items.filter(
                  (i) => i.isSold
                ).length;
                const isExpanded = expandedBundles[bundle.id];

                // Cálculos individuales del fardo
                let bundleRecaudado = 0;
                bundle.items.forEach((i) => {
                  if (i.isSold) bundleRecaudado += Number(i.sellPrice) || 0;
                });

                const rentabilidad = bundleRecaudado - bundle.totalCost;
                const faltante = bundle.totalCost - bundleRecaudado;

                return (
                  <div
                    key={bundle.id}
                    className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${
                      isExpanded
                        ? "border-indigo-300"
                        : "border-slate-200 hover:border-indigo-200"
                    }`}
                  >
                    <div
                      onClick={() => toggleBundle(bundle.id)}
                      className="p-4 cursor-pointer select-none relative group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <FolderOpen
                            size={20}
                            className={
                              isExpanded
                                ? "text-indigo-500"
                                : "text-slate-400 group-hover:text-indigo-400"
                            }
                          />
                          <div>
                            <h4 className="font-black text-slate-800 text-[15px] leading-tight">
                              {bundle.name}
                            </h4>
                            <span className="text-[10px] font-bold text-slate-400">
                              {bundle.date
                                ? bundle.date.split("-").reverse().join("/")
                                : "Sin fecha"}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          {rentabilidad >= 0 ? (
                            <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                              Rentable
                            </span>
                          ) : null}
                          {isExpanded ? (
                            <ChevronUp size={18} className="text-slate-400" />
                          ) : (
                            <ChevronDown size={18} className="text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* NUEVO BALANCE INDIVIDUAL */}
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-100">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">
                            Gastaste (Costo)
                          </p>
                          <p className="text-sm font-black text-rose-500">
                            ${bundle.totalCost.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-xl text-center border border-slate-100">
                          <p className="text-[9px] font-bold text-slate-400 uppercase">
                            Recuperaste
                          </p>
                          <p className="text-sm font-black text-emerald-500">
                            ${bundleRecaudado.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`mt-2 p-2.5 rounded-xl border flex items-center justify-between ${
                          rentabilidad >= 0
                            ? "bg-emerald-50 border-emerald-100"
                            : "bg-amber-50 border-amber-100"
                        }`}
                      >
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider ${
                            rentabilidad >= 0
                              ? "text-emerald-700"
                              : "text-amber-700"
                          }`}
                        >
                          {rentabilidad >= 0
                            ? "Balance de Ganancia:"
                            : "Falta recuperar:"}
                        </span>
                        <span
                          className={`font-black text-sm ${
                            rentabilidad >= 0
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}
                        >
                          {rentabilidad >= 0
                            ? `+ $${rentabilidad.toLocaleString()}`
                            : `$${faltante.toLocaleString()}`}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden mr-3">
                          <div
                            className="bg-indigo-500 h-full rounded-full"
                            style={{
                              width: `${
                                (soldInBundle / bundle.itemCount) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-black text-slate-500 shrink-0">
                          {soldInBundle}/{bundle.itemCount} vend.
                        </span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-2 border-t border-slate-100 bg-slate-50/50 space-y-1.5 animate-in slide-in-from-top-2">
                        {bundle.items.map((item) => (
                          <ClothingItemRow
                            key={item.id}
                            bundle={bundle}
                            item={item}
                          />
                        ))}
                        <div className="p-2 mt-2 flex justify-end">
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "¿Seguro que deseas eliminar este fardo?"
                                )
                              )
                                deleteBundle(bundle.id);
                            }}
                            className="text-xs font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                          >
                            <Trash2 size={14} /> Eliminar Fardo completo
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AcademicView = () => {
  const {
    user,
    subjects,
    assignments,
    academicProgress,
    academic,
    activeSubjectId,
    setActiveSubjectId,
    showToast,
  } = useContext(AppContext);
  const [newSubjName, setNewSubjName] = useState("");
  const [newAssignTitle, setNewAssignTitle] = useState("");
  const [newAssignDate, setNewAssignDate] = useState("");
  const [newAssignType, setNewAssignType] = useState("tp");
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [subjDetails, setSubjDetails] = useState({
    group: "",
    classmates: "",
    notes: "",
  });

  const activeSubject = subjects.find((s) => s.id === activeSubjectId);
  const subjectAssignments = assignments
    .filter((a) => a.subjectId === activeSubjectId)
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  useEffect(() => {
    if (activeSubject) {
      setSubjDetails({
        group: activeSubject.group || "",
        classmates: activeSubject.classmates || "",
        notes: activeSubject.notes || "",
      });
      setIsEditingDetails(false);
    }
  }, [activeSubjectId, subjects]);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubjName.trim() || !user) return;
    try {
      await setDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "subjects",
          Date.now().toString()
        ),
        { name: newSubjName, timestamp: Date.now() }
      );
      setNewSubjName("");
      showToast("Nueva carpeta creada. 📂");
    } catch (err) {}
  };
  const handleDeleteSubject = async (id) => {
    if (!user) return;
    await deleteDoc(
      doc(db, "artifacts", appId, "users", user.uid, "subjects", id)
    ).catch((e) => console.error(e));
    if (activeSubjectId === id) setActiveSubjectId(null);
  };
  const handleSaveSubjDetails = async () => {
    if (!user || !activeSubjectId) return;
    try {
      await setDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "subjects",
          activeSubjectId
        ),
        { ...subjDetails },
        { merge: true }
      );
      setIsEditingDetails(false);
      showToast("Detalles guardados. 📝");
    } catch (err) {}
  };
  const handlePassSubject = async () => {
    if (academic.passed < academic.total && user && activeSubject) {
      try {
        await setDoc(
          doc(
            db,
            "artifacts",
            appId,
            "users",
            user.uid,
            "settings",
            "academic"
          ),
          { ...academic, passed: academic.passed + 1 },
          { merge: true }
        );
        await handleDeleteSubject(activeSubject.id);
        setActiveSubjectId(null);
        showToast(`¡FELICIDADES! 🎉 ${activeSubject.name} adentro.`);
      } catch (e) {}
    }
  };
  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (!newAssignTitle.trim() || !user || !activeSubjectId) return;
    try {
      await setDoc(
        doc(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "assignments",
          Date.now().toString()
        ),
        {
          subjectId: activeSubjectId,
          title: newAssignTitle,
          type: newAssignType,
          dueDate: newAssignDate || null,
          completed: false,
          timestamp: Date.now(),
        }
      );
      setNewAssignTitle("");
      setNewAssignDate("");
      setNewAssignType("tp");
    } catch (e) {}
  };
  const toggleAssignment = async (id, currentStatus) => {
    if (user)
      await setDoc(
        doc(db, "artifacts", appId, "users", user.uid, "assignments", id),
        { completed: !currentStatus },
        { merge: true }
      );
  };
  const deleteAssignment = async (id) => {
    if (user)
      await deleteDoc(
        doc(db, "artifacts", appId, "users", user.uid, "assignments", id)
      );
  };

  const getAssignTypeUI = (type) => {
    switch (type) {
      case "parcial":
        return {
          icon: <CircleAlert size={14} />,
          label: "Examen",
          color: "text-rose-500 bg-rose-100",
        };
      case "foro":
        return {
          icon: <MessageCircle size={14} />,
          label: "Foro",
          color: "text-blue-500 bg-blue-100",
        };
      case "lectura":
        return {
          icon: <BookOpen size={14} />,
          label: "Lectura",
          color: "text-emerald-500 bg-emerald-100",
        };
      case "tp":
      default:
        return {
          icon: <FileText size={14} />,
          label: "TP",
          color: "text-indigo-500 bg-indigo-100",
        };
    }
  };

  if (activeSubjectId && activeSubject) {
    const completedCount = subjectAssignments.filter((a) => a.completed).length;
    const totalCount = subjectAssignments.length;
    const subjProgress =
      totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
    return (
      <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20">
        <button
          onClick={() => setActiveSubjectId(null)}
          className="flex items-center gap-2 text-indigo-500 font-bold bg-indigo-50 px-4 py-2 rounded-xl active:scale-95 transition-all"
        >
          <ArrowLeft size={18} /> Volver
        </button>
        <div className="bg-indigo-600 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
          <BookOpen
            size={120}
            className="absolute -right-6 -bottom-6 text-indigo-800 opacity-20"
          />
          <h2 className="text-2xl font-black mb-1 relative z-10">
            {activeSubject.name}
          </h2>
          <div className="relative z-10 flex items-center justify-between mt-4">
            <p className="text-indigo-200 font-bold text-sm">
              Progreso Interno
            </p>
            <span className="font-black">{subjProgress}%</span>
          </div>
          <div className="mt-2 relative z-10">
            <ProgressBar
              progress={subjProgress}
              color="bg-white"
              size="h-1.5"
            />
          </div>
          <button
            onClick={handlePassSubject}
            className="mt-6 w-full bg-white text-indigo-600 font-black py-3 rounded-xl shadow-md active:scale-95 transition-transform flex justify-center items-center gap-2 relative z-10 hover:bg-indigo-50"
          >
            <Trophy size={20} className="text-amber-500" /> ¡APROBÉ ESTA
            MATERIA!
          </button>
        </div>
        <Card className="border-indigo-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Users size={18} className="text-indigo-500" /> Cursada
            </h3>
            <button
              onClick={() =>
                isEditingDetails
                  ? handleSaveSubjDetails()
                  : setIsEditingDetails(true)
              }
              className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 ${
                isEditingDetails
                  ? "bg-emerald-500 text-white"
                  : "bg-indigo-50 text-indigo-600"
              }`}
            >
              {isEditingDetails ? (
                <>
                  <Save size={14} /> Guardar
                </>
              ) : (
                <>
                  <Pen size={14} /> Editar
                </>
              )}
            </button>
          </div>
          {isEditingDetails ? (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400">
                  Grupo
                </label>
                <input
                  type="text"
                  value={subjDetails.group}
                  onChange={(e) =>
                    setSubjDetails({ ...subjDetails, group: e.target.value })
                  }
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400">
                  Compañeros
                </label>
                <input
                  type="text"
                  value={subjDetails.classmates}
                  onChange={(e) =>
                    setSubjDetails({
                      ...subjDetails,
                      classmates: e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400">
                  Notas / Links
                </label>
                <textarea
                  value={subjDetails.notes}
                  onChange={(e) =>
                    setSubjDetails({ ...subjDetails, notes: e.target.value })
                  }
                  className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none min-h-[80px]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <Users size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 leading-none">
                    Grupo y Compañeros
                  </p>
                  <p className="text-sm font-medium text-slate-700 mt-1">
                    {activeSubject.group || activeSubject.classmates
                      ? `${activeSubject.group} ${activeSubject.classmates}`
                      : "No especificado"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <LinkIcon
                  size={16}
                  className="text-slate-400 mt-0.5 shrink-0"
                />
                <div className="w-full">
                  <p className="text-[10px] font-black uppercase text-slate-400 leading-none">
                    Notas / Enlaces
                  </p>
                  <p className="text-sm font-medium text-slate-700 mt-1 whitespace-pre-wrap break-words">
                    {activeSubject.notes || "No hay notas"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
        <Card>
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-indigo-500" /> Nueva Tarea
          </h3>
          <form onSubmit={handleAddAssignment} className="space-y-3">
            <input
              type="text"
              value={newAssignTitle}
              onChange={(e) => setNewAssignTitle(e.target.value)}
              placeholder="Ej: Resumen..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium outline-none"
            />
            <div className="flex gap-2">
              <select
                value={newAssignType}
                onChange={(e) => setNewAssignType(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2 text-sm font-medium outline-none"
              >
                <option value="tp">TP</option>
                <option value="parcial">Examen</option>
                <option value="foro">Foro</option>
                <option value="lectura">Lectura</option>
              </select>
              <div className="relative flex-1">
                <Calendar
                  size={18}
                  className="absolute left-3 top-3.5 text-slate-400"
                />
                <input
                  type="date"
                  value={newAssignDate}
                  onChange={(e) => setNewAssignDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-2 py-3 font-bold text-slate-700 text-sm outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 rounded-xl shadow-md"
              >
                <Plus size={20} />
              </button>
            </div>
          </form>
        </Card>
        <div className="space-y-3">
          <h3 className="font-bold text-slate-800 px-1">Cronograma</h3>
          {subjectAssignments.map((a) => {
            const typeUI = getAssignTypeUI(a.type);
            return (
              <div
                key={a.id}
                className="p-4 rounded-2xl border-2 transition-all flex items-start gap-3 bg-white border-slate-200"
              >
                <button
                  onClick={() => toggleAssignment(a.id, a.completed)}
                  className={`mt-0.5 shrink-0 active:scale-90 transition-transform ${
                    a.completed ? "text-emerald-500" : "text-slate-300"
                  }`}
                >
                  {a.completed ? (
                    <CircleCheck size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <div className="flex-1">
                  <p
                    className={`font-bold ${
                      a.completed
                        ? "text-slate-500 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {a.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded flex items-center gap-1 ${
                        a.completed
                          ? "bg-slate-100 text-slate-400"
                          : typeUI.color
                      }`}
                    >
                      {typeUI.icon} {typeUI.label}
                    </span>
                    {a.dueDate && !a.completed && (
                      <span className="text-xs font-bold text-slate-400">
                        {a.dueDate.split("-").reverse().join("/")}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteAssignment(a.id)}
                  className="text-slate-300 hover:text-rose-500 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <GraduationCap className="text-indigo-500" size={28} /> Universidad
      </h1>
      <Card className="text-center py-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-indigo-50" />
        <Award className="mx-auto text-indigo-500 mb-3" size={40} />
        <h2 className="text-5xl font-black text-slate-800 mb-1">
          {academicProgress}%
        </h2>
        <p className="text-slate-500 font-medium mb-5">
          Progreso ({academic.passed}/{academic.total})
        </p>
        <ProgressBar
          progress={academicProgress}
          color="bg-indigo-500"
          size="h-4"
        />
      </Card>
      <div>
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
          <FolderOpen className="text-indigo-500" size={20} /> Carpetas Activas
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {subjects.map((s) => {
            const pends = assignments.filter(
              (a) => a.subjectId === s.id && !a.completed
            ).length;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSubjectId(s.id)}
                className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:border-indigo-300 text-left group relative overflow-hidden flex flex-col h-32"
              >
                <div className="flex justify-between items-start w-full">
                  <FolderOpen className="text-indigo-400" size={28} />
                </div>
                <p className="font-bold text-slate-800 text-sm leading-tight mt-auto pt-2">
                  {s.name}
                </p>
                <p className="text-[10px] font-black text-slate-400 mt-1 uppercase">
                  {pends > 0 ? `${pends} Pendientes` : "Al día"}
                </p>
                <div
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubject(s.id);
                  }}
                >
                  <Trash2
                    size={14}
                    className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100"
                  />
                </div>
              </button>
            );
          })}
        </div>
        <form onSubmit={handleAddSubject} className="flex gap-2">
          <input
            type="text"
            value={newSubjName}
            onChange={(e) => setNewSubjName(e.target.value)}
            placeholder="Añadir materia..."
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-5 rounded-xl"
          >
            <Plus size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

const TasksView = () => {
  const {
    user,
    tasks,
    dailyTasksList,
    eventTasksList,
    tasksProgress,
    todayStr,
    showToast,
  } = useContext(AppContext);
  const [taskViewMode, setTaskViewMode] = useState("daily");
  const [dailyTitle, setDailyTitle] = useState("");
  const [dailyCategory, setDailyCategory] = useState("casa");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteColor, setNoteColor] = useState(
    "bg-yellow-100 border-yellow-200 text-yellow-800"
  );

  const handleAddDaily = async (e) => {
    e.preventDefault();
    if (!dailyTitle.trim() || !user) return;
    await setDoc(
      doc(
        db,
        "artifacts",
        appId,
        "users",
        user.uid,
        "tasks",
        Date.now().toString()
      ),
      {
        title: dailyTitle,
        category: dailyCategory,
        type: "daily",
        completed: false,
        timestamp: Date.now(),
      }
    );
    setDailyTitle("");
  };
  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDate || !user) return;
    await setDoc(
      doc(
        db,
        "artifacts",
        appId,
        "users",
        user.uid,
        "tasks",
        Date.now().toString()
      ),
      {
        title: eventTitle,
        date: eventDate,
        isImportant,
        type: "event",
        completed: false,
        timestamp: Date.now(),
      }
    );
    setEventTitle("");
    setEventDate("");
    setIsImportant(false);
  };
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim() || !user) return;
    await setDoc(
      doc(
        db,
        "artifacts",
        appId,
        "users",
        user.uid,
        "tasks",
        Date.now().toString()
      ),
      {
        title: noteTitle,
        content: noteContent,
        color: noteColor,
        type: "note",
        timestamp: Date.now(),
      }
    );
    setNoteTitle("");
    setNoteContent("");
    showToast("¡Nota pegada!");
  };
  const toggleTask = async (id, currentStatus) => {
    if (user)
      await setDoc(
        doc(db, "artifacts", appId, "users", user.uid, "tasks", id),
        { completed: !currentStatus },
        { merge: true }
      );
  };
  const deleteT = async (id) => {
    if (user)
      await deleteDoc(
        doc(db, "artifacts", appId, "users", user.uid, "tasks", id)
      );
  };
  const clearCompletedDaily = async () => {
    if (!user) return;
    const completedToClear = dailyTasksList.filter((t) => t.completed);
    for (const t of completedToClear) {
      await deleteDoc(
        doc(db, "artifacts", appId, "users", user.uid, "tasks", t.id)
      );
    }
    showToast("Papel limpio.");
  };

  const categoryIcons = {
    casa: "🏠",
    estudio: "📚",
    entrenamiento: "🏋️",
    trabajo: "💼",
    personal: "👤",
  };
  const notesList = tasks
    .filter((t) => t.type === "note")
    .sort((a, b) => b.timestamp - a.timestamp);
  const noteColors = [
    {
      id: "yellow",
      classes: "bg-yellow-100 border-yellow-200 text-yellow-800",
    },
    { id: "pink", classes: "bg-pink-100 border-pink-200 text-pink-800" },
    { id: "blue", classes: "bg-blue-100 border-blue-200 text-blue-800" },
    {
      id: "emerald",
      classes: "bg-emerald-100 border-emerald-200 text-emerald-800",
    },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <SquareCheck className="text-blue-500" size={28} /> Organización
      </h1>
      <div className="flex gap-1 p-1 bg-slate-200/50 rounded-2xl overflow-x-auto snap-x hide-scrollbar">
        <button
          onClick={() => setTaskViewMode("daily")}
          className={`min-w-[100px] flex-1 py-2.5 rounded-xl font-bold text-xs flex justify-center items-center gap-1.5 snap-center ${
            taskViewMode === "daily"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500"
          }`}
        >
          📝 Hoy
        </button>
        <button
          onClick={() => setTaskViewMode("events")}
          className={`min-w-[100px] flex-1 py-2.5 rounded-xl font-bold text-xs flex justify-center items-center gap-1.5 snap-center ${
            taskViewMode === "events"
              ? "bg-white text-rose-500 shadow-sm"
              : "text-slate-500"
          }`}
        >
          📅 Eventos
        </button>
        <button
          onClick={() => setTaskViewMode("notes")}
          className={`min-w-[100px] flex-1 py-2.5 rounded-xl font-bold text-xs flex justify-center items-center gap-1.5 snap-center ${
            taskViewMode === "notes"
              ? "bg-white text-amber-500 shadow-sm"
              : "text-slate-500"
          }`}
        >
          📌 Muro
        </button>
      </div>

      {taskViewMode === "daily" && (
        <div className="animate-in fade-in duration-200">
          <Card>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-500">Progreso</span>
              <span className="text-sm font-black text-blue-500">
                {tasksProgress}%
              </span>
            </div>
            <ProgressBar
              progress={tasksProgress}
              color="bg-blue-500"
              size="h-3"
            />
          </Card>
          <form onSubmit={handleAddDaily} className="flex gap-2 mt-4 mb-6">
            <input
              type="text"
              value={dailyTitle}
              onChange={(e) => setDailyTitle(e.target.value)}
              placeholder="Añadir tarea..."
              className="flex-1 bg-white border border-slate-200 rounded-xl py-3 px-4 font-medium outline-none"
            />
            <select
              value={dailyCategory}
              onChange={(e) => setDailyCategory(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-2 text-xl outline-none"
            >
              <option value="casa">🏠</option>
              <option value="estudio">📚</option>
              <option value="entrenamiento">🏋️</option>
              <option value="trabajo">💼</option>
              <option value="personal">👤</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-xl"
            >
              <Plus size={24} />
            </button>
          </form>
          <div className="space-y-3 bg-yellow-50/50 p-3 rounded-3xl border border-yellow-100 min-h-[300px]">
            <div className="flex justify-between items-center px-2 pb-2 mb-2 border-b border-yellow-200">
              <span className="font-bold text-yellow-800 text-sm opacity-60 uppercase tracking-widest">
                Tareas
              </span>
              {dailyTasksList.some((t) => t.completed) && (
                <button
                  onClick={clearCompletedDaily}
                  className="text-[10px] font-bold bg-yellow-200 text-yellow-800 px-2 py-1 rounded flex items-center gap-1"
                >
                  <Eraser size={12} /> Limpiar
                </button>
              )}
            </div>
            {dailyTasksList.map((t) => (
              <div
                key={t.id}
                className={`bg-white p-4 rounded-2xl flex items-center gap-4 ${
                  t.completed
                    ? "opacity-50"
                    : "border border-slate-200 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleTask(t.id, t.completed)}
                  className={t.completed ? "text-blue-500" : "text-slate-300"}
                >
                  {t.completed ? (
                    <CircleCheck size={28} />
                  ) : (
                    <Circle size={28} />
                  )}
                </button>
                <div className="flex-1">
                  <p
                    className={`font-bold text-[17px] leading-tight ${
                      t.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {t.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-slate-100 px-1.5 py-0.5 rounded opacity-70">
                      {categoryIcons[t.category]} {t.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteT(t.id)}
                  className="text-slate-300 hover:text-rose-500 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {taskViewMode === "events" && (
        <div className="animate-in fade-in duration-200">
          <Card className="mb-6">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
              <Calendar size={18} className="text-rose-500" /> Nuevo Evento
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-3">
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Ej: Torneo..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium outline-none"
              />
              <div className="flex gap-2 items-center">
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 font-bold text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsImportant(!isImportant)}
                  className={`p-2 rounded-xl border ${
                    isImportant
                      ? "bg-rose-100 border-rose-300 text-rose-600"
                      : "bg-slate-50 text-slate-400"
                  }`}
                >
                  <Flag
                    size={18}
                    fill={isImportant ? "currentColor" : "none"}
                  />
                </button>
                <button
                  type="submit"
                  className="bg-rose-500 text-white p-3 rounded-xl"
                >
                  <Plus size={24} />
                </button>
              </div>
            </form>
          </Card>
          <div className="space-y-3">
            {eventTasksList.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl border flex items-start gap-3 bg-white border-slate-200"
              >
                <button
                  onClick={() => toggleTask(t.id, t.completed)}
                  className={t.completed ? "text-rose-500" : "text-slate-300"}
                >
                  {t.completed ? (
                    <CircleCheck size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p
                      className={`font-bold ${
                        t.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-800"
                      }`}
                    >
                      {t.title}
                    </p>
                    {t.isImportant && (
                      <Flag size={14} className="text-rose-500 fill-current" />
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-slate-100 mt-2 inline-block">
                    {t.date.split("-").reverse().join("/")}
                  </span>
                </div>
                <button
                  onClick={() => deleteT(t.id)}
                  className="text-slate-300 hover:text-rose-500 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {taskViewMode === "notes" && (
        <div className="animate-in fade-in duration-200">
          <Card className="mb-6 bg-amber-50/50 border-amber-100">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
              <StickyNote size={18} className="text-amber-500" /> Nuevo Post-it
            </h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Título"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold text-sm outline-none"
              />
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Nota..."
                className="w-full bg-white border rounded-xl px-4 py-3 min-h-[80px] text-sm outline-none"
              />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {noteColors.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setNoteColor(c.classes)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        c.classes.split(" ")[0]
                      } ${
                        noteColor === c.classes
                          ? "border-slate-400"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-amber-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                >
                  Pegar <Pin size={16} />
                </button>
              </div>
            </form>
          </Card>
          <div className="columns-2 gap-3 space-y-3">
            {notesList.map((n) => (
              <div
                key={n.id}
                className={`break-inside-avoid p-4 rounded-xl shadow-sm border relative group ${n.color}`}
              >
                <Pin
                  size={16}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 text-slate-400"
                />
                {n.title && <p className="font-black mb-1">{n.title}</p>}
                <p className="font-medium text-sm whitespace-pre-wrap">
                  {n.content}
                </p>
                <button
                  onClick={() => deleteT(n.id)}
                  className="absolute bottom-2 right-2 p-1.5 bg-black/10 rounded-full text-black/60"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- SUB-COMPONENTES HEALTH ---
const MealEditorRow = ({ meal, mealNameStr }) => {
  const { tempMealPlan, setTempMealPlan, showToast } = useContext(AppContext);
  const planData = tempMealPlan[meal] || emptyMeal;
  const [selectedFood, setSelectedFood] = useState("");
  const [amountGrams, setAmountGrams] = useState("");
  const [showCalc, setShowCalc] = useState(false);

  const handleMacroChange = (field, value) =>
    setTempMealPlan((prev) => ({
      ...prev,
      [meal]: { ...prev[meal], [field]: value },
    }));
  const handleCalcFood = () => {
    const food = FOOD_DB.find((f) => f.id === selectedFood);
    if (!food || !amountGrams) return;
    const factor = Number(amountGrams) / 100;
    setTempMealPlan((prev) => {
      const current = prev[meal] || emptyMeal;
      const newName = current.name
        ? `${current.name} + ${food.name}`
        : `${food.name}`;
      return {
        ...prev,
        [meal]: {
          name: newName,
          protein: (Number(current.protein) || 0) + Math.round(food.p * factor),
          carbs: (Number(current.carbs) || 0) + Math.round(food.c * factor),
          fat: (Number(current.fat) || 0) + Math.round(food.f * factor),
        },
      };
    });
    showToast("Calculado y sumado.");
    setSelectedFood("");
    setAmountGrams("");
  };

  return (
    <div className="bg-white p-3 rounded-xl border border-slate-200 mb-2">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-black text-slate-500 uppercase">
          {mealNameStr}
        </label>
        <button
          onClick={() => setShowCalc(!showCalc)}
          className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded"
        >
          Calc
        </button>
      </div>
      {showCalc && (
        <div className="mb-3 flex gap-2">
          <select
            value={selectedFood}
            onChange={(e) => setSelectedFood(e.target.value)}
            className="flex-1 text-xs py-1 px-2 border rounded"
          >
            <option value="">Alimento...</option>
            {FOOD_DB.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={amountGrams}
            onChange={(e) => setAmountGrams(e.target.value)}
            placeholder="Gr"
            className="w-16 text-xs py-1 px-2 border rounded"
          />
          <button
            onClick={handleCalcFood}
            className="bg-emerald-500 text-white p-1 rounded"
          >
            <Plus size={14} />
          </button>
        </div>
      )}
      <input
        type="text"
        value={planData.name || ""}
        onChange={(e) => handleMacroChange("name", e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm font-bold mb-2 outline-none"
        placeholder="Ej. Pollo"
      />
      <div className="grid grid-cols-3 gap-2">
        <div>
          <span className="text-[9px] font-bold text-blue-500">Prot (g)</span>
          <input
            type="number"
            value={planData.protein || ""}
            onChange={(e) => handleMacroChange("protein", e.target.value)}
            className="w-full px-2 py-1 border rounded-md text-xs outline-none"
          />
        </div>
        <div>
          <span className="text-[9px] font-bold text-amber-500">Carb (g)</span>
          <input
            type="number"
            value={planData.carbs || ""}
            onChange={(e) => handleMacroChange("carbs", e.target.value)}
            className="w-full px-2 py-1 border rounded-md text-xs outline-none"
          />
        </div>
        <div>
          <span className="text-[9px] font-bold text-rose-400">Grasa (g)</span>
          <input
            type="number"
            value={planData.fat || ""}
            onChange={(e) => handleMacroChange("fat", e.target.value)}
            className="w-full px-2 py-1 border rounded-md text-xs outline-none"
          />
        </div>
      </div>
    </div>
  );
};

const HealthView = () => {
  const {
    user,
    todayStr,
    healthRecords,
    todayPlan,
    totalKcalIn,
    totalKcalOut,
    totalProtein,
    totalCarbs,
    totalFat,
    alcoholStreak,
    weightHistory,
    photos,
    showToast,
    tempMealPlan,
    setTempMealPlan,
    todayName,
  } = useContext(AppContext);
  const todayRec = healthRecords[todayStr] || {};

  const [trainingType, setTrainingType] = useState("Fuerza");
  const [trainingDetail, setTrainingDetail] = useState("");
  const [trainingKcal, setTrainingKcal] = useState("");
  const [dailySteps, setDailySteps] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newWaist, setNewWaist] = useState("");
  const [editMealPlan, setEditMealPlan] = useState(false);
  const [expandedMeal, setExpandedMeal] = useState(null);

  const saveField = async (field, value) => {
    if (!user) return;
    await setDoc(
      doc(db, "artifacts", appId, "users", user.uid, "health", todayStr),
      { [field]: value, date: todayStr },
      { merge: true }
    );
  };
  const saveNested = async (parent, field, value) => {
    if (!user) return;
    const cur = todayRec[parent] || {};
    await setDoc(
      doc(db, "artifacts", appId, "users", user.uid, "health", todayStr),
      { [parent]: { ...cur, [field]: value }, date: todayStr },
      { merge: true }
    );
  };
  const handleSaveTraining = async (e) => {
    e.preventDefault();
    if (!user) return;
    await setDoc(
      doc(db, "artifacts", appId, "users", user.uid, "health", todayStr),
      {
        training: trainingType,
        trainingDetail: trainingDetail || trainingType,
        trainingKcal: Number(trainingKcal) || 0,
        steps: Number(dailySteps) || 0,
        date: todayStr,
      },
      { merge: true }
    );
    showToast("¡Actividad registrada!");
  };
  const handleSaveMeasurements = async (e) => {
    e.preventDefault();
    if (!user || (!newWeight && !newWaist)) return;
    await setDoc(
      doc(
        db,
        "artifacts",
        appId,
        "users",
        user.uid,
        "weight",
        Date.now().toString()
      ),
      {
        weight: parseFloat(newWeight) || null,
        waist: parseFloat(newWaist) || null,
        date: todayStr,
        timestamp: Date.now(),
      }
    );
    setNewWeight("");
    setNewWaist("");
    showToast("Medidas guardadas.");
  };
  const handleSaveMealPlan = async () => {
    if (!user) return;
    await setDoc(
      doc(db, "artifacts", appId, "users", user.uid, "settings", "mealPlan"),
      { [todayName]: tempMealPlan },
      { merge: true }
    );
    setEditMealPlan(false);
    showToast("Plan actualizado.");
  };
  const handlePhotoUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file || !user) return;
    showToast("Procesando...");
    const b64 = await compressImage(file);
    await setDoc(
      doc(
        db,
        "artifacts",
        appId,
        "users",
        user.uid,
        "photos",
        Date.now().toString()
      ),
      { image: b64, type, date: todayStr, timestamp: Date.now() }
    );
  };
  const deletePhoto = async (id) => {
    if (user)
      await deleteDoc(
        doc(db, "artifacts", appId, "users", user.uid, "photos", id)
      );
  };

  const HabitToggle = ({ label, icon, status, field, racha }) => (
    <div className="flex justify-between p-4 bg-white rounded-2xl border shadow-sm items-center">
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-xl ${
            status === true
              ? "bg-emerald-100 text-emerald-600"
              : status === false
              ? "bg-rose-100 text-rose-600"
              : "bg-slate-100"
          }`}
        >
          {icon}
        </div>
        <div>
          <span className="font-bold">{label}</span>
          {status === true && racha > 0 && (
            <span className="text-xs text-emerald-500 block">
              Racha: {racha}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => saveField(field, false)}
          className="p-2 bg-rose-100 text-rose-500 rounded-full"
        >
          <CircleX size={20} />
        </button>
        <button
          onClick={() => saveField(field, true)}
          className="p-2 bg-emerald-100 text-emerald-500 rounded-full"
        >
          <CircleCheck size={20} />
        </button>
      </div>
    </div>
  );

  const MealRow = ({ name, label }) => {
    const status = todayRec.meals?.[name];
    const pData = todayPlan[name] || {};
    const isEx = expandedMeal === name;
    return (
      <div className="bg-white rounded-xl border mb-2">
        <div className="flex justify-between p-3 bg-slate-50">
          <div
            className="flex-1"
            onClick={() => setExpandedMeal(isEx ? null : name)}
          >
            <p className="text-[10px] text-slate-400 font-black uppercase">
              {label}
            </p>
            <p className="font-bold text-sm">{pData.name || "Sin definir"}</p>
          </div>
          <div className="flex gap-1 border-l pl-2">
            <button
              onClick={() => saveNested("meals", name, false)}
              className="p-2 text-rose-300"
            >
              <CircleX size={20} />
            </button>
            <button
              onClick={() => saveNested("meals", name, true)}
              className="p-2 text-emerald-300"
            >
              <CircleCheck size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const lastW = weightHistory.slice(-6);

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 pb-20">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Activity className="text-rose-500" size={28} /> Hábitos
      </h1>
      <LevelBar />
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col justify-between">
          <div className="flex justify-between mb-2">
            <h2 className="font-bold text-sm flex items-center gap-1">
              <Droplet className="text-blue-500" size={16} /> Agua
            </h2>
            <span className="text-[10px] font-bold">
              {todayRec.water || 0}/8
            </span>
          </div>
          <div className="flex flex-wrap gap-1 justify-between">
            {[...Array(8)].map((_, i) => (
              <button
                key={i}
                onClick={() =>
                  saveField("water", todayRec.water === i + 1 ? i : i + 1)
                }
                className={`p-1.5 rounded-full ${
                  todayRec.water > i
                    ? "bg-blue-100 text-blue-500"
                    : "bg-slate-50"
                }`}
              >
                <Droplet
                  size={14}
                  fill={todayRec.water > i ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="font-bold text-sm flex items-center gap-1 mb-2">
            <Moon className="text-indigo-500" size={16} /> Descanso
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              onBlur={() => saveNested("sleep", "hours", sleepHours)}
              className="w-16 bg-slate-50 border rounded text-xs p-1 text-center font-bold outline-none"
            />
            <span className="text-[10px] font-bold">hs</span>
          </div>
          <div className="flex gap-1 justify-between">
            <button
              onClick={() => saveNested("sleep", "quality", "bad")}
              className={`flex-1 py-1 text-[10px] rounded border ${
                todayRec.sleep?.quality === "bad"
                  ? "bg-rose-500 text-white"
                  : "bg-slate-50"
              }`}
            >
              Mal
            </button>
            <button
              onClick={() => saveNested("sleep", "quality", "good")}
              className={`flex-1 py-1 text-[10px] rounded border ${
                todayRec.sleep?.quality === "good"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-50"
              }`}
            >
              Bien
            </button>
          </div>
        </Card>
      </div>

      {!editMealPlan && (
        <div className="bg-slate-800 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <Zap
            size={100}
            className="absolute -right-4 -bottom-4 text-slate-700 opacity-30"
          />
          <h2 className="text-xs font-bold uppercase text-slate-400 mb-4 relative z-10">
            Balance
          </h2>
          <div className="flex justify-between items-end mb-6 relative z-10">
            <div>
              <p className="text-3xl font-black">
                {totalKcalIn}{" "}
                <span className="text-sm font-medium text-slate-400">
                  kcal in
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-orange-400">
                -{totalKcalOut}{" "}
                <span className="text-xs font-medium text-slate-400">out</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 relative z-10">
            <div className="bg-slate-700 p-2 rounded-xl text-center">
              <p className="text-[10px] text-slate-400 uppercase">Prot</p>
              <p className="font-black text-blue-400 text-lg">
                {totalProtein}g
              </p>
            </div>
            <div className="bg-slate-700 p-2 rounded-xl text-center">
              <p className="text-[10px] text-slate-400 uppercase">Carb</p>
              <p className="font-black text-amber-400 text-lg">{totalCarbs}g</p>
            </div>
            <div className="bg-slate-700 p-2 rounded-xl text-center">
              <p className="text-[10px] text-slate-400 uppercase">Grasa</p>
              <p className="font-black text-rose-400 text-lg">{totalFat}g</p>
            </div>
          </div>
        </div>
      )}

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold flex items-center gap-2">
            <Utensils className="text-emerald-500" /> Dieta
          </h2>
          <button
            onClick={() => setEditMealPlan(!editMealPlan)}
            className="text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-1.5 rounded-full"
          >
            {editMealPlan ? "Cancelar" : "Editar"}
          </button>
        </div>
        {editMealPlan ? (
          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl mb-6">
            <MealEditorRow meal="desayuno" mealNameStr="Desayuno" />
            <MealEditorRow meal="almuerzo" mealNameStr="Almuerzo" />
            <MealEditorRow meal="merienda" mealNameStr="Merienda" />
            <MealEditorRow meal="cena" mealNameStr="Cena" />
            <button
              onClick={handleSaveMealPlan}
              className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-md"
            >
              Guardar
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <MealRow name="desayuno" label="Desayuno" />
            <MealRow name="almuerzo" label="Almuerzo" />
            <MealRow name="merienda" label="Merienda" />
            <MealRow name="cena" label="Cena" />
          </div>
        )}
        <HabitToggle
          label="Hoy no tomé alcohol"
          icon={<WineOff size={22} />}
          status={todayRec.noAlcohol}
          field="noAlcohol"
          racha={alcoholStreak}
        />
      </Card>

      <Card>
        <h2 className="font-bold mb-4 flex items-center gap-2">
          <Target className="text-orange-500" /> Entrenamiento
        </h2>
        {!todayRec.training ? (
          <form onSubmit={handleSaveTraining} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <select
                value={trainingType}
                onChange={(e) => setTrainingType(e.target.value)}
                className="bg-slate-50 border rounded-xl px-3 py-3 font-bold outline-none"
              >
                <option value="Fuerza">Fuerza</option>
                <option value="Cardio">Cardio</option>
              </select>
              <input
                type="number"
                value={trainingKcal}
                onChange={(e) => setTrainingKcal(e.target.value)}
                placeholder="Kcal"
                className="bg-slate-50 border rounded-xl px-3 py-3 font-bold outline-none"
              />
            </div>
            <input
              type="text"
              value={trainingDetail}
              onChange={(e) => setTrainingDetail(e.target.value)}
              placeholder="Detalle..."
              className="bg-slate-50 border rounded-xl px-4 py-3 font-medium w-full outline-none"
            />
            <input
              type="number"
              value={dailySteps}
              onChange={(e) => setDailySteps(e.target.value)}
              placeholder="Pasos"
              className="bg-slate-50 border rounded-xl px-4 py-3 font-bold w-full outline-none"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold rounded-xl py-3 shadow-md"
            >
              Guardar
            </button>
          </form>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-orange-800 font-black">{todayRec.training}</p>
            </div>
            <CircleCheck className="text-orange-500" size={36} />
          </div>
        )}
      </Card>

      <Card>
        <h2 className="font-bold mb-4 flex items-center gap-2">
          <Scale className="text-blue-500" /> Mediciones
        </h2>
        <form onSubmit={handleSaveMeasurements} className="flex gap-2 mb-6">
          <input
            type="number"
            step="0.1"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Peso kg"
            className="flex-1 bg-slate-50 border rounded-xl py-3 px-3 font-bold outline-none"
          />
          <input
            type="number"
            step="0.1"
            value={newWaist}
            onChange={(e) => setNewWaist(e.target.value)}
            placeholder="Cintura cm"
            className="flex-1 bg-slate-50 border rounded-xl py-3 px-3 font-bold outline-none"
          />
          <button
            type="submit"
            className="bg-slate-800 text-white px-4 rounded-xl font-bold"
          >
            <Plus size={20} />
          </button>
        </form>
        {lastW.length > 0 && (
          <div className="text-center font-bold text-sm">
            Último Peso: {lastW[lastW.length - 1].weight}kg
          </div>
        )}
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
            <Camera className="text-indigo-500" /> Progreso Visual
          </h2>
        </div>
        <div className="flex gap-2 mb-6">
          <label className="flex-1 bg-indigo-50 text-indigo-600 font-bold py-3 rounded-xl text-center cursor-pointer flex flex-col items-center">
            <Camera size={20} />
            <span className="text-xs">Frente</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePhotoUpload(e, "Frente")}
            />
          </label>
          <label className="flex-1 bg-indigo-50 text-indigo-600 font-bold py-3 rounded-xl text-center cursor-pointer flex flex-col items-center">
            <Camera size={20} />
            <span className="text-xs">Lateral</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePhotoUpload(e, "Lateral")}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {photos.map((p) => (
            <div
              key={p.id}
              className="relative rounded-xl overflow-hidden aspect-[3/4] bg-slate-100"
            >
              <img src={p.image} className="w-full h-full object-cover" />
              <button
                onClick={() => deletePhoto(p.id)}
                className="absolute top-2 right-2 bg-rose-500 p-2 rounded-full text-white"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [finances, setFinances] = useState(initialFinances);
  const [academic, setAcademic] = useState(initialAcademic);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [tasks, setTasks] = useState(initialTasks);
  const [healthRecords, setHealthRecords] = useState(initialHealth.records);
  const [weightHistory, setWeightHistory] = useState([]);
  const [mealPlan, setMealPlan] = useState(initialMealPlan);
  const [photos, setPhotos] = useState([]);
  const [clothingBundles, setClothingBundles] = useState([]);
  const [toast, setToast] = useState(null);
  const [tempMealPlan, setTempMealPlan] = useState(initialMealPlan.lunes);

  const showToast = (message) => {
    setToast(
      message ||
        MOTIVATIONAL_PHRASES[
          Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)
        ]
    );
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== "undefined" && __initial_auth_token)
          await signInWithCustomToken(auth, __initial_auth_token);
        else await signInAnonymously(auth);
      } catch (e) {
        let localUid = localStorage.getItem("mi_mega_app_uid");
        if (!localUid) {
          localUid = "local_" + Date.now();
          localStorage.setItem("mi_mega_app_uid", localUid);
        }
        setUser({ uid: localUid });
        setLoading(false);
      }
    };
    initAuth();
    return onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!user || !db) return;
    const unsubs = [];
    unsubs.push(
      onSnapshot(
        collection(db, "artifacts", appId, "users", user.uid, "finances"),
        (snap) =>
          setFinances({
            transactions: snap.docs
              .map((d) => ({ id: d.id, ...d.data() }))
              .sort((a, b) => b.timestamp - a.timestamp),
          })
      )
    );
    unsubs.push(
      onSnapshot(
        collection(
          db,
          "artifacts",
          appId,
          "users",
          user.uid,
          "clothing_bundles"
        ),
        (snap) =>
          setClothingBundles(
            snap.docs
              .map((d) => ({ id: d.id, ...d.data() }))
              .sort((a, b) => b.timestamp - a.timestamp)
          )
      )
    );
    unsubs.push(
      onSnapshot(
        doc(db, "artifacts", appId, "users", user.uid, "settings", "academic"),
        (snap) => {
          if (snap.exists()) setAcademic(snap.data());
          else
            setDoc(
              doc(
                db,
                "artifacts",
                appId,
                "users",
                user.uid,
                "settings",
                "academic"
              ),
              initialAcademic
            );
        }
      )
    );
    unsubs.push(
      onSnapshot(
        collection(db, "artifacts", appId, "users", user.uid, "subjects"),
        (snap) =>
          setSubjects(
            snap.docs
              .map((d) => ({ id: d.id, ...d.data() }))
              .sort((a, b) => b.timestamp - a.timestamp)
          )
      )
    );
    unsubs.push(
      onSnapshot(
        collection(db, "artifacts", appId, "users", user.uid, "assignments"),
        (snap) =>
          setAssignments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      )
    );
    unsubs.push(
      onSnapshot(
        collection(db, "artifacts", appId, "users", user.uid, "tasks"),
        (snap) =>
          setTasks(
            snap.docs
              .map((d) => ({ id: d.id, ...d.data() }))
              .sort((a, b) => b.timestamp - a.timestamp)
          )
      )
    );
    unsubs.push(
      onSnapshot(
        collection(db, "artifacts", appId, "users", user.uid, "health"),
        (snap) => {
          const r = {};
          snap.docs.forEach((d) => {
            r[d.id] = d.data();
          });
          setHealthRecords(r);
        }
      )
    );
    unsubs.push(
      onSnapshot(
        collection(db, "artifacts", appId, "users", user.uid, "weight"),
        (snap) =>
          setWeightHistory(
            snap.docs
              .map((d) => ({ id: d.id, ...d.data() }))
              .sort((a, b) => a.timestamp - b.timestamp)
          )
      )
    );
    unsubs.push(
      onSnapshot(
        collection(db, "artifacts", appId, "users", user.uid, "photos"),
        (snap) =>
          setPhotos(
            snap.docs
              .map((d) => ({ id: d.id, ...d.data() }))
              .sort((a, b) => b.timestamp - a.timestamp)
          )
      )
    );
    unsubs.push(
      onSnapshot(
        doc(db, "artifacts", appId, "users", user.uid, "settings", "mealPlan"),
        (snap) => {
          if (snap.exists()) setMealPlan(snap.data());
        }
      )
    );
    return () => unsubs.forEach((u) => u());
  }, [user]);

  const todayStr = new Date().toISOString().split("T")[0];
  const balance = useMemo(
    () =>
      finances.transactions.reduce(
        (acc, curr) =>
          curr.type === "income" ? acc + curr.amount : acc - curr.amount,
        0
      ),
    [finances]
  );
  const academicProgress =
    Math.round((academic.passed / academic.total) * 100) || 0;

  const dailyTasksList = tasks.filter((t) => !t.type || t.type === "daily");
  const eventTasksList = tasks.filter((t) => t.type === "event");
  const pendingTasksCount = dailyTasksList.filter((t) => !t.completed).length;
  const tasksProgress =
    dailyTasksList.length === 0
      ? 0
      : Math.round(
          (dailyTasksList.filter((t) => t.completed).length /
            dailyTasksList.length) *
            100
        );
  const todayHealth = healthRecords[todayStr] || null;
  const trainedToday = todayHealth?.training ? true : false;

  const getStreak = (field) => {
    let s = 0;
    let d = new Date();
    if (healthRecords[todayStr]?.[field] === false) return 0;
    if (healthRecords[todayStr]?.[field] === true) s++;
    d.setDate(d.getDate() - 1);
    while (true) {
      const ds = d.toISOString().split("T")[0];
      if (healthRecords[ds]?.[field] === true) {
        s++;
        d.setDate(d.getDate() - 1);
      } else break;
    }
    return s;
  };
  const alcoholStreak = getStreak("noAlcohol");

  let totalXP = 0;
  Object.values(healthRecords).forEach((r) => {
    if (r.training) totalXP += 50;
    if (r.noAlcohol === true) totalXP += 20;
    if (r.water) totalXP += r.water * 5;
    if (r.sleep?.quality === "good") totalXP += 20;
    if (r.steps >= 10000) totalXP += 30;
    if (r.meals) {
      Object.values(r.meals).forEach((m) => {
        if (m === true) totalXP += 10;
        if (m === false) totalXP -= 10;
      });
    }
  });
  totalXP = Math.max(0, totalXP);
  const currentLevel = Math.floor(totalXP / 200) + 1;
  const xpInCurrentLevel = totalXP % 200;
  const levelProgress = Math.round((xpInCurrentLevel / 200) * 100);

  let goodMealsCount = 0,
    loggedMealsCount = 0,
    totalProtein = 0,
    totalCarbs = 0,
    totalFat = 0;
  const daysOfWeek = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];
  const todayName = daysOfWeek[new Date().getDay()];
  const todayPlan = mealPlan[todayName] || initialMealPlan.lunes;
  if (todayHealth?.meals) {
    ["desayuno", "almuerzo", "merienda", "cena"].forEach((m) => {
      if (todayHealth.meals[m] !== undefined) loggedMealsCount++;
      if (todayHealth.meals[m] === true) {
        goodMealsCount++;
        const pData = todayPlan[m];
        if (pData && typeof pData === "object") {
          totalProtein += Number(pData.protein) || 0;
          totalCarbs += Number(pData.carbs) || 0;
          totalFat += Number(pData.fat) || 0;
        }
      }
    });
  }
  const dailyMealScore =
    loggedMealsCount > 0 ? Math.round((goodMealsCount / 4) * 100) : 0;
  const totalKcalIn = Math.round(
    totalProtein * 4 + totalCarbs * 4 + totalFat * 9
  );
  const totalKcalOut = todayHealth?.trainingKcal || 0;

  const totalInvestedRopa = clothingBundles.reduce(
    (s, b) => s + (Number(b.totalCost) || 0),
    0
  );
  let totalRevenueRopa = 0,
    projectedRevenueRopa = 0,
    itemsSoldTotalRopa = 0,
    itemsCountTotalRopa = 0;
  clothingBundles.forEach((b) => {
    itemsCountTotalRopa += b.itemCount || 0;
    if (b.items) {
      b.items.forEach((i) => {
        const p = Number(i.sellPrice) || 0;
        if (i.isSold) {
          itemsSoldTotalRopa++;
          totalRevenueRopa += p;
        } else {
          projectedRevenueRopa += p;
        }
      });
    }
  });
  const netProfitRopa = totalRevenueRopa - totalInvestedRopa;

  const todayDateObj = new Date(todayStr + "T00:00:00");
  const upcomingEvents = [...eventTasksList]
    .filter(
      (t) => !t.completed && new Date(t.date + "T00:00:00") >= todayDateObj
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Flame size={48} className="text-emerald-500 animate-pulse mb-4" />
        <p className="text-slate-500 font-bold">Cargando...</p>
      </div>
    );

  const contextValue = {
    user,
    db,
    appId,
    todayStr,
    loading,
    activeTab,
    setActiveTab,
    finances,
    setFinances,
    academic,
    setAcademic,
    subjects,
    setSubjects,
    assignments,
    setAssignments,
    activeSubjectId,
    setActiveSubjectId,
    tasks,
    setTasks,
    healthRecords,
    setHealthRecords,
    weightHistory,
    setWeightHistory,
    mealPlan,
    setMealPlan,
    photos,
    setPhotos,
    clothingBundles,
    setClothingBundles,
    showToast,
    currentLevel,
    totalXP,
    xpInCurrentLevel,
    levelProgress,
    totalInvestedRopa,
    totalRevenueRopa,
    netProfitRopa,
    projectedRevenueRopa,
    itemsSoldTotalRopa,
    itemsCountTotalRopa,
    balance,
    pendingTasksCount,
    tasksProgress,
    trainedToday,
    alcoholStreak,
    dailyMealScore,
    totalKcalIn,
    totalKcalOut,
    todayPlan,
    nextEvent,
    academicProgress,
    dailyTasksList,
    eventTasksList,
    todayHealth,
    tempMealPlan,
    setTempMealPlan,
    todayName,
  };
  const navItems = [
    { id: "home", icon: Home, label: "Inicio", color: "text-slate-800" },
    {
      id: "finance",
      icon: DollarSign,
      label: "Finanzas",
      color: "text-emerald-500",
    },
    { id: "tasks", icon: SquareCheck, label: "Tareas", color: "text-blue-500" },
    { id: "health", icon: Activity, label: "Hábitos", color: "text-rose-500" },
  ];

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200">
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2">
              <Flame className="text-amber-400" size={18} />
              {toast}
            </div>
          </div>
        )}
        <main className="max-w-md mx-auto p-5 pt-8 min-h-screen">
          {activeTab === "home" && <HomeView />}
          {activeTab === "finance" && <FinanceView />}
          {activeTab === "academic" && <AcademicView />}
          {activeTab === "tasks" && <TasksView />}
          {activeTab === "health" && <HealthView />}
        </main>
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 pb-safe z-40">
          <div className="max-w-md mx-auto flex justify-around p-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center p-3 w-16 rounded-2xl transition-all ${
                  activeTab === item.id
                    ? `bg-slate-50 ${item.color} scale-110 shadow-sm`
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <item.icon
                  size={22}
                  strokeWidth={activeTab === item.id ? 2.5 : 2}
                />
                {activeTab === item.id && (
                  <span className="text-[10px] font-bold mt-1">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
            <button
              onClick={() => setActiveTab("academic")}
              className={`flex flex-col items-center justify-center p-3 w-16 rounded-2xl transition-all ${
                activeTab === "academic"
                  ? `bg-slate-50 text-indigo-500 scale-110 shadow-sm`
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <GraduationCap
                size={22}
                strokeWidth={activeTab === "academic" ? 2.5 : 2}
              />
              {activeTab === "academic" && (
                <span className="text-[10px] font-bold mt-1">Estudio</span>
              )}
            </button>
          </div>
        </nav>
      </div>
    </AppContext.Provider>
  );
}
