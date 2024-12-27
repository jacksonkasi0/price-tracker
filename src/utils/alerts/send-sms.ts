export const sendSms = async (
  productName: string,
  price: number,
  url: string
) => {
  // Implement your sms logic here
  console.log(`Sending SMS for ${productName} at ${price} - ${url}`);
};