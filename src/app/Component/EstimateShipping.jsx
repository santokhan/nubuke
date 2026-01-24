"use client";
import { useState, useMemo } from "react";
import { ChevronDown, ShoppingBag, Truck } from "lucide-react";
import { Country, State } from "country-state-city";

export default function EstimateShipping() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const countries = useMemo(() => Country.getAllCountries(), []);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  const states = useMemo(() => {
    return selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setError("");
  };

  const handleCalculate = () => {
    setError("");
    if (!selectedCountry || !selectedState || !zip) {
      setError("Please fill in all fields to estimate shipping.");
      return;
    }

    if (zip.length < 3) {
      setError("The zip code provided does not match the selected region.");
      return;
    }
  };

  return (
    <div className="w-full border-y border-[#dacfcd] text-[#39180F]">
      <div
        className="flex items-center justify-between py-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
          <ShoppingBag />
          <p className="tracking-tight text-sm">Estimate Shipping</p>
        </div>

        <button
          className={`w-6 h-6 flex items-center justify-center rounded-full transition ${
            isHovered || isOpen ? "bg-[#39180F] text-white" : "bg-[#39180F]/10"
          }`}
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="pb-8 space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium opacity-70">Country</label>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full bg-transparent border border-[#39180F]/20 rounded-md p-3 outline-none focus:border-[#39180F] appearance-none cursor-pointer"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium opacity-70">
                Province/State
              </label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setError("");
                }}
                disabled={!selectedCountry || states.length === 0}
                className="w-full bg-transparent border border-[#39180F]/20 rounded-md p-3 outline-none focus:border-[#39180F] disabled:opacity-40 appearance-none cursor-pointer"
              >
                <option value="">
                  {states.length === 0 && selectedCountry
                    ? "No provinces found"
                    : "Select Province"}
                </option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium opacity-70">
              Zip/Postal Code
            </label>
            <input
              type="text"
              value={zip}
              onChange={(e) => {
                setZip(e.target.value);
                setError("");
              }}
              placeholder="Enter Zip Code"
              className="w-full bg-transparent border border-[#39180F]/20 rounded-md p-3 outline-none focus:border-[#39180F]"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="mt-2 bg-transparent border-2 border-[#39180F] rounded-full text-[#39180F] py-3  font-bold  cursor-pointer hover:bg-[#39180F] hover:text-[#F5EDDE] transition-colors duration-300 w-full"
          >
            Estimate
          </button>

          {error && (
            <p className="text-[#39180F]  font-medium mt-2 italic">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
