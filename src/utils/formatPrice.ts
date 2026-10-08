const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatPrice(cents: number): string {
  return brlFormatter.format(cents / 100);
}
