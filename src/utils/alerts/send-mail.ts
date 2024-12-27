export const sendEmail = async (
  productName: string,
  price: number,
  url: string
) => {
  // Implement your email logic here
  console.log(`Sending email for ${productName} at ${price} - ${url}`);
};