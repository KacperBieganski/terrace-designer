# 🏡 Terrace Designer

**Terrace Designer** to interaktywna aplikacja 3D oparta na **React Three Fiber**, umożliwiająca projektowanie nowoczesnych tarasów z uwzględnieniem komponentów takich jak panele, dachy szklane, podpory i więcej.

## ✨ Funkcje

* 🧱 Dodawanie i modyfikacja segmentów tarasu
* �� Konfigurator dachu szklanego (ilość rzędów, kolumn, spadki, grubość szkła)
* 📀 Dynamiczne obliczanie wymiarów i pozycjonowanie elementów
* 🧮 Interaktywne wskaźniki rozmiarów
* ⚙️ Obsługa wielu typów komponentów: profile, panele, słupki, szkło
* 📦 Możliwość rozbudowy o dodatkowe funkcjonalności (np. generowanie wyceny)

## 🔧 Technologie

* [React](https://reactjs.org/)
* [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
* [Three.js](https://threejs.org/)
* [Leva](https://github.com/pmndrs/leva)
* [Zustand](https://github.com/pmndrs/zustand)
* [Drei](https://github.com/pmndrs/drei)
* TypeScript

## 🚀 Uruchomienie projektu lokalnie

1. Sklonuj repozytorium:

```bash
git clone https://github.com/KacperBieganski/terrace-designer.git
cd terrace-designer
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Uruchom aplikację:

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: [http://localhost:5173](http://localhost:5173)

## 🗂 Struktura projektu (skrótowo)

```
src/
│
├─ components/         → Główne komponenty 3D (Profile, Panele, Dach, itd.)
├─ store/              → Zustand – zarządzanie stanem
├─ helpers/            → Funkcje pomocnicze do obliczeń geometrii, pozycji itd.
├─ config/             → Domyślne wartości i schematy konfiguracyjne
├─ hooks/              → Custom hooki (np. update state, resize handling)
├─ App.tsx             → Główna aplikacja
└─ main.tsx            → Punkt wejścia
```

## 🔮 Przyszłe usprawnienia

* Eksport projektu do PDF lub STL
* Obsługa wielu materiałów i kolorów
* Zapisywanie i wczytywanie projektów
* Tryb AR / WebXR (podgląd tarasu w rzeczywistości)
