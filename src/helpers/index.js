export const calculateTotalToPay = (quantity, period) => {
  let total;

  // Mientras mayor es la cantidad, menor es el interes
  if (quantity < 5000) {
    total = quantity * 1.5;
  } else if (quantity >= 5000 && quantity < 10000 ) {
    total = quantity * 1.4;
  } else if (quantity >= 10000 && quantity < 15000) {
    total = quantity * 1.3;
  } else {
    // 15.000 hasta 20.000
    total = quantity * 1.2;
  }

  // Más plazo, mayor interes
  if (period === 6) {
    total *= 1.1;
  } else if (period === 12) {
    total *= 1.2;
  } else {
    total *= 1.3;
  }

  return total;
};