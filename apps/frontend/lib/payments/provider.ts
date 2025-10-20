export type TxStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';
export interface DepositTx { id: string; amountZMW: number; createdAt: number }
export interface DepositProvider {
  createDeposit: (amountZMW: number) => Promise<DepositTx>;
  status: (id: string) => Promise<TxStatus>;
}

