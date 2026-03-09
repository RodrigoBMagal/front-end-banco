import React, { useState } from "react";
import { getStatement } from "../services/api";
import { FaFileInvoiceDollar } from "react-icons/fa";

const Statement = ({ onNotify }) => {
    const {accountId, setAccountId} = useState('');
    const {statementData, setStatementData} = useState(null);
    const {loading, setLoading} = useState(false);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('pt-BR');
    };

    const getTypeLabel = (type) => {
        const labels = {
            'DEPOSIT': 'Deposit',
            'WITHDRAW': 'Withdraw',
            'SENT_TRANSFER': 'Sent Transfer',
            'RECEIVED_TRANSFER': 'Received Transfer'
        };
        return labels[type] || type;
    };

    const getTypeClass = (type) => {
        const classes = {
            'DEPOSIT': 'type-deposit',
            'WITHDRAW': 'type-withdraw',
            'SENT_TRANSFER': 'type-sent',
            'RECEIVED_TRANSFER': 'type-received'
        };
        return classes[type] || '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await getStatement(accountId);
            setStatementData(result);
        } catch {
            onNotify('Account not found', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
      <h2><FaFileInvoice /> Extrato Bancário</h2>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="number"
            placeholder="ID da Conta"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Carregando...' : 'Buscar Extrato'}
          </button>
        </div>
      </form>

      {statementData && (
        <div className="statement-result">
          <div className="statement-header">
            <h3>Conta: {statementData.accountNumber}</h3>
            <p className="balance-display">
              Saldo Atual: <strong>{formatCurrency(statementData.actualBalance)}</strong>
            </p>
          </div>

          {statementData.transfers && statementData.transfers.length > 0 ? (
            <table className="statement-table">
              <thead>
                <tr>
                  <th>Data/Hora</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Conta Destino</th>
                </tr>
              </thead>
              <tbody>
                {statementData.transfers.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{formatDate(transaction.timestamp)}</td>
                    <td>
                      <span className={`transaction-badge ${getTypeClass(transaction.type)}`}>
                        {getTypeLabel(transaction.type)}
                      </span>
                    </td>
                    <td className="amount">{formatCurrency(transaction.amount)}</td>
                    <td>{transaction.destinationAccountId || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-transactions">Nenhuma transação encontrada</p>
          )}
        </div>
      )}
    </div>
    )
}

export default Statement;