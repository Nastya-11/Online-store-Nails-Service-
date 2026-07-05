const axios = require('axios');

exports.sendOrderToTelegram = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      comment,
      products,
      totalPrice,
      deliveryType,
      deliveryInfo,
      paymentType,
    } = req.body;

    const deliveryTypeText = {
      1: 'Нова Пошта (відділення)',
      2: 'Нова Пошта (поштомат)',
      3: 'Укрпошта',
      4: 'Самовивіз',
    }[deliveryType] || 'Не вказано';

    const deliveryInfoText = (() => {
        if (!deliveryInfo || !deliveryInfo.isTrue) return 'Немає деталей';

        if (deliveryType === 1 || deliveryType === 2) {
            return deliveryInfo.res?.name || deliveryInfo.res?.nameru || 'Немає деталей';
        }
        if (deliveryType === 3) {
            return deliveryInfo.res?.postIdx || 'Немає деталей';
        }
        if (deliveryType === 4) {
            return 'З вами зв’яжеться менеджер';
        }
        return 'Немає деталей';
    })();

    const paymentTypeText = {
      1: 'Накладений платіж',
      2: 'Повна оплата на рахунок ФОП',
    }[paymentType] || 'Не вказано';

    const message = `
🛒 *НОВЕ ЗАМОВЛЕННЯ!*

👤 *Ім'я та Прізвище:* ${name}
📲 *Телефон:* +${phone}
📧 *Email:* ${email || 'немає'}
💬 *Коментар:* ${comment || 'немає'}

🚚 *Доставка:* ${deliveryTypeText}
📍 *Деталі доставки:* ${deliveryInfoText}

💳 *Оплата:* ${paymentTypeText}

🛍 *Товари:*
${products.map(p => {
  const totalForItem = (p.count * p.priceWithDiscount);
  return `- *${p.nameuk || p.nameru || '---'}* x${p.count} — ${p.priceWithDiscount}₴/шт = ${totalForItem}₴`;
}).join('\n')}

💰 *Загальна сума:* ${totalPrice} грн.
    `;

    await axios.post(`https://api.telegram.org/bot7754638719:AAEC14fR_Nxg5z-tgE4_0wepeFK5ZdCVdIg/sendMessage`, {
      chat_id: '1147354828',
      text: message,
      parse_mode: 'Markdown',
    });

    res.status(200).json({ message: 'Успішно надіслано!' });
  } catch (error) {
    console.error('Telegram error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Помилка надсилання в Telegram' });
  }
};
