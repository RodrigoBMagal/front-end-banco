import React, { useState } from "react";
import { createClient } from "../services/api";
import { FaUser, FaIdCard, FaEnvelope } from "react-icons/fa";

const CreateClient = ({onNotify}) => {
    const [formData, setFormData] = useState({
        name: "",
        cpf: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await createClient(formData);

            const message = `
            <h3>✅ Cliente criado com sucesso!</h3>
            <p><strong>Nome:</strong> ${result.name}</p>
            <p><strong>CPF:</strong> ${result.cpf}</p>
            <p><strong>Email:</strong> ${result.email}</p>
            <p><strong>ID da Conta:</strong> ${result.accountId}</p>
            <p><strong>Número da Conta:</strong> ${result.accountNumber}</p>
            <p style="color: #dc3545; font-weight: bold;">⚠️ ANOTE O ID DA CONTA: ${result.accountId}</p>
            `;

            onNotify(message, 'success');
            setFormData({ name: "", cpf: "", email: "" });
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error creating client.";
            onNotify(`<h3>❌ ${errorMessage}</h3>`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <h2>Create New Client</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>
                        <FaUser className="input-icon" />
                        Full Name
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="João Silva" required />
                </div>

                <div className="form-group">
                    <label>
                        <FaIdCard className="input-icon" />
                        CPF (11 dígitos)
                    </label>
                    <input
                        type="text" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="12345678901" maxLength="11" pattern="\d{11}" required />
                </div>

                <div className="form-group">
                    <label>
                        <FaEnvelope className="input-icon" />
                        Email
                    </label>
                    <input
                        type="email" name="email" value={formData.email} onChange={handleChange} placeholder="joao@example.com" required />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Client"}
                </button>
            </form>
        </div>
    )
    
}

export default CreateClient;