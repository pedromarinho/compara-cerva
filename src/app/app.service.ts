export class AppService {
    getFormattedPrice(price: number) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }
}