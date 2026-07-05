import React, { useState, useEffect } from 'react';
import './DeliveryDepartment.scss';
import { Locale } from '@/i18n.config';

type Props = {
  infoDelivery: any;
  setInfoDelivery: (info: any) => void;
  localityId: string;
  lang: Locale;
};

const NewPostApiKey = process.env.NEXT_PUBLIC_NP_API_KEY;

const DeliveryDepartment: React.FC<Props> = ({
  infoDelivery,
  setInfoDelivery,
  localityId,
  lang,
}) => {
  const [departments, setDepartments] = useState<
    { id: string; name: string; nameru: string }[]
  >([]);
  const [filteredDepartments, setFilteredDepartments] = useState<
    { id: string; name: string; nameru: string }[]
  >([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const setInput = (value: string) => {
    setInputValue(value);
    setInfoDelivery({ isTrue: false });
  };

  useEffect(() => {
    if (!localityId) {
      setDepartments([]);
      setFilteredDepartments([]);
      return;
    }

    const fetchDepartments = async () => {
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
            calledMethod: 'getWarehouses',
            methodProperties: {
              CityRef: localityId,
            },
          }),
        });

        const data = await response.json();
        if (data.success) {
          const departmentList = data.data
            .filter(
              (x: any) =>
                x.CategoryOfWarehouse == 'Store' ||
                x.CategoryOfWarehouse == 'Branch' ||
                x.CategoryOfWarehouse == 'DropOff'
            )
            .map((dep: any) => ({
              id: dep.Ref,
              name: dep.Description,
              nameru: dep.DescriptionRu,
            }));
          setDepartments(departmentList);
          setFilteredDepartments(departmentList);
        } else {
          setDepartments([]);
          setFilteredDepartments([]);
        }
      } catch (error) {
        console.error('Помилка завантаження відділень:', error);
        setDepartments([]);
        setFilteredDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [localityId]);

  // Фільтруємо список відділень за введеним текстом
  useEffect(() => {
    const filtered = departments.filter((dep) =>
      dep.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [inputValue, departments]);

  useEffect(() => {
    setInfoDelivery({ isTrue: false });
  }, []);

  return (
    <div className="delivery-department-cont">
      <h3>Оберіть відділення</h3>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введіть номер або назву відділення"
      />
      {loading && <p>Завантаження...</p>}
      {filteredDepartments.length > 0 && (
        <ul className="department-list">
          {!infoDelivery.isTrue &&
            filteredDepartments.map((dep) => (
              <li
                key={dep.id}
                onClick={() => {
                    setInfoDelivery({
                      res: dep,
                      isTrue: true,
                      text: lang === 'ru' ? dep.nameru : dep.name,
                    });
                    setInputValue(lang == 'ru' ? dep.nameru : dep.name);
                    setFilteredDepartments([]);
                  }}
              >
                {lang == 'ru' ? dep.nameru : dep.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DeliveryDepartment;
