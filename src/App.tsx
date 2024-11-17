import React, { useState } from 'react';
import { Calculator, Ruler, RefreshCw } from 'lucide-react';

function App() {
  const [displayValue, setDisplayValue] = useState<string>('');
  const [num1, setNum1] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);
  
  const [utm1X, setUtm1X] = useState<string>('');
  const [utm1Y, setUtm1Y] = useState<string>('');
  const [utm2X, setUtm2X] = useState<string>('');
  const [utm2Y, setUtm2Y] = useState<string>('');
  const [distance, setDistance] = useState<string>('');

  const handleNumberClick = (num: string) => {
    if (isNewNumber) {
      setDisplayValue(num);
      setIsNewNumber(false);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    setNum1(displayValue);
    setOperator(op);
    setIsNewNumber(true);
  };

  const calculateResult = () => {
    if (num1 && displayValue && operator) {
      const a = parseFloat(num1);
      const b = parseFloat(displayValue);
      let result = 0;

      switch (operator) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          result = a / b;
          break;
      }

      setDisplayValue(result.toString());
      setIsNewNumber(true);
    }
  };

  const calculateDistance = () => {
    if (utm1X && utm1Y && utm2X && utm2Y) {
      const dx = parseFloat(utm2X) - parseFloat(utm1X);
      const dy = parseFloat(utm2Y) - parseFloat(utm1Y);
      const dist = Math.sqrt(dx * dx + dy * dy);
      setDistance(dist.toFixed(2));
    }
  };

  const clearAll = () => {
    setDisplayValue('');
    setNum1('');
    setOperator('');
    setIsNewNumber(true);
    setUtm1X('');
    setUtm1Y('');
    setUtm2X('');
    setUtm2Y('');
    setDistance('');
  };

  const clearCalculator = () => {
    setDisplayValue('');
    setNum1('');
    setOperator('');
    setIsNewNumber(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Calculator */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Hesap Makinesi</h2>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              value={displayValue}
              readOnly
              className="w-full p-4 text-right text-2xl font-bold border border-gray-300 rounded-lg bg-gray-50"
              placeholder="0"
            />
            
            <div className="grid grid-cols-4 gap-2">
              {/* Number Pad */}
              <div className="col-span-3 grid grid-cols-3 gap-2">
                {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="p-4 bg-gray-100 rounded-lg font-bold text-xl hover:bg-gray-200 transition-colors"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleNumberClick('.')}
                  className="p-4 bg-gray-100 rounded-lg font-bold text-xl hover:bg-gray-200 transition-colors"
                >
                  .
                </button>
                <button
                  onClick={calculateResult}
                  className="p-4 bg-indigo-600 text-white rounded-lg font-bold text-xl hover:bg-indigo-700 transition-colors"
                >
                  =
                </button>
              </div>
              
              {/* Operators */}
              <div className="space-y-2">
                {['+', '-', '*', '/'].map((op) => (
                  <button
                    key={op}
                    onClick={() => handleOperatorClick(op)}
                    className={`w-full p-4 rounded-lg font-bold text-xl ${
                      operator === op
                        ? 'bg-indigo-600 text-white'
                        : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                    }`}
                  >
                    {op}
                  </button>
                ))}
                <button
                  onClick={clearCalculator}
                  className="w-full p-4 bg-red-100 text-red-600 rounded-lg font-bold text-xl hover:bg-red-200 transition-colors"
                >
                  C
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* UTM Distance Calculator */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">UTM Mesafe Hesaplayıcı</h2>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Nokta X</label>
                <input
                  type="number"
                  value={utm1X}
                  onChange={(e) => setUtm1X(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="X koordinatı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">1. Nokta Y</label>
                <input
                  type="number"
                  value={utm1Y}
                  onChange={(e) => setUtm1Y(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Y koordinatı"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Nokta X</label>
                <input
                  type="number"
                  value={utm2X}
                  onChange={(e) => setUtm2X(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="X koordinatı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">2. Nokta Y</label>
                <input
                  type="number"
                  value={utm2Y}
                  onChange={(e) => setUtm2Y(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Y koordinatı"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={calculateDistance}
                className="w-full p-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Ruler className="w-5 h-5" />
                Mesafeyi Hesapla
              </button>
              
              <button
                onClick={clearAll}
                className="w-full p-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Temizle
              </button>
            </div>
            
            {distance && (
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-xl font-bold text-gray-800">Mesafe: {distance} metre</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;