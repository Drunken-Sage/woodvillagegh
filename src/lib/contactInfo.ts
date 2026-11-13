const decode = (encoded: string) => atob(encoded);

const phones = [
  decode('MDUwNDUzNzM3Mw=='),
  decode('MDU1ODU1NDUyNA=='),
  decode('MDU1NTA3NzM3Mw=='),
];

const footerPhones = [
  {
    phone: phones[0],
    href: `tel:${decode('KzIzMzUwNDUzNzM3Mw==')}`,
  },
  {
    phone: phones[2],
    href: `tel:${decode('KzIzMzU1MDU3Mzc3Mw==')}`,
  },
  {
    phone: phones[1],
    href: `tel:${decode('KzIzMzU1ODU1NDUyNA==')}`,
  },
];

export const contactInfo = {
  phones,
  footerPhones,
  email: decode('b2Zvcml3YXd1YWhAZ21haWwuY29t'),
  footerEmail: decode('b2Zvcmlhd3VhaHBAZ21haWwuY29t'),
  whatsappPhone: `233${phones[1].slice(1)}`,
  whatsappDisplay: `${phones[1].slice(0, 4)}-${phones[1].slice(4, 7)}-${phones[1].slice(7)}`,
};

export const formatInternationalPhone = (phone: string) =>
  `+233 (0)${phone.slice(1, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
