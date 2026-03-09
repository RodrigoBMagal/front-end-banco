import React, { useState } from 'react';
import { getBalance, deposit, withdraw, transfer } from '../services/api';
import { FaMoneyBillWave, FaExchangeAlt, FaWallet, FaArrowRight } from 'react-icons/fa';

const Operations = ({ onNotify }) => {
  const [balanceAccountId, setBalanceAccountId] = useState('');
  const [depositData, setDepositData] = useState({ accountId: '', amount: '' });
  const [withdrawData, setWithdrawData] = useState({ accountId: '', amount: '' });
  const [transferData, setTransferData] = useState({ 
    sourceAccountId: '', 
    destinationAccountId: '', 
    amount: '' 
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Consultar Saldo
  const handleBalance = async (e) => {
    e.preventDefault();
    try {
      const result = await getBalance(balanceAccountId);
      const message = `
        <h3>💰 Saldo da Conta</h3>
        <p><strong>Número:</strong> ${result.accountNumber}</p>
        <p><strong>Saldo:</strong> <span style="font-size: 1.5em; color: #28a745;">${formatCurrency(result.balance)}</span></p>
      `;
      onNotify(message, 'info');
    } catch {
      onNotify('❌ Conta não encontrada', 'error');
    }
  };

  // Depósito
  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      await deposit({
        accountId: parseInt(depositData.accountId),
        amount: parseFloat(depositData.amount)
      });
      onNotify(`✅ Depósito de ${formatCurrency(depositData.amount)} realizado!`, 'success');
      setDepositData({ accountId: '', amount: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao realizar depósito';
      onNotify(`❌ ${errorMsg}`, 'error');
    }
  };

  // Saque
  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      await withdraw({
        accountId: parseInt(withdrawData.accountId),
        amount: parseFloat(withdrawData.amount)
      });
      onNotify(`✅ Saque de ${formatCurrency(withdrawData.amount)} realizado!`, 'success');
      setWithdrawData({ accountId: '', amount: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao realizar saque';
      onNotify(`❌ ${errorMsg}`, 'error');
    }
  };

  // Transferência
  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await transfer({
        sourceAccountId: parseInt(transferData.sourceAccountId),
        destinationAccountId: parseInt(transferData.destinationAccountId),
        amount: parseFloat(transferData.amount)
      });
      onNotify(`✅ Transferência de ${formatCurrency(transferData.amount)} realizada!`, 'success');
      setTransferData({ sourceAccountId: '', destinationAccountId: '', amount: '' });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao realizar transferência';
      onNotify(`❌ ${errorMsg}`, 'error');
    }
  };

  return (
    <div className="operations-container">
      {/* Consultar Saldo */}
      <div className="operation-card">
        <h3><FaWallet /> Consultar Saldo</h3>
        <form onSubmit={handleBalance} className="operation-form">
          <input
            type="number"
            placeholder="ID da Conta"
            value={balanceAccountId}
            onChange={(e) => setBalanceAccountId(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-secondary">Consultar</button>
        </form>
      </div>

      {/* Depósito */}
      <div className="operation-card">
        <h3><FaMoneyBillWave /> Depósito</h3>
        <form onSubmit={handleDeposit} className="operation-form">
          <input
            type="number"
            placeholder="ID da Conta"
            value={depositData.accountId}
            onChange={(e) => setDepositData({...depositData, accountId: e.target.value})}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Valor"
            value={depositData.amount}
            onChange={(e) => setDepositData({...depositData, amount: e.target.value})}
            required
          />
          <button type="submit" className="btn btn-success">Depositar</button>
        </form>
      </div>

      {/* Saque */}
      <div className="operation-card">
        <h3><FaMoneyBillWave /> Saque</h3>
        <form onSubmit={handleWithdraw} className="operation-form">
          <input
            type="number"
            placeholder="ID da Conta"
            value={withdrawData.accountId}
            onChange={(e) => setWithdrawData({...withdrawData, accountId: e.target.value})}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Valor"
            value={withdrawData.amount}
            onChange={(e) => setWithdrawData({...withdrawData, amount: e.target.value})}
            required
          />
          <button type="submit" className="btn btn-warning">Sacar</button>
        </form>
      </div>

      {/* Transferência */}
      <div className="operation-card">
        <h3><FaExchangeAlt /> Transferência</h3>
        <form onSubmit={handleTransfer} className="operation-form">
          <input
            type="number"
            placeholder="Conta Origem"
            value={transferData.sourceAccountId}
            onChange={(e) => setTransferData({...transferData, sourceAccountId: e.target.value})}
            required
          />
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <FaArrowRight />
          </div>
          <input
            type="number"
            placeholder="Conta Destino"
            value={transferData.destinationAccountId}
            onChange={(e) => setTransferData({...transferData, destinationAccountId: e.target.value})}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Valor"
            value={transferData.amount}
            onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
            required
          />
          <button type="submit" className="btn btn-info">Transferir</button>
        </form>
      </div>
    </div>
  );
};

export default Operations;