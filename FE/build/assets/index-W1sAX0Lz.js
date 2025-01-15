import {
  c as k,
  j as e,
  u as j,
  a as f,
  L as B,
  F as v,
  f as ge,
  b as he,
  d as fe,
  e as re,
  S as g,
  r as p,
  g as V,
  h as P,
  i as se,
  k as be,
  l as ye,
  m as je,
  n as Y,
  D as W,
  o as Ne,
  N as ve,
  R as we,
  p as F,
  q as ze,
  P as Ce,
  B as Se,
} from "./vendor-CE7fJfze.js";
import { l as Pe, a as Oe } from "./assets--bJciqgB.js";
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) a(o);
  new MutationObserver((o) => {
    for (const n of o)
      if (n.type === "childList")
        for (const c of n.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && a(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(o) {
    const n = {};
    return (
      o.integrity && (n.integrity = o.integrity),
      o.referrerPolicy && (n.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (n.credentials = "omit")
        : (n.credentials = "same-origin"),
      n
    );
  }
  function a(o) {
    if (o.ep) return;
    o.ep = !0;
    const n = s(o);
    fetch(o.href, n);
  }
})();
const Ie = {
    token: sessionStorage.getItem("token"),
    user: sessionStorage.getItem("user"),
    isAuthenticated: !!sessionStorage.getItem("token"),
    role: sessionStorage.getItem("role"),
    userId: sessionStorage.getItem("userID"),
  },
  ae = k({
    name: "auth",
    initialState: Ie,
    reducers: {
      setToken: (r, t) => {
        (r.token = t.payload.token),
          sessionStorage.setItem("token", t.payload.token);
      },
      setLogin: (r, t) => {
        (r.user = t.payload.username),
          sessionStorage.setItem("user", t.payload.username),
          (r.role = t.payload.role),
          sessionStorage.setItem("role", t.payload.role),
          (r.userId = t.payload.userID),
          sessionStorage.setItem("userID", t.payload.userID),
          (r.isAuthenticated = !0);
      },
      logout: (r) => {
        (r.token = sessionStorage.removeItem("token")),
          (r.user = sessionStorage.removeItem("user")),
          (r.role = sessionStorage.removeItem("role")),
          (r.userId = sessionStorage.removeItem("userID")),
          (r.isAuthenticated = !1);
      },
    },
  }),
  { setToken: Fe, setLogin: ke, logout: Ee } = ae.actions,
  Ae = ae.reducer,
  N = ({
    testo: r = "Clicca qui",
    onClick: t,
    colore: s = "",
    dimensione: a = "md",
    disabilitato: o = !1,
    classeAggiuntiva: n = "",
  }) => {
    const c = {
      sm: "py-1 px-3 text-sm",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-lg",
    };
    return e.jsx("button", {
      onClick: t,
      disabled: o,
      className: `${s} hover:opacity-90 text-white font-semibold rounded ${
        c[a]
      } ${o ? "opacity-50 cursor-not-allowed" : ""} ${n}`,
      children: r,
    });
  },
  S = () => {
    const r = j(),
      { user: t } = f((s) => s.auth);
    return e.jsxs("nav", {
      className:
        "flex items-center justify-between bg-white bg-opacity-60 h-32 px-6",
      children: [
        e.jsx("div", {
          className: "flex items-center  h-20 px-6",
          children: e.jsx(B, {
            to: "/",
            className: "ml-10 text-3xl",
            children: e.jsx(v, { icon: ge }),
          }),
        }),
        e.jsx("img", {
          src: Pe,
          alt: "Logo bullpadel",
          className: "h-28 w-auto",
        }),
        e.jsxs("div", {
          className: "flex items-center",
          children: [
            e.jsx("p", { className: "mx-2 font-bold", children: t }),
            e.jsx(N, {
              testo: "Logout",
              colore: "bg-tertiary",
              dimensione: "sm",
              classeAggiuntiva: "mx-2",
              onClick: () => r(Ee()),
            }),
          ],
        }),
      ],
    });
  },
  I = () =>
    e.jsx("footer", {
      className: " bg-gray-800 text-white py-12 mt-12 sticky top-[100vh]",
      children: e.jsxs("div", {
        className: " flex flex-col justify-around md:flex-row items-center ",
        children: [
          e.jsx("div", {
            className: "flex items-center mb-4 md:mb-0",
            children: e.jsxs("p", {
              className: " ml-10",
              children: [
                "Assistenza tecnica:",
                " ",
                e.jsx("a", {
                  href: "mailto:info@datapeak.it",
                  className: "text-blue-400",
                  children: "info@datapeak.it",
                }),
              ],
            }),
          }),
          e.jsxs("div", {
            className: "flex items-center space-x-10 mb-4 md:mb-0",
            children: [
              e.jsx("a", {
                href: "https://instagram.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-white hover:text-gray-400",
                children: e.jsx(v, { icon: he, size: "3x" }),
              }),
              e.jsx("img", {
                src: Oe,
                alt: "logo_datapeak",
                className: "size-16 bg-white",
              }),
              e.jsx("a", {
                href: "https://www.datapeak.it",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-white hover:text-gray-400",
                children: e.jsx(v, { icon: fe, size: "3x" }),
              }),
            ],
          }),
          e.jsx("div", {
            className: "flex items-center ",
            children: e.jsxs("p", {
              className: "",
              children: [
                "© ",
                new Date().getFullYear(),
                " DataPeak. Tutti i diritti riservati.",
              ],
            }),
          }),
        ],
      }),
    }),
  b = re.create({
    baseURL: "http://localhost:8080/controllers",
    headers: { "Content-Type": "application/json" },
  });
b.interceptors.response.use(
  (r) => r,
  (r) => {
    var t;
    if (r.response) {
      const s = r.response.status,
        a =
          ((t = r.response.data) == null ? void 0 : t.message) ||
          "Errore imprevisto";
      s === 401
        ? g
            .fire("Sessione Scaduta", "Effettua di nuovo il login.", "warning")
            .then(() => {
              window.location.href = "/login";
            })
        : s === 404
        ? g.fire("Errore 404", "Risorsa non trovata.", "error")
        : s === 500
        ? g.fire(
            "Errore 500",
            "Errore interno del server. Riprova più tardi.",
            "error"
          )
        : g.fire("Errore", a, "error");
    } else
      r.request
        ? g.fire(
            "Errore di Connessione",
            "Impossibile connettersi al server. Controlla la tua connessione.",
            "error"
          )
        : g.fire("Errore", r.message, "error");
    return Promise.reject(r);
  }
);
const De = (r, t) =>
    b.post("/carrello/scan.php", { barcode: r, operatore_id: t }),
  Re = (r) => b.delete("/carrello/removeOne.php", { data: { id: r } }),
  $e = (r) => b.delete("/carrello/removeAll.php", { data: { id: r } }),
  Le = (r) => b.delete("/carrello/resetCarrello.php", { data: { id: r } }),
  Te = (r, t) =>
    b.put("/carrello/aggiungiSconto.php", { id: r, scontoAggiunto: t }),
  Me = async ({ operatore_id: r, metodoPagamento: t, emailCliente: s }) => {
    try {
      return await b.post("/carrello/completaOrdine.php", {
        operatore_id: r,
        metodoPagamento: t,
        emailCliente: s,
      });
    } catch (a) {
      throw (
        (console.error(
          "Errore nella chiamata completaOrdine:",
          a.response || a
        ),
        a)
      );
    }
  },
  Ue = async () => b.post("/totale/chiusuraCassa.php"),
  qe = async () => b.get("/ordini/totaleGiornaliero.php");
function Be({ setChiusuraCassa: r }) {
  const [t, s] = p.useState(null),
    a = async () => {
      try {
        const n = await qe();
        console.log(n.data), s(n.data);
        return;
      } catch (n) {
        console.error("Errore durante la chiusura della cassa:", n);
      }
    };
  p.useEffect(() => {
    a();
  }, []);
  const o = async () => {
    try {
      (await Ue()).status === 200 &&
        (g.fire("Successo", "Cassa chiusa con successo!", "success"), r(!1));
    } catch (n) {
      console.error("Errore durante la chiusura della cassa:", n);
    }
  };
  return e.jsx("div", {
    className:
      "fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50",
    children: e.jsxs("div", {
      className: "bg-white p-8 rounded-lg shadow-lg w-full max-w-md",
      children: [
        e.jsx("div", {
          className: "mb-6 border-b pb-4",
          children: e.jsx("h2", {
            className: "text-2xl font-bold text-center",
            children: "Chiusura Cassa",
          }),
        }),
        e.jsx("div", {
          className: "mb-6",
          children: e.jsxs("p", {
            className: "text-lg text-center text-gray-800",
            children: [
              "Il totale incassato oggi è:",
              " ",
              e.jsx("span", {
                className: "font-bold",
                children: t !== null ? `€${t}` : e.jsx(v, { icon: V }),
              }),
            ],
          }),
        }),
        e.jsxs("div", {
          className: "flex justify-end space-x-4 border-t pt-4",
          children: [
            e.jsx("button", {
              className:
                "px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400",
              onClick: () => r(!1),
              children: "Annulla",
            }),
            e.jsx("button", {
              className:
                "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
              onClick: () => o(),
              children: "Chiudi cassa",
            }),
          ],
        }),
      ],
    }),
  });
}
const Ge = (r = 0) => b.get(`/prodotti/read.php?offset=${r}`),
  _e = () => b.get("/prodotti/categories.php"),
  Qe = (r) => b.post("/prodotti/create.php", r),
  Xe = (r = {}) => {
    const t = new URLSearchParams(r).toString();
    return b.get(`/prodotti/filter.php?${t}`);
  },
  He = (r) => b.put("/prodotti/update.php", r),
  Je = (r) => b.delete("/prodotti/delete.php", { data: { id: r } }),
  Ve = {
    search: "",
    prodotti: [],
    categoriaSelected: "NO FILTRI",
    pagina: 0,
    paginationVisibile: !0,
    prodottoDaModificare: null,
    status: "idle",
    error: null,
  },
  A = P(
    "prodotto/fetchProducts",
    async (r, { rejectWithValue: t, getState: s }) => {
      try {
        const a = await Ge(r);
        if (a.status === 200) return a.data.data;
      } catch (a) {
        return a.response && a.response.data
          ? t(a.response.data.error)
          : t("Errore durante l'aggiunta del prodotto");
      }
    }
  ),
  oe = k({
    name: "products",
    initialState: Ve,
    reducers: {
      setSearch: (r, t) => {
        r.search = t.payload;
      },
      setProdottiFiltrati: (r, t) => {
        r.prodotti = t.payload;
      },
      setCategoriaSelected: (r, t) => {
        r.categoriaSelected = t.payload;
      },
      setPagina: (r, t) => {
        r.pagina = t.payload;
      },
      setPaginationVisibile: (r, t) => {
        r.paginationVisibile = t.payload;
      },
      setStatus: (r, t) => {
        r.status = t.payload;
      },
      setProdottoDaModificare: (r, t) => {
        r.prodottoDaModificare = t.payload;
      },
      deleteProduct: (r, t) => {
        const s = t.payload;
        r.prodotti = r.prodotti.filter((a) => a.id !== s);
      },
    },
    extraReducers: (r) => {
      r.addCase(A.pending, (t) => {
        t.status = "loading";
      })
        .addCase(A.fulfilled, (t, s) => {
          (t.prodotti = s.payload), (t.status = "succeeded");
        })
        .addCase(A.rejected, (t, s) => {
          (t.status = "failed"), (t.error = s.error.message);
        });
    },
  }),
  {
    setSearch: Q,
    setProdottiFiltrati: Ye,
    setCategoriaSelected: X,
    setPagina: G,
    updateProduct: Yt,
    setPaginationVisibile: ee,
    setStatus: ne,
    setProdottoDaModificare: Ke,
    deleteProduct: Ze,
  } = oe.actions,
  We = oe.reducer,
  le = ({ isHomePage: r = !1 }) => {
    const t = se(),
      s = j(),
      { search: a, categoriaSelected: o, status: n } = f((u) => u.products),
      [c, m] = p.useState(!1),
      [i, x] = p.useState([]);
    p.useEffect(() => {
      n === "idle" && s(A());
    }, [s, n]);
    const d = async () => ["NO FILTRI", ...(await _e()).data];
    p.useEffect(() => {
      d().then((u) => {
        x(u);
      });
    }, []);
    const z = () => {
        t("/aggiungi-prodotto");
      },
      w = async () => {
        try {
          let u = {};
          /^\d+$/.test(a)
            ? (u.barcode = a)
            : o !== "NO FILTRI"
            ? (u.categoria = o)
            : (u.nome = a);
          const C = await Xe(u);
          s(Ye(C.data.data)), s(ee(!1)), r && t("/prodotti");
        } catch (u) {
          console.error(u);
        }
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsxs("button", {
          className:
            "mr-4 px-4 py-2 bg-primary text-white font-semibold rounded-full shadow hover:bg-[#152238]",
          onClick: z,
          children: [e.jsx(v, { icon: be }), " Prodotto"],
        }),
        e.jsxs("div", {
          className:
            "flex rounded-full bg-primary px-2 w-full max-w-[600px] my-5 relative",
          children: [
            e.jsx("button", {
              className:
                "text-white font-bold self-center flex p-1 cursor-pointer bg-primary rounded-full",
              onClick: () => m((u) => !u),
              children:
                o === "NO FILTRI"
                  ? e.jsx(v, { icon: ye, style: { color: "white" } })
                  : `${o.toString().toUpperCase()}`,
            }),
            e.jsx("input", {
              placeholder: "Inserisci Nome prodotto o Codice a barre ...",
              value: a,
              onChange: (u) => s(Q(u.target.value)),
              className: "w-full bg-primary flex pl-2 text-[#cccccc] outline-0",
            }),
            e.jsx("button", {
              type: "submit",
              className: "relative p-2 bg-primary rounded-full",
              onClick: () => w(),
              children: e.jsx(v, { icon: je, style: { color: "white" } }),
            }),
            (o !== "NO FILTRI" || a !== "") &&
              e.jsx("button", {
                className:
                  "ml-4 px-4 py-2 bg-primary text-white font-semibold rounded-full shadow hover:bg-[#152238]",
                onClick: () => {
                  s(Q("")), s(ne("idle")), s(X("NO FILTRI")), s(ee(!0));
                },
                children: "Reset",
              }),
            c &&
              e.jsx("div", {
                className:
                  "absolute top-12 left-0 bg-white w-full rounded shadow-lg z-10",
                children: e.jsx("ul", {
                  className:
                    "py-2 max-h-[280px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200",
                  children: i.map((u, C) =>
                    e.jsx(
                      "li",
                      {
                        className:
                          "px-4 py-2 bg-slate-200 hover:bg-gray-100 border-b border-black cursor-pointer",
                        onClick: () => {
                          m(!1), s(X(u));
                        },
                        children: u,
                      },
                      C
                    )
                  ),
                }),
              }),
          ],
        }),
      ],
    });
  };
function et() {
  const { role: r } = f((o) => o.auth),
    [t, s] = p.useState(!1),
    a = () => {
      s(!0);
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(S, {}),
      e.jsx("div", {
        className: "flex items-center justify-center mt-6",
        children: e.jsx(le, { isHomePage: !0 }),
      }),
      e.jsxs("div", {
        className: " flex flex-col items-center p-6",
        children: [
          e.jsxs("div", {
            className: "flex space-x-4 mb-10",
            children: [
              e.jsxs("a", {
                href: "/prodotti",
                className:
                  "w-48 h-64 bg-slate-300 rounded-lg shadow-md p-4 flex flex-col items-center opacity-90 transform transition-transform hover:scale-105",
                children: [
                  e.jsx("img", {
                    src: "https://media.istockphoto.com/id/1363976548/it/foto/racchetta-da-paddle-tennis-e-palline-sul-campo-da-paddle-blu.webp?a=1&b=1&s=612x612&w=0&k=20&c=b5e-FCTf74iliXIuQ-ztNOTiDcDXUhSCHXQcWLKDNOk=",
                    alt: "Prodotti",
                    className: "h-32 w-full object-cover rounded mb-4 ",
                  }),
                  e.jsx("h2", {
                    className: "text-xl font-bold text-primary",
                    children: "Prodotti",
                  }),
                ],
              }),
              e.jsxs("a", {
                href: "/cassa",
                className:
                  "w-48 h-64 bg-slate-300  rounded-lg shadow-md p-4 flex flex-col items-center opacity-90  transform transition-transform hover:scale-105",
                children: [
                  e.jsx("img", {
                    src: "https://media.istockphoto.com/id/1143208442/it/foto/bancomat-con-schermo-digitale-al-supermercato.webp?a=1&b=1&s=612x612&w=0&k=20&c=jU3plbvEelIVzPfRExsabuZrPlw2845mv3fyYX2IO8I=",
                    alt: "Cassa",
                    className: "h-32 w-full object-cover rounded mb-4",
                  }),
                  e.jsx("h2", {
                    className: "text-xl font-bold text-primary",
                    children: "Cassa",
                  }),
                ],
              }),
              e.jsxs("a", {
                href: "/storico-ordini",
                className:
                  "w-48 h-64 bg-slate-300  rounded-lg shadow-md p-4 flex flex-col items-center opacity-90  transform transition-transform hover:scale-105",
                children: [
                  e.jsx("img", {
                    src: "https://media.istockphoto.com/id/184616145/it/foto/larchivio.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ayh0CfXX9Q28eZoR43L52GCqGXoxgKxx95rYDckXjVE=",
                    alt: "Storico Ordini",
                    className: "h-32 w-full object-cover rounded mb-4",
                  }),
                  e.jsx("h2", {
                    className: "text-xl font-bold text-primary",
                    children: "Storico Ordini",
                  }),
                ],
              }),
              r === "admin" &&
                e.jsxs("a", {
                  href: "/admin",
                  className:
                    "w-48 h-64 bg-slate-300  rounded-lg shadow-md p-4 flex flex-col items-center opacity-90  transform transition-transform hover:scale-105",
                  children: [
                    e.jsx("img", {
                      src: "https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGFzaGJvYXJkfGVufDB8fDB8fHww",
                      alt: "Admin",
                      className: "h-32 w-full object-cover rounded mb-4",
                    }),
                    e.jsx("h2", {
                      className: "text-xl font-bold text-primary",
                      children: "Admin",
                    }),
                  ],
                }),
            ],
          }),
          e.jsxs("div", {
            className:
              "w-full max-w-2xl bg-slate-300  rounded-lg shadow-md p-6 flex flex-col items-center opacity-90  transform transition-transform hover:scale-105",
            children: [
              e.jsx("h2", {
                className: "text-2xl font-bold text-primary mb-4",
                children: "Chiusura Cassa",
              }),
              e.jsx("p", {
                className: "font-bold text-red-500 text-center mb-5",
                children: "Genera report delle vendite giornaliere",
              }),
              e.jsx(N, { testo: "Procedi", colore: "bg-primary", onClick: a }),
            ],
          }),
        ],
      }),
      t && e.jsx(Be, { setChiusuraCassa: s }),
      e.jsx(I, {}),
    ],
  });
}
const tt = {
    formData: {
      nome: "",
      prezzoOriginale: "",
      scontoProdotto: "",
      barcode: "",
      giacenza: "",
      colore: "",
      categoria: "",
      taglia: "",
    },
    loading: !1,
    error: null,
    success: !1,
  },
  $ = P("prodotto/aggiungiProdotto", async (r, { rejectWithValue: t }) => {
    try {
      const s = { ...r, scontoProdotto: r.scontoProdotto / 100 };
      return (await Qe(s)).data;
    } catch (s) {
      return s.response && s.response.data
        ? (g.fire("Errore", s.response.data.message, "error"),
          t(s.response.data.error))
        : t("Errore durante l'aggiunta del prodotto");
    }
  }),
  K = k({
    name: "prodotto",
    initialState: tt,
    reducers: {
      updateFormData: (r, t) => {
        const { name: s, value: a } = t.payload;
        r.formData[s] = a;
      },
      resetForm: (r) => {
        (r.formData = {
          nome: "",
          prezzoOriginale: "",
          scontoProdotto: "",
          barcode: "",
          giacenza: "",
          colore: "",
          categoria: "",
          taglia: "",
        }),
          (r.success = !1);
      },
    },
    extraReducers: (r) => {
      r.addCase($.pending, (t) => {
        (t.loading = !0), (t.error = null), (t.success = !1);
      })
        .addCase($.fulfilled, (t) => {
          (t.loading = !1),
            (t.success = !0),
            g.fire("Prodotto aggiunto con successo"),
            K.caseReducers.resetForm(t);
        })
        .addCase($.rejected, (t, s) => {
          (t.loading = !1), (t.error = s.payload);
        });
    },
  }),
  { updateFormData: rt, resetForm: Kt } = K.actions,
  st = K.reducer;
function at() {
  const r = j(),
    { formData: t, loading: s } = f((i) => i.addProducts),
    [a, o] = p.useState({}),
    n = (i) => {
      const { name: x, value: d } = i.target;
      r(rt({ name: x, value: d }));
    },
    c = () => {
      const i = {};
      return (
        t.nome.trim() || (i.nome = "Il nome del prodotto è obbligatorio."),
        t.barcode.trim() || (i.barcode = "Il codice a barre è obbligatorio."),
        t.prezzoOriginale <= 0 &&
          (i.prezzoOriginale = "Il prezzo deve essere maggiore di 0."),
        (t.scontoProdotto < 0 || t.scontoProdotto > 100) &&
          (i.scontoProdotto = "Lo sconto deve essere tra 0 e 100%."),
        t.giacenza < 0
          ? (i.giacenza = "La giacenza non può essere negativa.")
          : t.giacenza || (i.giacenza = "La giacenza è obbligatoria"),
        i
      );
    },
    m = (i) => {
      i.preventDefault();
      const x = c();
      if (Object.keys(x).length > 0) {
        o(x);
        return;
      }
      r($(t)), o({});
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsx(S, {}),
      e.jsxs("form", {
        onSubmit: m,
        className:
          "relative max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-4",
        children: [
          e.jsx(B, {
            to: "/prodotti",
            className:
              "absolute top-4 left-4 text-gray-600 hover:text-gray-800",
            children: e.jsx(v, { icon: Y }),
          }),
          e.jsx("h2", {
            className: "text-2xl font-semibold mb-2 ml-10 text-gray-800",
            children: "Aggiungi un nuovo prodotto",
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "nome",
                children: "Nome Prodotto",
              }),
              e.jsx("input", {
                type: "text",
                name: "nome",
                value: t.nome,
                onChange: n,
                className: `w-full p-2 border ${
                  a.nome ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
                placeholder: "Inserisci il nome del prodotto",
              }),
              a.nome &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: a.nome,
                }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "prezzoOriginale",
                children: "Prezzo",
              }),
              e.jsx("input", {
                type: "number",
                name: "prezzoOriginale",
                value: t.prezzoOriginale,
                onChange: n,
                className: `w-full p-2 border ${
                  a.prezzoOriginale ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
                placeholder: "Inserisci il prezzo",
              }),
              a.prezzoOriginale &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: a.prezzoOriginale,
                }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "scontoProdotto",
                children: "Sconto (%)",
              }),
              e.jsx("input", {
                type: "number",
                name: "scontoProdotto",
                value: t.scontoProdotto,
                onChange: n,
                className: `w-full p-2 border ${
                  a.scontoProdotto ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
                placeholder: "Inserisci lo sconto",
              }),
              a.scontoProdotto &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: a.scontoProdotto,
                }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "barcode",
                children: "Codice a Barre",
              }),
              e.jsx("input", {
                type: "text",
                name: "barcode",
                value: t.barcode,
                onChange: n,
                className: `w-full p-2 border ${
                  a.barcode ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
                placeholder: "Inserisci il codice a barre",
              }),
              a.barcode &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: a.barcode,
                }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "giacenza",
                children: "Quantità",
              }),
              e.jsx("input", {
                type: "number",
                name: "giacenza",
                value: t.giacenza,
                onChange: n,
                className: `w-full p-2 border ${
                  a.giacenza ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
                placeholder: "Inserisci la quantità",
              }),
              a.giacenza &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: a.giacenza,
                }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "colore",
                children: "Colore",
              }),
              e.jsx("input", {
                type: "text",
                name: "colore",
                value: t.colore,
                onChange: n,
                className:
                  "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Inserisci il colore del prodotto",
              }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "categoria",
                children: "Categoria",
              }),
              e.jsx("input", {
                type: "text",
                name: "categoria",
                value: t.categoria,
                onChange: n,
                className:
                  "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Inserisci la categoria del prodotto",
              }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "taglia",
                children: "Taglia Prodotto",
              }),
              e.jsx("input", {
                type: "text",
                name: "taglia",
                value: t.taglia,
                onChange: n,
                className:
                  "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Inserisci la taglia del prodotto",
              }),
            ],
          }),
          e.jsx("button", {
            type: "submit",
            className: `w-full text-white font-semibold py-2 px-4 rounded ${
              s
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`,
            disabled: s,
            children: s ? "Salvataggio in corso..." : "Aggiungi Prodotto",
          }),
        ],
      }),
      e.jsx(I, {}),
    ],
  });
}
const ot = ({ setModificaModal: r }) => {
    const t = j(),
      s = f((h) => h.products.prodottoDaModificare),
      [a, o] = p.useState(s.prezzoOriginale),
      n = s.prezzoOutlet,
      [c, m] = p.useState(s.scontoProdotto * 100),
      [i, x] = p.useState(s.giacenza),
      [d, z] = p.useState({}),
      w = () => {
        const h = {};
        return (
          (a <= 0 || a === null || a === "") &&
            (h.prezzoOriginale =
              "Il prezzo originale deve essere maggiore di 0."),
          (c < 0 || c > 100 || c === null || c === "") &&
            (h.sconto = "Lo sconto deve essere compreso tra 0 e 100."),
          (i <= 0 || i === null || i === "") &&
            (h.giacenza = "La giacenza deve essere maggiore di 0."),
          h
        );
      },
      u = async (h) => {
        const l = w();
        if (Object.keys(l).length > 0) {
          z(l);
          return;
        }
        const y = {
          nome: h.nome,
          id: h.id,
          prezzoOriginale: parseFloat(a),
          scontoProdotto: parseFloat(c) / 100,
          giacenza: parseInt(i, 10),
        };
        try {
          const O = await He(y);
          O.status === 200
            ? g.fire("Prodotto aggiornato con successo!")
            : console.error(
                "Errore durante l'aggiornamento del prodotto:",
                O.data.error
              );
        } catch (O) {
          console.error("Errore durante l'aggiornamento del prodotto:", O);
        }
        r(!1);
      },
      C = async (h) => {
        try {
          const l = await Je(h);
          console.log(l.data),
            l.status === 200 &&
              (g.fire("Prodotto eliminato con successo!"), t(Ze(h)), r(!1));
        } catch (l) {
          console.error("Errore durante la rimozione del prodotto:", l);
        }
      },
      R = () => {
        r(!1);
      };
    return e.jsx("div", {
      className:
        "fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50",
      children: e.jsxs("div", {
        className: "bg-white rounded-lg shadow-lg max-w-lg w-full",
        children: [
          e.jsx("div", {
            className: "p-4 border-b flex justify-between items-center",
            children: e.jsxs("h2", {
              className: "text-lg font-bold",
              children: ["Modifica Prodotto: ", s.nome],
            }),
          }),
          e.jsxs("div", {
            className: "p-6 space-y-4",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  e.jsx("label", {
                    htmlFor: "prezzoOriginale",
                    className: "font-medium w-1/3",
                    children: "Prezzo Originale:",
                  }),
                  e.jsx("input", {
                    type: "number",
                    id: "prezzoOriginale",
                    value: a,
                    onChange: (h) => o(h.target.value),
                    className: `border rounded px-2 py-1 flex-1 mx-2 ${
                      d.prezzoOriginale ? "border-red-500" : "border-gray-300"
                    }`,
                  }),
                ],
              }),
              d.prezzoOriginale &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: d.prezzoOriginale,
                }),
              e.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  e.jsx("label", {
                    htmlFor: "prezzoOutlet",
                    className: "font-medium w-1/3",
                    children: "Prezzo Outlet:",
                  }),
                  e.jsx("input", {
                    type: "number",
                    id: "prezzoOutlet",
                    value: n,
                    readOnly: !0,
                    className: "border rounded px-2 py-1 flex-1 mx-2",
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  e.jsx("label", {
                    htmlFor: "sconto",
                    className: "font-medium w-1/3",
                    children: "Sconto (%):",
                  }),
                  e.jsx("input", {
                    type: "number",
                    id: "sconto",
                    value: c,
                    onChange: (h) => m(h.target.value),
                    className: `border rounded px-2 py-1 flex-1 mx-2 ${
                      d.sconto ? "border-red-500" : "border-gray-300"
                    }`,
                  }),
                ],
              }),
              d.sconto &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: d.sconto,
                }),
              e.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  e.jsx("label", {
                    htmlFor: "giacenza",
                    className: "font-medium w-1/3",
                    children: "Giacenza:",
                  }),
                  e.jsx("input", {
                    type: "number",
                    id: "giacenza",
                    value: i,
                    onChange: (h) => x(h.target.value),
                    className: `border rounded px-2 py-1 flex-1 mx-2 ${
                      d.giacenza ? "border-red-500" : "border-gray-300"
                    }`,
                  }),
                ],
              }),
              d.giacenza &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: d.giacenza,
                }),
            ],
          }),
          e.jsxs("div", {
            className: "p-4 border-t flex justify-between items-center",
            children: [
              e.jsx(N, {
                testo: "Elimina",
                colore: "bg-tertiary",
                onClick: () => C(s.id),
              }),
              e.jsxs("div", {
                className: "flex",
                children: [
                  e.jsx(N, {
                    testo: "Salva",
                    colore: "bg-primary",
                    classeAggiuntiva: "mx-3",
                    onClick: () => u(s),
                  }),
                  e.jsx(N, {
                    testo: "Chiudi",
                    colore: "bg-gray-400",
                    onClick: R,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  nt = () => {
    const r = j(),
      { pagina: t, prodotti: s, paginationVisibile: a } = f((c) => c.products);
    if (!a) return null;
    const o = () => {
        const c = t + 30;
        r(G(c)), r(A(c));
      },
      n = () => {
        const c = t - 30;
        r(G(c)), r(A(c));
      };
    return e.jsx(e.Fragment, {
      children: e.jsx("div", {
        className: "flex flex-col items-center my-3",
        children: e.jsxs("div", {
          className: "flex items-center justify-between",
          children: [
            t > 120 &&
              e.jsx("button", {
                className: `text-white font-bold bg-[#0d1829] px-4 py-2 mr-2 border border-gray-400 rounded 
              ${t === 0 ? "opacity-50 cursor-not-allowed disabled" : ""}`,
                disabled: t === 0,
                onClick: () => {
                  r(Q("")), r(ne("idle")), r(X("NO FILTRI")), r(G(0));
                },
                children: "<<",
              }),
            e.jsx("button", {
              className: `text-white font-bold bg-[#0d1829] px-4 py-2 border border-gray-400 rounded 
            ${t === 0 ? "opacity-50 cursor-not-allowed disabled" : ""}`,
              disabled: t === 0,
              onClick: () => n(),
              children: "<",
            }),
            e.jsxs("p", {
              className: "text-gray-700 text-center m-4",
              children: [
                e.jsx("span", {
                  className: "font-bold",
                  children: "Prodotti visualizzati: ",
                }),
                s ? t : "non ci sono prodotti da visualizzare",
              ],
            }),
            e.jsx("button", {
              className:
                "text-white font-bold bg-[#0d1829] px-4 py-2 border border-gray-400 rounded ",
              onClick: () => o(),
              children: ">",
            }),
          ],
        }),
      }),
    });
  },
  lt = () => {
    const r = j(),
      { prodotti: t } = f((n) => n.products),
      [s, a] = p.useState(!1),
      o = (n) => {
        a(!0), r(Ke(n));
      };
    return e.jsxs(e.Fragment, {
      children: [
        e.jsx(nt, {}),
        e.jsx("section", {
          className:
            "relative max-w-7xl mt-5 mx-auto p-6 bg-white rounded-lg shadow-md ",
          children: e.jsxs("table", {
            className: "min-w-full bg-white border border-gray-200 opacity-90",
            children: [
              e.jsx("thead", {
                children: e.jsxs("tr", {
                  children: [
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "id",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Nome Prodotto",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Originale(€)",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Outlet (€)",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Sconto (%)",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Prezzo Scontato",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Codice a barre",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Quantità",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Colore",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Categoria",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Taglia",
                    }),
                    e.jsx("th", {
                      className:
                        "p-2 border-b font-semibold text-gray-600 text-left underline",
                      children: "Modifica",
                    }),
                  ],
                }),
              }),
              e.jsx("tbody", {
                children:
                  t &&
                  t.map((n) =>
                    e.jsxs(
                      "tr",
                      {
                        className: `${
                          n.id % 2 === 0 ? "bg-gray-200" : "bg-white"
                        }`,
                        children: [
                          e.jsx("td", {
                            className: "p-2 border-b text-gray-700 ",
                            children: n.id,
                          }),
                          e.jsx("td", {
                            className: "p-2 border-b text-gray-700 ",
                            children: n.nome,
                          }),
                          e.jsxs("td", {
                            className: "p-2 border-b text-gray-700",
                            children: ["€", n.prezzoOriginale],
                          }),
                          e.jsxs("td", {
                            className: "p-2 border-b text-gray-700",
                            children: ["€", Math.floor(n.prezzoOutlet)],
                          }),
                          e.jsxs("td", {
                            className: "p-2 border-b text-gray-700",
                            children: [n.scontoProdotto * 100, "%"],
                          }),
                          e.jsxs("td", {
                            className: "p-2 border-b text-gray-700",
                            children: [
                              "€",
                              n.scontoProdotto === 0
                                ? n.prezzoOutlet
                                : (
                                    n.prezzoOutlet *
                                    (1 - n.scontoProdotto)
                                  ).toFixed(2),
                            ],
                          }),
                          e.jsx("td", {
                            className: "p-2 border-b text-gray-700",
                            children: n.barcode,
                          }),
                          e.jsx("td", {
                            className: "p-2 border-b text-gray-700",
                            children: n.giacenza,
                          }),
                          e.jsx("td", {
                            className: "p-2 border-b text-gray-700",
                            children: n.colore,
                          }),
                          e.jsx("td", {
                            className: "p-2 border-b text-gray-700",
                            children: n.categoria,
                          }),
                          e.jsx("td", {
                            className: "p-2 border-b text-gray-700",
                            children: n.taglia ? n.taglia : "//",
                          }),
                          e.jsx("td", {
                            className: "p-2 border-b text-gray-700",
                            children: e.jsx(N, {
                              testo: "Modifica",
                              colore: "bg-secondary",
                              dimensione: "sm",
                              onClick: () => o(n),
                            }),
                          }),
                        ],
                      },
                      n.id
                    )
                  ),
              }),
            ],
          }),
        }),
        s && e.jsx(ot, { setModificaModal: a }),
      ],
    });
  },
  it = () => {
    const { status: r, error: t } = f((s) => s.products);
    return r === "loading"
      ? e.jsxs(e.Fragment, {
          children: [
            e.jsx(S, {}),
            e.jsx("div", {
              className: "flex items-center justify-center h-screen",
              children: e.jsx(v, { icon: V, spin: !0, size: "3x" }),
            }),
            e.jsx(I, {}),
          ],
        })
      : r === "failed"
      ? e.jsxs(e.Fragment, {
          children: [
            e.jsx(S, {}),
            e.jsxs("div", {
              className: "flex items-center justify-center min-h-44 text-xl",
              children: ["Errore durante il caricamento dei prodotti: ", t],
            }),
            e.jsx(I, {}),
          ],
        })
      : e.jsxs(e.Fragment, {
          children: [
            e.jsx(S, {}),
            e.jsxs("main", {
              children: [
                e.jsx("h1", {
                  className: "text-center text-3xl font-bold mt-4",
                  children: "Prodotti Disponibili",
                }),
                e.jsx("section", {
                  className: "flex items-center justify-center",
                  children: e.jsx(le, { isHomePage: !1 }),
                }),
                e.jsx(lt, {}),
              ],
            }),
            e.jsx(I, {}),
          ],
        });
  },
  ct = { showModal: !1, metodoPagamento: "cdc", emailCliente: "" },
  ie = k({
    name: "payment",
    initialState: ct,
    reducers: {
      setPaymentModal: (r, t) => {
        r.showModal = t.payload;
      },
      setMetodoPagamento: (r, t) => {
        r.metodoPagamento = t.payload;
      },
      setEmailCliente: (r, t) => {
        r.emailCliente = t.payload;
      },
    },
  }),
  {
    setPaymentModal: H,
    setMetodoPagamento: te,
    setEmailCliente: dt,
  } = ie.actions,
  ut = ie.reducer,
  mt = {
    barcode: "",
    carrello: JSON.parse(sessionStorage.getItem("carrello")) || [],
    status: "idle",
    error: null,
  },
  L = P(
    "cart/scanProdotto",
    async ({ barcode: r, userId: t }, { rejectWithValue: s }) => {
      try {
        return (await De(r, t)).data.articolo;
      } catch (a) {
        return (
          console.error(
            "Errore durante l'aggiunta al carrello:",
            a.response.data.message
          ),
          a.response && a.response.data
            ? (g.fire("Errore", a.response.data.message, "error"),
              s(a.response.data.message))
            : s("Errore generico durante l'aggiunta al carrello")
        );
      }
    }
  ),
  ce = k({
    name: "cart",
    initialState: mt,
    reducers: {
      setBarcode: (r, t) => {
        r.barcode = t.payload;
      },
      removeQuantity: (r, t) => {
        const s = r.carrello.find((a) => a.id === t.payload);
        s &&
          (s.quantita > 1
            ? (r.carrello = r.carrello.map((a) =>
                a.id === t.payload
                  ? {
                      ...a,
                      quantita: a.quantita - 1,
                      totaleArticolo: parseFloat(
                        (a.quantita - 1) * a.prezzoScontato
                      ).toFixed(2),
                      ivaTotale: parseFloat(
                        a.ivaUnitaria * (a.quantita - 1)
                      ).toFixed(2),
                    }
                  : a
              ))
            : s.quantita === 1 &&
              (r.carrello = r.carrello.filter((a) => a.id !== t.payload)),
          sessionStorage.setItem("carrello", JSON.stringify(r.carrello)));
      },
      removeItem: (r, t) => {
        (r.carrello = r.carrello.filter((s) => s.id !== t.payload)),
          sessionStorage.setItem("carrello", JSON.stringify(r.carrello));
      },
      resetCarrello: (r) => {
        (r.carrello = []), sessionStorage.removeItem("carrello");
      },
      aggiornaArticolo: (r, t) => {
        (r.carrello = r.carrello.map((s) =>
          s.id === t.payload.id ? t.payload : s
        )),
          sessionStorage.setItem("carrello", JSON.stringify(r.carrello));
      },
      cleanCart: (r) => {
        (r.carrello = []), sessionStorage.removeItem("carrello");
      },
    },
    extraReducers: (r) => {
      r.addCase(L.pending, (t) => {
        (t.status = "loading"), (t.error = null);
      })
        .addCase(L.fulfilled, (t, s) => {
          (t.status = "succeeded"),
            t.carrello.some((o) => o.id === s.payload.id)
              ? (t.carrello = t.carrello.map((o) =>
                  o.id === s.payload.id ? s.payload : o
                ))
              : (t.carrello = [...t.carrello, s.payload]),
            sessionStorage.setItem("carrello", JSON.stringify(t.carrello));
        })
        .addCase(L.rejected, (t, s) => {
          (t.status = "failed"), (t.error = s.payload);
        });
    },
  }),
  {
    setBarcode: _,
    removeQuantity: xt,
    removeItem: pt,
    resetCarrello: gt,
    aggiornaArticolo: ht,
    cleanCart: ft,
  } = ce.actions,
  bt = ce.reducer;
function yt() {
  const r = j(),
    { metodoPagamento: t, emailCliente: s } = f((x) => x.payment),
    { userId: a } = f((x) => x.auth),
    [o, n] = p.useState(""),
    c = (x) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x),
    m = (x) => {
      const d = x.target.value;
      r(dt(d)), d && !c(d) ? n("Formato email non valido.") : n("");
    },
    i = async () => {
      if (s && !c(s)) {
        g.fire(
          "Errore",
          "Inserisci un'email valida o lascia il campo vuoto.",
          "error"
        );
        return;
      }
      try {
        g.fire({
          title: "Il cliente ha pagato?",
          showDenyButton: !0,
          confirmButtonText: "Si",
          denyButtonText: "No",
        }).then(async (x) => {
          if (x.isConfirmed) {
            const d = await Me({
              operatore_id: a,
              metodoPagamento: t,
              emailCliente: s,
            });
            g.fire("Ordine confermato", "", "success"), r(ft()), r(H(!1));
          } else x.isDenied && g.fire("Richiesto pagamento");
        });
      } catch (x) {
        console.error("Errore durante il completamento dell'ordine:", x),
          g.fire("Errore", "Qualcosa è andato storto. Riprova.", "error");
      }
    };
  return e.jsx("div", {
    className:
      "fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50",
    children: e.jsxs("div", {
      className: "bg-white p-8 rounded-lg shadow-lg w-full max-w-md",
      children: [
        e.jsx("h2", {
          className: "text-2xl font-bold mb-6 text-center",
          children: "Scegli il Metodo di Pagamento",
        }),
        e.jsxs("div", {
          className: "mb-4",
          children: [
            e.jsx("label", {
              className: "block text-gray-700 font-medium mb-2",
              children: "Metodo di Pagamento",
            }),
            e.jsxs("div", {
              className: "flex items-center space-x-4",
              children: [
                e.jsxs("label", {
                  className: "flex items-center",
                  children: [
                    e.jsx("input", {
                      type: "radio",
                      name: "metodoPagamento",
                      value: "contanti",
                      checked: t === "contanti",
                      onChange: () => r(te("contanti")),
                      className: "mr-2",
                    }),
                    "Contanti",
                  ],
                }),
                e.jsxs("label", {
                  className: "flex items-center",
                  children: [
                    e.jsx("input", {
                      type: "radio",
                      name: "metodoPagamento",
                      value: "cdc",
                      checked: t === "cdc",
                      onChange: () => r(te("cdc")),
                      className: "mr-2",
                    }),
                    "Carta di Credito",
                  ],
                }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "mb-4",
          children: [
            e.jsx("label", {
              className: "block text-gray-700 font-medium mb-2",
              children: "Email del Cliente (Opzionale)",
            }),
            e.jsx("input", {
              type: "email",
              name: "emailCliente",
              value: s,
              onChange: m,
              placeholder: "Inserisci l'email del cliente",
              className: `w-full p-2 border ${
                o ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
            }),
            o && e.jsx("p", { className: "text-red-500 text-sm", children: o }),
          ],
        }),
        e.jsxs("div", {
          className: "flex justify-end space-x-4",
          children: [
            e.jsx("button", {
              className:
                "px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400",
              onClick: () => r(H(!1)),
              children: "Annulla",
            }),
            e.jsx("button", {
              className:
                "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
              onClick: i,
              children: "Conferma",
            }),
          ],
        }),
      ],
    }),
  });
}
function jt() {
  const r = j(),
    { barcode: t, carrello: s } = f((l) => l.cart),
    { userId: a } = f((l) => l.auth),
    { showModal: o } = f((l) => l.payment),
    [n, c] = p.useState(0),
    m = async () => {
      r(L({ barcode: t, userId: a })), r(_(""));
    },
    i = (l) => {
      l.key === "Enter" && m();
    },
    x = async (l) => {
      try {
        (await Re(l)).status === 200 && r(xt(l));
      } catch (y) {
        console.error("Errore durante la rimozione del prodotto:", y);
      }
    },
    d = async (l) => {
      try {
        (await $e(l)).status === 200 && r(pt(l));
      } catch (y) {
        console.error("Errore durante la rimozione del prodotto:", y);
      }
    },
    z = async (l, y) => {
      try {
        const O = y / 100,
          Z = await Te(l, O);
        Z.status === 200 && r(ht(Z.data.articolo));
      } catch (O) {
        console.error("Errore durante l'aggiornamento del prodotto:", O);
      }
    },
    w = () =>
      s.reduce((l, y) => l + parseFloat(y.ivaTotale || 0), 0).toFixed(2),
    u = () =>
      s.reduce((l, y) => l + parseFloat(y.totaleArticolo || 0), 0).toFixed(2),
    C = () => (parseFloat(w()) + parseFloat(u())).toFixed(2),
    R = async (l) => {
      (await Le(l)).status === 200 && (r(gt()), r(_("")));
    },
    h = () => {
      s.length > 0 && r(H(!0));
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsxs("div", {
        className:
          "relative flex-col mx-16 my-6 p-3 bg-white rounded-lg shadow-md",
        children: [
          e.jsx(B, {
            to: "/",
            className:
              "absolute top-4 left-4 text-gray-600 hover:text-gray-800",
            children: e.jsx(v, { icon: Y }),
          }),
          e.jsx("h1", {
            className: "text-3xl font-semibold text-center text-gray-800 mb-6",
            children: "Cassa",
          }),
          e.jsxs("div", {
            className: "flex items-center space-x-4 mb-6",
            children: [
              e.jsx("input", {
                name: "barcode",
                type: "text",
                placeholder: "Inserisci il codice a barre",
                value: t,
                onChange: (l) => {
                  const y = l.target.value.replace(/\D/g, "");
                  r(_(y));
                },
                onKeyDown: i,
                className:
                  "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
              }),
              e.jsx(N, {
                testo: "Aggiungi al Carrello",
                colore: "bg-primary",
                onClick: m,
              }),
            ],
          }),
          e.jsx("div", {
            className: "overflow-x-auto mb-6",
            children: e.jsxs("table", {
              className: "min-w-full bg-white border border-gray-200",
              children: [
                e.jsx("thead", {
                  children: e.jsxs("tr", {
                    children: [
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600",
                        children: "articolo id",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600",
                        children: "Nome",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Prezzo Unitario (€)",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Prezzo Outlet (€)",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Sconto (%)",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Prezzo scontato",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Aggiungi Sconto/Gratuito",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Prezzo Finale",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Quantità",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Totale (€)",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Iva Totale (€)",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Azione",
                      }),
                    ],
                  }),
                }),
                e.jsx("tbody", {
                  children: s.map((l) =>
                    e.jsxs(
                      "tr",
                      {
                        className: "hover:bg-gray-100",
                        children: [
                          e.jsx("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: l.id,
                          }),
                          e.jsx("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: l.nome,
                          }),
                          e.jsxs("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: ["€", l.prezzoOriginale],
                          }),
                          e.jsxs("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: ["€", Math.floor(l.prezzoOutlet)],
                          }),
                          e.jsxs("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: [l.scontoProdotto * 100, "%"],
                          }),
                          e.jsxs("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: ["€", l.prezzoScontato],
                          }),
                          e.jsxs("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: [
                              e.jsx("input", {
                                className:
                                  "w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
                                name: "sconto",
                                type: "number",
                                onChange: (y) => c(y.target.value),
                              }),
                              e.jsxs("div", {
                                className: "flex mt-1",
                                children: [
                                  e.jsx("input", {
                                    className: "mr-2",
                                    name: "gratis",
                                    type: "checkbox",
                                    onChange: () => c(100),
                                  }),
                                  e.jsx("label", { children: "Gratis" }),
                                ],
                              }),
                              e.jsx(N, {
                                testo: "Aggiungi",
                                onClick: () => z(l.id, n),
                                colore: "bg-primary",
                                classeAggiuntiva:
                                  "mt-2 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                              }),
                            ],
                          }),
                          e.jsxs("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: [
                              "€",
                              l.prezzoFinale
                                ? l.prezzoFinale
                                : l.prezzoScontato,
                            ],
                          }),
                          e.jsx("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: l.quantita,
                          }),
                          e.jsxs("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: ["€", l.totaleArticolo],
                          }),
                          e.jsxs("td", {
                            className: "py-2 px-4 border-b text-gray-700",
                            children: ["€", l.ivaTotale],
                          }),
                          e.jsxs("td", {
                            className:
                              "flex justify-center py-6 px-4 border-b min-h-28 text-gray-700 space-x-2",
                            children: [
                              l.quantita > 1 &&
                                e.jsx("button", {
                                  onClick: () => x(l.id),
                                  className:
                                    "bg-yellow-500 text-white font-semibold py-1 px-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50",
                                  children: "Rimuovi",
                                }),
                              e.jsx("button", {
                                onClick: () => d(l.id),
                                className:
                                  "bg-red-500 text-white font-semibold py-2 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50",
                                children: "Rimuovi Tutto",
                              }),
                            ],
                          }),
                        ],
                      },
                      l.id
                    )
                  ),
                }),
              ],
            }),
          }),
          e.jsxs("div", {
            className: "flex justify-between text-right my-6",
            children: [
              e.jsx(N, {
                testo: "Reset carrello",
                colore: "bg-secondary",
                onClick: () => R(s[0].carrello_id),
              }),
              e.jsxs("span", {
                className: "text-xl font-semibold text-gray-800",
                children: [
                  "IVA Totale: € ",
                  w(),
                  e.jsx("br", {}),
                  "Totale Ordine (IVA inclusa): € ",
                  C(),
                ],
              }),
            ],
          }),
          e.jsx(N, {
            testo: "Completa Ordine",
            classeAggiuntiva:
              "bg-green-500 w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50",
            colore: "green-500",
            onClick: h,
          }),
        ],
      }),
      o && e.jsx(yt, {}),
    ],
  });
}
const Nt = () =>
    e.jsxs(e.Fragment, {
      children: [e.jsx(S, {}), e.jsx(jt, {}), e.jsx(I, {})],
    }),
  vt = () => b.get("/ordini/getOrdini.php"),
  wt = (r) => b.delete("/ordini/delete.php", { data: { id: r } }),
  zt = (r, t) =>
    b.get("/ordini/filterByDate.php", {
      params: {
        startDate: `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(r.getDate()).padStart(2, "0")}`,
        endDate:
          t &&
          `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(t.getDate()).padStart(2, "0")} 23:59:59`,
      },
    }),
  Ct = (r) => b.post("/ordini/getOrderDetails.php", { carrello_id: r }),
  St = {
    ordini: [],
    ordiniFiltrati: [],
    dettagliOrdine: [],
    ordine: null,
    visualizzaOrdine: !1,
    status: "idle",
    error: null,
  },
  T = P("ordine/fetchOrdini", async (r, { rejectWithValue: t }) => {
    try {
      return (await vt()).data.data;
    } catch (s) {
      return s.response && s.response.data
        ? t(s.response.data.error)
        : t("Errore");
    }
  }),
  M = P("ordine/fetchDettagliOrdine", async (r, { rejectWithValue: t }) => {
    try {
      return (await Ct(r)).data.articoli;
    } catch (s) {
      return s.response && s.response.data
        ? t(s.response.data.error)
        : t("Errore");
    }
  }),
  U = P("ordine/deleteOrder", async (r, { rejectWithValue: t }) => {
    try {
      return (
        (await wt(r)).status === 200 &&
          g.fire("Successo", "Ordine cancellato con successo!", "success"),
        r
      );
    } catch (s) {
      return s.response && s.response.data
        ? t(s.response.data.error)
        : t("Errore");
    }
  }),
  de = k({
    name: "storicoOrdini",
    initialState: St,
    reducers: {
      setVisualizzaOrdine: (r, t) => {
        r.visualizzaOrdine = t.payload;
      },
      setOrdiniFiltrati: (r, t) => {
        r.ordiniFiltrati = t.payload;
      },
      setOrdine: (r, t) => {
        r.ordine = r.ordini.find((s) => s.id === t.payload);
      },
      resetFiltro: (r) => {
        r.ordiniFiltrati = r.ordini;
      },
    },
    extraReducers: (r) => {
      r.addCase(T.pending, (t) => {
        t.status = "loading";
      })
        .addCase(T.fulfilled, (t, s) => {
          (t.status = "succeeded"), (t.ordini = s.payload);
        })
        .addCase(T.rejected, (t, s) => {
          (t.status = "failed"), (t.error = s.error.message);
        })
        .addCase(U.pending, (t) => {
          t.status = "loading";
        })
        .addCase(U.fulfilled, (t, s) => {
          (t.status = "succeeded"),
            (t.ordini = t.ordini.filter((a) => a.id !== s.payload));
        })
        .addCase(U.rejected, (t, s) => {
          (t.status = "failed"), (t.error = s.error.message);
        })
        .addCase(M.pending, (t) => {
          t.status = "loading";
        })
        .addCase(M.fulfilled, (t, s) => {
          (t.status = "succeeded"), (t.dettagliOrdine = s.payload);
        })
        .addCase(M.rejected, (t, s) => {
          (t.status = "failed"), (t.error = s.error.message);
        });
    },
  }),
  {
    setVisualizzaOrdine: J,
    setOrdiniFiltrati: Pt,
    setOrdine: Ot,
    resetFiltro: It,
  } = de.actions,
  Ft = de.reducer,
  kt = () => {
    const r = j(),
      { status: t, dettagliOrdine: s, ordine: a } = f((o) => o.storicoOrdini);
    return t === "loading"
      ? e.jsx("div", {
          className:
            "fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50",
          children: e.jsx("div", {
            className: "bg-white rounded-lg shadow-lg p-6",
            children: e.jsx("p", {
              children: "Caricamento dettagli ordine...",
            }),
          }),
        })
      : e.jsx("div", {
          className:
            "fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50",
          children: e.jsxs("div", {
            className: "bg-white rounded-lg shadow-lg max-w-2xl w-full",
            children: [
              e.jsxs("div", {
                className: "p-4 border-b flex justify-between items-center",
                children: [
                  e.jsx("h2", {
                    className: "text-lg font-bold",
                    children: "BULLPADEL SHOP",
                  }),
                  e.jsx("button", {
                    className: "text-gray-500 hover:text-gray-700",
                    onClick: () => r(J(!1)),
                    children: "✕",
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "p-6",
                children: [
                  e.jsxs("div", {
                    className: "text-center mb-4",
                    children: [
                      e.jsx("p", { children: "Indirizzo del Negozio" }),
                      e.jsx("p", { children: "Telefono: 0123 456789" }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "text-center mb-6",
                    children: [
                      e.jsx("p", {
                        className: "font-bold",
                        children: "Ricevuta di Pagamento",
                      }),
                      e.jsxs("p", {
                        children: [
                          "Data:",
                          " ",
                          a.created_at
                            .split(" ")[0]
                            .split("-")
                            .reverse()
                            .join("-"),
                        ],
                      }),
                      e.jsxs("p", { children: ["Numero Ordine: ", a.id, " "] }),
                    ],
                  }),
                  e.jsxs("table", {
                    className: "min-w-full text-left mb-6",
                    children: [
                      e.jsx("thead", {
                        children: e.jsxs("tr", {
                          children: [
                            e.jsx("th", {
                              className: "py-1 border-b",
                              children: "Prodotto",
                            }),
                            e.jsx("th", {
                              className: "py-1 border-b text-right",
                              children: "Quantità",
                            }),
                            e.jsx("th", {
                              className: "py-1 border-b text-right",
                              children: "Prezzo",
                            }),
                            e.jsx("th", {
                              className: "py-1 border-b text-right",
                              children: "Totale",
                            }),
                          ],
                        }),
                      }),
                      e.jsx("tbody", {
                        children: s.map((o) =>
                          e.jsxs(
                            "tr",
                            {
                              children: [
                                e.jsx("td", {
                                  className: "py-1",
                                  children: o.nome,
                                }),
                                e.jsx("td", {
                                  className: "py-1 text-right",
                                  children: o.quantita,
                                }),
                                e.jsxs("td", {
                                  className: "py-1 text-right",
                                  children: [
                                    "€",
                                    o.prezzoFinale
                                      ? o.prezzoFinale
                                      : o.prezzoScontato,
                                  ],
                                }),
                                e.jsxs("td", {
                                  className: "py-1 text-right",
                                  children: ["€", o.totaleArticolo],
                                }),
                              ],
                            },
                            o.id
                          )
                        ),
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "flex justify-end border-t pt-4",
                    children: [
                      e.jsxs("div", {
                        className: "flex flex-col mx-4",
                        children: [
                          e.jsx("p", {
                            className: "font-bold",
                            children: "Totale IVA: ",
                          }),
                          e.jsx("p", {
                            className: "font-bold",
                            children: "Totale:",
                          }),
                        ],
                      }),
                      e.jsxs("div", {
                        className: "flex flex-col",
                        children: [
                          e.jsxs("p", {
                            className: "",
                            children: ["€ ", a.ivaTotale],
                          }),
                          e.jsxs("p", {
                            className: "",
                            children: ["€ ", a.totale, " "],
                          }),
                        ],
                      }),
                    ],
                  }),
                  e.jsxs("div", {
                    className: "text-center mt-4",
                    children: [
                      e.jsx("p", { children: "Metodo di Pagamento: " }),
                      e.jsx("p", {
                        children: "Grazie per aver acquistato da noi!",
                      }),
                    ],
                  }),
                ],
              }),
              e.jsxs("div", {
                className: "p-4 border-t flex justify-around",
                children: [
                  e.jsx("button", {
                    className:
                      "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-400",
                    onClick: () => r(J(!1)),
                    children: "Chiudi",
                  }),
                  e.jsx("button", {
                    className:
                      "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",
                    children: "Scarica Ricevuta",
                  }),
                ],
              }),
            ],
          }),
        });
  },
  Et = () => {
    const r = j(),
      { ordiniFiltrati: t } = f((i) => i.storicoOrdini),
      [s, a] = p.useState(null),
      [o, n] = p.useState(null),
      c = async (i, x) => {
        if (!i) {
          g.fire("Data iniziale mancante");
          return;
        }
        try {
          const d = await zt(i, x);
          d.data.ordini
            ? r(Pt(d.data.ordini))
            : g.fire({
                title: "Non ci sono ordini nel periodo specificato",
                icon: "warning",
              });
          return;
        } catch (d) {
          throw (
            (console.error(
              "Errore durante il filtraggio degli ordini per date:",
              d
            ),
            d)
          );
        }
      },
      m = () => {
        a(null), n(null), r(It());
      };
    return e.jsxs("div", {
      className:
        "flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md max-w-md mx-auto",
      children: [
        e.jsx("h2", {
          className: "text-lg font-semibold mb-4",
          children: "Filtro per Data",
        }),
        e.jsxs("div", {
          className: "flex space-x-4 mb-4",
          children: [
            e.jsxs("div", {
              className: "flex flex-col items-start",
              children: [
                e.jsx("label", {
                  className: "mb-2 text-sm font-medium",
                  children: "Data Iniziale:",
                }),
                e.jsx(W, {
                  selected: s,
                  onChange: (i) => a(i),
                  selectsStart: !0,
                  startDate: s,
                  endDate: o,
                  className: "p-2 border border-gray-300 rounded",
                  placeholderText: "Seleziona data iniziale",
                  dateFormat: "dd/MM/yyyy",
                }),
              ],
            }),
            e.jsxs("div", {
              className: "flex flex-col items-start",
              children: [
                e.jsx("label", {
                  className: "mb-2 text-sm font-medium",
                  children: "Data Finale:",
                }),
                e.jsx(W, {
                  selected: o,
                  onChange: (i) => n(i),
                  selectsEnd: !0,
                  startDate: s,
                  endDate: o,
                  minDate: s,
                  className: "p-2 border border-gray-300 rounded",
                  placeholderText: "Seleziona data finale",
                  dateFormat: "dd/MM/yyyy",
                }),
              ],
            }),
          ],
        }),
        e.jsxs("div", {
          className: "flex space-x-4",
          children: [
            e.jsx("button", {
              className:
                "bg-[#0d1829] text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none",
              onClick: () => c(s, o),
              children: "Filtra ordini",
            }),
            e.jsx("button", {
              className:
                "bg-[#0d1829] text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none",
              children: "Scarica storico",
            }),
            t.length > 0 &&
              e.jsx(N, {
                testo: "Reset",
                colore: "bg-primary",
                onClick: () => {
                  m();
                },
              }),
          ],
        }),
      ],
    });
  };
function At() {
  const {
      ordini: r,
      status: t,
      visualizzaOrdine: s,
      ordiniFiltrati: a,
    } = f((m) => m.storicoOrdini),
    o = j();
  p.useEffect(() => {
    t === "idle" && o(T());
  }, [o, t]);
  const n = (m) => {
      o(U(m));
    },
    c = (m, i) => {
      o(M(m)), o(Ot(i)), o(J(!0));
    };
  return e.jsxs(e.Fragment, {
    children: [
      e.jsxs("div", {
        className: "relative  mt-5 mx-36 p-6 bg-white rounded-lg shadow-md",
        children: [
          e.jsx(B, {
            to: "/",
            className:
              "absolute top-4 left-4 text-gray-600 hover:text-gray-800",
            children: e.jsx(v, { icon: Y }),
          }),
          e.jsx("h1", {
            className: "text-3xl font-semibold text-center text-gray-800 mb-6",
            children: "Storico Ordini",
          }),
          e.jsx("div", { className: "mb-4", children: e.jsx(Et, {}) }),
          e.jsx("div", {
            className: "overflow-x-auto",
            children: e.jsxs("table", {
              className: "min-w-full bg-white border border-gray-200",
              children: [
                e.jsx("thead", {
                  children: e.jsxs("tr", {
                    children: [
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "ID Ordine",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Data",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Totale (€)",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Metodo di Pagamento",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Email",
                      }),
                      e.jsx("th", {
                        className:
                          "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                        children: "Azioni",
                      }),
                    ],
                  }),
                }),
                e.jsx("tbody", {
                  children:
                    r && (a.length > 0 ? a : r).length > 0
                      ? (a.length > 0 ? a : r).map((m) =>
                          e.jsxs(
                            "tr",
                            {
                              className: "hover:bg-gray-100",
                              children: [
                                e.jsx("td", {
                                  className: "py-2 px-4 border-b text-gray-700",
                                  children: m.id,
                                }),
                                e.jsx("td", {
                                  className: "py-2 px-4 border-b text-gray-700",
                                  children: m.created_at,
                                }),
                                e.jsxs("td", {
                                  className: "py-2 px-4 border-b text-gray-700",
                                  children: ["€", m.totale],
                                }),
                                e.jsx("td", {
                                  className: "py-2 px-4 border-b text-gray-700",
                                  children: m.metodoPagamento,
                                }),
                                e.jsx("td", {
                                  className: "py-2 px-4 border-b text-gray-700",
                                  children: m.emailCliente,
                                }),
                                e.jsx("td", {
                                  className:
                                    "py-2 px-4 border-b text-gray-700 space-x-2",
                                  children: e.jsxs("div", {
                                    className:
                                      "flex flex-col sm:flex-row sm:space-x-2",
                                    children: [
                                      e.jsx("button", {
                                        className:
                                          "bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                                        onClick: () => c(m.carrello_id, m.id),
                                        children: "Visualizza Ordine",
                                      }),
                                      e.jsx("button", {
                                        onClick: () => n(m.id),
                                        className:
                                          "bg-red-500 text-white font-semibold py-1 px-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50",
                                        children: "Elimina",
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            m.id
                          )
                        )
                      : e.jsx("tr", {
                          children: e.jsx("td", {
                            colSpan: "6",
                            className:
                              "py-2 px-4 text-center text-gray-700 font-bold underline",
                            children: "Non ci sono ordini",
                          }),
                        }),
                }),
              ],
            }),
          }),
        ],
      }),
      s && e.jsx(kt, {}),
    ],
  });
}
const Dt = () => {
    const { status: r } = f((t) => t.storicoOrdini);
    return r === "loading"
      ? e.jsxs(e.Fragment, {
          children: [
            e.jsx(S, {}),
            e.jsx("div", {
              className: "flex items-center justify-center h-screen",
              children: e.jsx(v, { icon: V, spin: !0, size: "3x" }),
            }),
          ],
        })
      : e.jsxs(e.Fragment, {
          children: [e.jsx(S, {}), e.jsx(At, {}), e.jsx(I, {})],
        });
  },
  Rt = { users: [], status: "idle", error: null },
  q = P("users/fetchUsers", async (r, { rejectWithValue: t }) => {
    try {
      return (await Ut()).data.data;
    } catch (s) {
      return s.response && s.response.data
        ? t(s.response.data.error)
        : t("Errore");
    }
  }),
  ue = P("auth/deleteUser", async (r, { rejectWithValue: t }) => {
    try {
      return await Bt(r), r;
    } catch (s) {
      return s.response && s.response.data
        ? t(s.response.data.error)
        : t("Errore");
    }
  }),
  me = P("auth/createUser", async (r, { rejectWithValue: t }) => {
    try {
      return (await qt(r)).data;
    } catch (s) {
      return s.response && s.response.data
        ? t(s.response.data.error)
        : t("Errore");
    }
  }),
  xe = k({
    name: "admin",
    initialState: Rt,
    reducers: {
      setStatus: (r, t) => {
        r.status = t.payload;
      },
    },
    extraReducers: (r) => {
      r.addCase(q.pending, (t) => {
        t.status = "loading";
      })
        .addCase(q.fulfilled, (t, s) => {
          (t.status = "succeeded"), (t.users = s.payload);
        })
        .addCase(q.rejected, (t, s) => {
          (t.status = "failed"), (t.error = s.error.message);
        })
        .addCase(ue.fulfilled, (t, s) => {
          t.users = t.users.filter((a) => a.id !== s.payload);
        })
        .addCase(me.fulfilled, (t, s) => {
          t.users.push(s.payload);
        });
    },
  }),
  { setStatus: $t } = xe.actions,
  Lt = xe.reducer,
  pe = Ne({
    reducer: {
      products: We,
      cart: bt,
      addProducts: st,
      storicoOrdini: Ft,
      payment: ut,
      auth: Ae,
      admin: Lt,
    },
  }),
  D = re.create({
    baseURL: "http://localhost:8080/controllers",
    headers: { "Content-Type": "application/json" },
    withCredentials: !0,
  });
D.interceptors.request.use((r) => {
  console.log("Request URL:", r.baseURL + r.url);
  const s = pe.getState().auth.token;
  return s && (r.headers.Authorization = `Bearer ${s}`), r;
});
const Tt = (r, t) =>
    D.post("/auth/login.php", { username: r, password_hash: t }),
  Mt = async () => (await D.get("/auth/authenticate.php")).data,
  Ut = () => D.get("/auth/getAll.php"),
  qt = (r) => D.post("/auth/createUser.php", r),
  Bt = (r) => D.delete("/auth/deleteUser.php", { data: { id: r } }),
  Gt = () => {
    const [r, t] = p.useState(""),
      [s, a] = p.useState(""),
      [o, n] = p.useState({}),
      c = j(),
      m = se(),
      i = () => {
        const d = {};
        return (
          r.trim() || (d.username = "Il campo username è obbligatorio."),
          s
            ? s.length < 5 &&
              (d.password = "La password deve contenere almeno 5 caratteri.")
            : (d.password = "Il campo password è obbligatorio."),
          d
        );
      },
      x = async (d) => {
        d.preventDefault();
        const z = i();
        if (Object.keys(z).length > 0) {
          n(z);
          return;
        }
        try {
          const w = await Tt(r, s);
          c(Fe(w.data));
          const u = await Mt();
          c(ke(u.data)), m("/");
        } catch {
          g.fire("Errore", "Credenziali non valide. Riprova.", "error");
        }
      };
    return e.jsx("div", {
      className:
        "bg-hero-pattern bg-cover bg-center bg-no-repeat min-h-screen w-full flex justify-center items-center h-screen bg-gray-100",
      children: e.jsxs("div", {
        className:
          "w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg",
        children: [
          e.jsx("h2", {
            className: "text-3xl font-semibold text-center text-gray-800",
            children: "Login",
          }),
          e.jsxs("form", {
            onSubmit: x,
            className: "space-y-6",
            children: [
              e.jsxs("div", {
                className: "flex flex-col",
                children: [
                  e.jsx("label", {
                    className: "mb-2 text-sm font-medium text-gray-600",
                    children: "Username:",
                  }),
                  e.jsx("input", {
                    type: "text",
                    value: r,
                    onChange: (d) => t(d.target.value),
                    className: `w-full px-3 py-2 border rounded-lg ${
                      o.username ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`,
                    placeholder: "Inserisci il tuo username",
                  }),
                  o.username &&
                    e.jsx("p", {
                      className: "text-sm text-red-500 mt-1",
                      children: o.username,
                    }),
                ],
              }),
              e.jsxs("div", {
                className: "flex flex-col",
                children: [
                  e.jsx("label", {
                    className: "mb-2 text-sm font-medium text-gray-600",
                    children: "Password:",
                  }),
                  e.jsx("input", {
                    type: "password",
                    value: s,
                    onChange: (d) => a(d.target.value),
                    className: `w-full px-3 py-2 border rounded-lg ${
                      o.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`,
                    placeholder: "Inserisci la tua password",
                  }),
                  o.password &&
                    e.jsx("p", {
                      className: "text-sm text-red-500 mt-1",
                      children: o.password,
                    }),
                ],
              }),
              e.jsx("button", {
                type: "submit",
                className:
                  "w-full px-4 py-2 text-white bg-[#0d1829] rounded-lg hover:bg-[#152238] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                children: "Login",
              }),
            ],
          }),
        ],
      }),
    });
  },
  E = ({ children: r }) =>
    f((s) => s.auth.isAuthenticated) ? r : e.jsx(ve, { to: "/login" }),
  _t = () => {
    const r = j(),
      { users: t, status: s } = f((o) => o.admin);
    p.useEffect(() => {
      s === "idle" && r(q());
    }, [r, s]);
    const a = (o) => {
      g.fire({
        title: "Sei sicuro di vole eliminare questo operatore?",
        showDenyButton: !0,
        confirmButtonText: "Si",
        denyButtonText: "No",
      }).then((n) => {
        n.isConfirmed && r(ue(o));
      });
    };
    return e.jsx(e.Fragment, {
      children: e.jsxs("div", {
        className: "w-1/2 p-6 bg-white rounded-lg shadow-md",
        children: [
          e.jsx("h2", {
            className: "text-2xl font-bold mb-5  text-gray-800",
            children: "Operatori",
          }),
          e.jsxs("table", {
            className: "min-w-full bg-white border border-gray-200",
            children: [
              e.jsx("thead", {
                children: e.jsxs("tr", {
                  children: [
                    e.jsx("th", {
                      className:
                        "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                      children: "Id",
                    }),
                    e.jsx("th", {
                      className:
                        "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                      children: "Username",
                    }),
                    e.jsx("th", {
                      className:
                        "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                      children: "Ruolo",
                    }),
                    e.jsx("th", {
                      className:
                        "py-2 px-4 border-b font-semibold text-gray-600 text-left",
                      children: "Azione",
                    }),
                  ],
                }),
              }),
              e.jsx("tbody", {
                children: t.map((o, n) =>
                  e.jsxs(
                    "tr",
                    {
                      className: "hover:bg-gray-100",
                      children: [
                        e.jsx("td", {
                          className: "py-2 px-4 border-b text-gray-700",
                          children: o.id,
                        }),
                        e.jsx("td", {
                          className: "py-2 px-4 border-b text-gray-700",
                          children: o.username ? o.username : "N/A",
                        }),
                        e.jsxs("td", {
                          className: "py-2 px-4 border-b text-gray-700",
                          children: [o.role, " "],
                        }),
                        e.jsx("td", {
                          className: "py-2 px-4 border-b text-gray-700",
                          children: e.jsx(N, {
                            testo: "Cancella",
                            colore: "bg-secondary",
                            onClick: () => a(o.id),
                          }),
                        }),
                      ],
                    },
                    o.id || `user-${n}`
                  )
                ),
              }),
            ],
          }),
        ],
      }),
    });
  },
  Qt = () => {
    const [r, t] = p.useState(""),
      [s, a] = p.useState(""),
      [o, n] = p.useState(""),
      [c, m] = p.useState("User"),
      [i, x] = p.useState({}),
      d = j(),
      z = () => {
        const u = {};
        return (
          r.trim() || (u.username = "Il nome utente è obbligatorio."),
          s
            ? s.length < 5 &&
              (u.password = "La password deve avere almeno 5 caratteri.")
            : (u.password = "La password è obbligatoria."),
          s !== o && (u.confirmPassword = "Le password non coincidono."),
          u
        );
      },
      w = async (u) => {
        u.preventDefault();
        const C = z();
        if (Object.keys(C).length > 0) {
          x(C);
          return;
        }
        const R = { username: r, password: s, role: c };
        try {
          await d(me(R)).unwrap(),
            g.fire("Successo", "Operatore creato con successo!", "success"),
            d($t("idle")),
            t(""),
            a(""),
            n(""),
            m("Admin"),
            x({});
        } catch (h) {
          g.fire("Errore", h || "Errore durante la creazione.", "error");
        }
      };
    return e.jsx("div", {
      className: "w-1/3 p-4 bg-white rounded-lg shadow-md",
      children: e.jsxs("form", {
        onSubmit: w,
        children: [
          e.jsx("h2", {
            className: "text-2xl font-bold mb-5 text-gray-800",
            children: "Aggiungi Operatore",
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "username",
                children: "Username",
              }),
              e.jsx("input", {
                type: "text",
                id: "username",
                value: r,
                onChange: (u) => t(u.target.value),
                className: `w-full p-2 border ${
                  i.username ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
                placeholder: "Inserisci username",
              }),
              i.username &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: i.username,
                }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "password",
                children: "Password",
              }),
              e.jsx("input", {
                type: "password",
                id: "password",
                value: s,
                onChange: (u) => a(u.target.value),
                className: `w-full p-2 border ${
                  i.password ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
                placeholder: "Crea password",
              }),
              i.password &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: i.password,
                }),
            ],
          }),
          e.jsxs("div", {
            className: "mb-2",
            children: [
              e.jsx("label", {
                className: "block text-gray-700 font-medium mb-2",
                htmlFor: "confirmPassword",
                children: "Conferma Password",
              }),
              e.jsx("input", {
                type: "password",
                id: "confirmPassword",
                value: o,
                onChange: (u) => n(u.target.value),
                className: `w-full p-2 border ${
                  i.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`,
                placeholder: "Conferma password",
              }),
              i.confirmPassword &&
                e.jsx("p", {
                  className: "text-red-500 text-sm",
                  children: i.confirmPassword,
                }),
            ],
          }),
          e.jsxs("div", {
            className: "flex justify-center my-6 space-x-2",
            children: [
              e.jsxs("label", {
                children: [
                  e.jsx("input", {
                    type: "radio",
                    value: "Admin",
                    checked: c === "Admin",
                    onChange: () => m("Admin"),
                    className: "mr-2",
                  }),
                  "Admin",
                ],
              }),
              e.jsxs("label", {
                children: [
                  e.jsx("input", {
                    type: "radio",
                    value: "User",
                    checked: c === "User",
                    onChange: () => m("User"),
                    className: "mr-2",
                  }),
                  "User",
                ],
              }),
            ],
          }),
          e.jsx(N, {
            testo: "Aggiungi",
            colore: "bg-primary",
            classeAggiuntiva:
              "w-full text-white font-semibold py-2 px-4 rounded hover:opacity-80",
          }),
        ],
      }),
    });
  },
  Xt = () =>
    e.jsxs(e.Fragment, {
      children: [
        e.jsx(S, {}),
        e.jsxs("div", {
          className: "flex justify-center mx-10 space-x-4 mt-10",
          children: [e.jsx(_t, {}), e.jsx(Qt, {})],
        }),
        e.jsx(I, {}),
      ],
    });
function Ht() {
  return e.jsx("div", {
    className: "bg-hero-pattern flex flex-col min-h-screen w-full",
    children: e.jsxs(we, {
      children: [
        e.jsx(F, { path: "/login", element: e.jsx(Gt, {}) }),
        e.jsx(F, { path: "/", element: e.jsx(E, { children: e.jsx(et, {}) }) }),
        e.jsx(F, {
          path: "/prodotti",
          element: e.jsx(E, { children: e.jsx(it, {}) }),
        }),
        e.jsx(F, {
          path: "/aggiungi-prodotto",
          element: e.jsx(E, { children: e.jsx(at, {}) }),
        }),
        e.jsx(F, {
          path: "/cassa",
          element: e.jsx(E, { children: e.jsx(Nt, {}) }),
        }),
        e.jsx(F, {
          path: "/storico-ordini",
          element: e.jsx(E, { children: e.jsx(Dt, {}) }),
        }),
        e.jsx(F, {
          path: "/admin",
          element: e.jsx(E, { children: e.jsx(Xt, {}) }),
        }),
      ],
    }),
  });
}
ze(document.getElementById("root")).render(
  e.jsx(p.StrictMode, {
    children: e.jsx(Ce, {
      store: pe,
      children: e.jsx(Se, { children: e.jsx(Ht, {}) }),
    }),
  })
);
