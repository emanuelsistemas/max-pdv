import React, { useState } from 'react';
import { Sun, Moon, Play, ArrowRight, Menu, X, BarChart3, Smartphone, Cloud, Clock, DollarSign, Users } from 'lucide-react';
import { SystemLogo } from './components/SystemLogo';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <SystemLogo isDark={isDark} />
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>Login</button>
              <a href="/criar-conta" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Criar Conta
              </a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => setIsDark(!isDark)} className="w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center">
                {isDark ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
                {isDark ? 'Modo Claro' : 'Modo Escuro'}
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium">Login</button>
              <a href="/criar-conta" className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white">
                Criar Conta
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8`}>
              Sistema PDV Completo<br />
              <span className="text-blue-600">Para Seu Negócio</span>
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-10 max-w-2xl mx-auto`}>
              Gerencie suas vendas de forma profissional com o PDV mais moderno do mercado. Controle total do seu negócio em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                Começar Gratuitamente <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className={`px-8 py-4 rounded-lg ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} transition-colors flex items-center justify-center`}>
                Ver Demonstração <Play className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} py-20`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Tudo que você precisa em um PDV
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Recursos completos para impulsionar suas vendas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
                  title: 'Gestão de Vendas',
                  description: 'Controle completo de vendas, estoque e relatórios'
                },
                {
                  icon: <Cloud className="w-8 h-8 text-blue-600" />,
                  title: 'Na Nuvem',
                  description: 'Acesse de qualquer lugar, seus dados sempre seguros'
                },
                {
                  icon: <Smartphone className="w-8 h-8 text-blue-600" />,
                  title: 'Multi-dispositivo',
                  description: 'Use no computador, tablet ou celular'
                },
                {
                  icon: <Clock className="w-8 h-8 text-blue-600" />,
                  title: 'Controle de Tempo',
                  description: 'Acompanhe horários de pico e fluxo de clientes'
                },
                {
                  icon: <DollarSign className="w-8 h-8 text-blue-600" />,
                  title: 'Gestão Financeira',
                  description: 'Controle de caixa e fluxo financeiro completo'
                },
                {
                  icon: <Users className="w-8 h-8 text-blue-600" />,
                  title: 'Gestão de Clientes',
                  description: 'Cadastro e fidelização de clientes integrado'
                }
              ].map((feature, index) => (
                <div key={index} className={`p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} py-20`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Benefícios do max-pdv
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Transforme seu negócio com nossa solução completa
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Controle Total
                </h3>
                <ul className="space-y-4">
                  <li className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Gestão completa de estoque e vendas em tempo real</span>
                  </li>
                  <li className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Relatórios detalhados de desempenho</span>
                  </li>
                  <li className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Controle de caixa e fechamento</span>
                  </li>
                </ul>
              </div>

              <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Facilidade de Uso
                </h3>
                <ul className="space-y-4">
                  <li className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Interface intuitiva e moderna</span>
                  </li>
                  <li className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Treinamento e suporte inclusos</span>
                  </li>
                  <li className={`flex items-start ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <ArrowRight className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0 mt-1" />
                    <span>Atualizações automáticas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;