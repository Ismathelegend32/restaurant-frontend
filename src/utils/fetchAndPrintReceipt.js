import orderService from '../services/orderService'
import { canPrintReceipt, printOrderReceipt } from './printOrderReceipt'

export const fetchAndPrintReceipt = async (orderId, { onError } = {}) => {
  try {
    const full = await orderService.getById(orderId)
    if (!canPrintReceipt(full)) {
      onError?.('Rasiidka waxaa la daabici karaa dalabyada la geeyay ama la bixiyay oo keliya')
      return false
    }
    await printOrderReceipt(full, full.payment)
    return true
  } catch (error) {
    onError?.(error.message)
    return false
  }
}
