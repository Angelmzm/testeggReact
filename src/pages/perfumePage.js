import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './perfumePage.scss';

import Header from '../components/header';
import Footer from '../components/footer';

const PerfumePage = () => {

  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1); 
  const produtosPorPagina = 15; 
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProdutos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/list');
      const data = await response.json();
      const novosProdutos = data.filter(produto => produto.category == 4);
      setProdutos(novosProdutos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const checkIfAdmin = () => {
    const isAdmin = localStorage.getItem('isAdm');
    if (isAdmin === 'true') {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    fetchProdutos();
    checkIfAdmin();
  }, []);

  const indexInicial = (paginaAtual - 1) * produtosPorPagina;
  const produtosPaginaAtual = produtos.slice(indexInicial, indexInicial + produtosPorPagina);

  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

  return (
    <>
      <Header />

      <main className="perfumePagecontainer">
        <section className="perfumePageSection">
          <h1>Perfume</h1>
          <div className="perfumePageGride">
            {produtosPaginaAtual.length > 0 ? (
              produtosPaginaAtual.map(produto => (
                <div className="perfumeProduto" key={produto.id}>
                  <Link to={isAdmin ? `/admProdutoPage/${produto.id}` : `/produtoPage/${produto.id}`}>
                    <img src={produto.cover_image} alt={produto.productname} />
                  </Link>
                  <div className="perfumeDetalhes">
                    <p className="nomePerfume">{produto.productname}</p>
                    <p className="precoPerfume">R$ {produto.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Carregando produtos...</p>
            )}
          </div>

          {/* Paginação */}
          <div className="mudarPagina">
            <button 
              className="bttMudarPagina" 
              disabled={paginaAtual === 1} 
              onClick={() => mudarPagina(paginaAtual - 1)}>
              ❮
            </button>

            {/* Botões de páginas */}
            {[...Array(totalPaginas)].map((_, index) => (
              <button 
                key={index} 
                className={`bttMudarPagina ${paginaAtual === index + 1 ? 'ativo' : ''}`} 
                onClick={() => mudarPagina(index + 1)}>
                {index + 1}
              </button>
            ))}

            <button 
              className="bttMudarPagina" 
              disabled={paginaAtual === totalPaginas} 
              onClick={() => mudarPagina(paginaAtual + 1)}>
              ❯
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PerfumePage;
