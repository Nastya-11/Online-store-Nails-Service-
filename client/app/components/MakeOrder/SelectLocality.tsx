import React, { useState, useEffect } from 'react';
import './SelectLocality.scss';
import { Locale } from '@/i18n.config';

type Props = {
  localityId: string | undefined;
  setLocalityId: (id: string | undefined) => void;
  localityName: string;
  setLocalityName: (name: string) => void;
  lang: Locale;
};

const NewPostApiKey = process.env.NEXT_PUBLIC_NP_API_KEY;

const SelectLocality = ({
  localityId,
  setLocalityId,
  localityName,
  setLocalityName,
  lang,
}: Props) => {
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string; nameru: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localityName.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchLocalities = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apiKey: NewPostApiKey,
            modelName: 'Address',
            calledMethod: 'getCities',
            methodProperties: {
              FindByString: localityName,
            },
          }),
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
          const cities = data.data.map((city: any) => ({
            id: city.Ref,
            name: city.Description,
            nameru: city.DescriptionRu,
          }));
          setSuggestions(cities);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Помилка завантаження населених пунктів:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    // Викликаємо API через 500мс після останнього введення
    const timeoutId = setTimeout(fetchLocalities, 500);

    return () => clearTimeout(timeoutId);
  }, [localityName]);

  return (
    <div className="select-locality-container">
      <div className="input-wrapper">
        <input
          type="text"
          value={localityName}
          onChange={(e) => {
            setLocalityName(e.target.value);
            setLocalityId(undefined);
          }}
          placeholder="Введіть населений пункт"
        />
        {localityId != undefined && loading && (
          <div className="loading">Завантаження...</div>
        )}
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((city) => (
              <li
                key={city.id}
                onClick={() => {
                  setLocalityName(lang == 'ru' ? city.nameru : city.name);
                  setLocalityId(city.id);
                  setSuggestions([]); // При виборі очищаємо список
                }}
              >
                {lang == 'ru' ? city.nameru : city.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <select>
        <option value="uk">Україна</option>
      </select>
    </div>
  );
};

export default SelectLocality;
