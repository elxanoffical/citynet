"use client";

import { useState, useRef, useEffect } from "react";
import Select from "react-select";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rawCityList = [
  "Abşeron (Qobu qəsəbəsi)",
  "Abşeron (Görədil qəsəbəsi)",
  "Abşeron (Güzdək qəsəbəsi)",
  "Abşeron (Hökməli qəsəbəsi)",
  "Abşeron (Ceyranbatan qəsəbəsi)",
  "Abşeron (Məmmədli qəsəbəsi)",
  "Abşeron (Masazır qəsəbəsi)",
  "Abşeron (Mehdiabad qəsəbəsi)",
  "Abşeron (Novxanı qəsəbəsi)",
  "Abşeron (Saray qəsəbəsi)",
  "Ağdam",
  "Ağdaş",
  "Ağcabədi",
  "Ağstafa",
  "Ağsu",
  "Astara",
  "Bakı",
  "Bakı (28 May qəsəbəsi)",
  "Bakı (Ələt qəsəbəsi)",
  "Bakı (Albalılıq bağları)",
  "Bakı (Əmircan qəsəbəsi)",
  "Bakı (Bahar qəsəbəsi)",
  "Bakı (Bakıxanov qəsəbəsi)",
  "Bakı (Biləcəri qəsəbəsi)",
  "Bakı (Bilgəh qəsəbəsi)",
  "Bakı (Binəqədi qəsəbəsi)",
  "Bakı (Binə qəsəbəsi)",
  "Bakı (Bülbülə qəsəbəsi)",
  "Bakı (Buzovna qəsəbəsi)",
  "Bakı (Qala qəsəbəsi)",
  "Bakı (Qızıldaş qəsəbəsi)",
  "Balakən",
  "Bərdə",
  "Füzuli (Horadiz)",
  "Qəbələ",
  "Gədəbəy",
  "Qax",
  "Gəncə",
  "Qazax",
  "Xırdalan",
  "Xızı",
  "Lənkəran",
  "Masallı",
  "Mingəçevir",
  "Naftalan",
  "Neftçala",
  "Tərtər",
  "Tovuz",
  "Yevlax",
];

const groupCities = () => {
  const groups = {};
  rawCityList.forEach((city) => {
    const match = city.match(/(.*?) \((.*?)\)/);
    if (match) {
      const parent = match[1].trim();
      if (!groups[parent]) groups[parent] = [];
      groups[parent].push(city);
    } else {
      if (!groups[city]) groups[city] = [];
    }
  });
  return Object.entries(groups).map(([label, children]) => ({
    label,
    options: children.map((c) => ({ label: c, value: c })),
  }));
};

const CitySearch = () => {
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const formRef = useRef(null);

  const isButtonDisabled = !city || !street || !building;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Inputs və select üçün scroll-trigger animasiyası
      gsap.utils.toArray(".form-field").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      // Yoxla düyməsi üçün animasiya
      gsap.from(".check-button", {
        scrollTrigger: {
          trigger: ".check-button",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={formRef}
      className="max-w-[1280px] mx-auto mt-10 bg-white rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.06)] p-6 md:p-8"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Ünvanınızı yoxlayın
      </h3>

      <div className="flex flex-wrap md:flex-nowrap gap-4 items-end">
        {/* Şəhər seçimi */}
        <div className="form-field flex flex-col w-full cursor-pointer md:w-[28%]">
          <label className="text-sm text-gray-500 mb-1">Şəhər</label>
          <Select
            options={groupCities()}
            value={city ? { label: city, value: city } : null}
            onChange={(opt) => setCity(opt?.value || "")}
            placeholder="Şəhər seçin"
            isSearchable
            styles={{
              control: (base, state) => ({
                ...base,
                borderRadius: "0.75rem",
                borderColor: "#d1d5db",
                boxShadow: state.isFocused
                  ? "0 0 0 2px #3b82f6"
                  : base.boxShadow,
                cursor: "pointer",
                "&:hover": { borderColor: "#9e2039" },
              }),
              menu: (base) => ({
                ...base,
                zIndex: 50,
                maxHeight: 300,
                overflowY: "auto",
              }),
            }}
          />
        </div>

        {/* Küçə */}
        <div className="form-field flex flex-col w-full md:w-[28%]">
          <label className="text-sm text-gray-500 mb-1">Küçə</label>
          <input
            type="text"
            placeholder="Küçə daxil edin"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="border rounded-xl px-4 py-2 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#B72C48] transition cursor-pointer"
          />
        </div>

        {/* Ev */}
        <div className="form-field flex flex-col w-full md:w-[18%]">
          <label className="text-sm text-gray-500 mb-1">Ev</label>
          <input
            type="text"
            placeholder="Bina nömrəsi"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="border rounded-xl px-4 py-2 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#B72C48] transition cursor-pointer"
          />
        </div>

        {/* Yoxla Button */}
        <div className="form-field w-full md:w-[26%]">
          <button
            disabled={isButtonDisabled}
            className={`check-button w-full h-full mt-5 md:mt-0 px-4 py-3 rounded-xl font-semibold text-white text-sm transition ${
              isButtonDisabled
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#B72C48] hover:bg-[#9e2039] cursor-pointer"
            }`}
          >
            Mümkünlüyü yoxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitySearch;
